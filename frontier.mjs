import fs from "node:fs";

export const TERMINAL = new Set(["done","canceled","superseded","abandoned"]);
export const LIVE = new Set(["active","waiting_external","requires_client"]);

const time = (value, field, id) => {
  if (value == null) return undefined;
  const n = Date.parse(value);
  if (!Number.isFinite(n)) throw new Error(`${id}: ${field} must be an ISO datetime`);
  return n;
};

export function validate(model, frontier, coverage) {
  if (model?.version !== "1.0.0" || frontier?.schemaVersion !== "1.0.0" || coverage?.schemaVersion !== "1.0.0")
    throw new Error("unsupported Personal Services state version");

  const domains = new Map(model.domains.map(d => [d.id, d]));
  const seen = new Set();

  for (const item of frontier.items ?? []) {
    if (!item?.id || typeof item.id !== "string") throw new Error("frontier item requires string id");
    if (seen.has(item.id)) throw new Error(`${item.id}: duplicate id`);
    seen.add(item.id);
    if (TERMINAL.has(item.lifecycle)) throw new Error(`${item.id}: terminal lifecycle must be retired from frontier`);
    if (!LIVE.has(item.lifecycle)) throw new Error(`${item.id}: invalid live lifecycle`);
    if (!domains.has(item.domain)) throw new Error(`${item.id}: unknown domain ${item.domain}`);
    if (!item.sourceRef) throw new Error(`${item.id}: sourceRef required`);
    if (item.lifecycle === "active" && !item.nextAction) throw new Error(`${item.id}: active item requires nextAction`);
    if (item.lifecycle === "waiting_external" && !item.wakeAt) throw new Error(`${item.id}: waiting_external requires wakeAt`);
    if (item.lifecycle === "requires_client" && !item.userAction) throw new Error(`${item.id}: requires_client requires userAction`);
    for (const field of ["wakeAt","dueAt","lastEvidenceAt","lastSurfacedAt","escalationAt"]) time(item[field], field, item.id);
  }

  const covered = new Set((coverage.domains ?? []).map(d => d.id));
  for (const id of domains.keys()) if (!covered.has(id)) throw new Error(`coverage missing domain ${id}`);
  return true;
}

function score(item, now) {
  const p = item.priority ?? {};
  let value = 4*(p.impact ?? 0) + 4*(p.urgency ?? 0) + 3*(p.attentionCost ?? 0) + (p.reversibility ?? 0);
  if (item.dueAt) {
    const h = (Date.parse(item.dueAt) - now) / 3600000;
    value += h <= 24 ? 12 : h <= 72 ? 8 : h <= 168 ? 4 : 0;
  }
  return value;
}

export function actionable(model, frontier, now = Date.now()) {
  return (frontier.items ?? []).filter(item => {
    if (item.lifecycle === "active") return true;
    if (item.lifecycle === "waiting_external") return Date.parse(item.wakeAt) <= now;
    if (item.lifecycle === "requires_client") {
      if (!item.lastSurfacedAt) return true;
      if (item.escalationAt && Date.parse(item.escalationAt) <= now) return true;
      if (item.dueAt && Date.parse(item.dueAt) - now <= 48*3600000) return true;
      return false;
    }
    return false;
  }).map(item => ({...item, score:score(item, now)}))
    .sort((a,b) => b.score - a.score || a.id.localeCompare(b.id));
}

export function neglectedDomains(model, coverage, now = Date.now()) {
  const byId = new Map((coverage.domains ?? []).map(d => [d.id,d]));
  return model.domains.filter(d => {
    const c = byId.get(d.id);
    if (!c?.lastReviewedAt) return true;
    return Date.parse(c.lastReviewedAt) + d.reviewCadenceDays*86400000 <= now;
  }).map(d => d.id);
}

export function inspect(model, frontier, coverage, now = Date.now()) {
  validate(model, frontier, coverage);
  return {actionable:actionable(model, frontier, now), neglectedDomains:neglectedDomains(model, coverage, now)};
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const root = new URL("./", import.meta.url);
  const load = name => JSON.parse(fs.readFileSync(new URL(name, root), "utf8"));
  process.stdout.write(JSON.stringify(inspect(load("service-model.json"), load("frontier.json"), load("coverage.json")), null, 2) + "\n");
}
