# Trusted Personal Executive Assistant Operating System

This private client repository is a Causeway Personal Services work surface.

The operating target is **executive assistant + private chief of staff + personal operations**, not inbox/calendar monitoring. The service must anticipate, prioritize, execute, prepare decisions, protect attention, manage provider/admin detail, and close loops across commitments, correspondence, meetings/calendar, travel/logistics, forms/provider administration, records, purchases/subscriptions, household/property administration, digital security, relationships/events, projects, research/decision support, accessibility/preferences, and benefits/opportunities.

## Closure is structural

`frontier.json` contains ONLY live work:

- `active`
- `waiting_external`
- `requires_client`

Terminal work (`done`, `canceled`, `superseded`, `abandoned`) is forbidden in the frontier. Remove it when it terminates and preserve any necessary receipt in the repo's existing history/record structure. This prevents completed renewals, payments, verifications, applications, orders and reservations from becoming zombie obligations.

## Neglected-frontier control

`coverage.json` records when each executive-assistant domain was last materially reviewed. A pulse must use it to inspect neglected areas instead of letting recent email or the previous conversation determine attention.

## Autonomic operation and principal-attention budget

The principal can delegate an outcome without volunteering routine attention. A delegation to **do the work autonomically** is an operating requirement, not an invitation to set `requires_client` because a provider interface is inconvenient.

- **Zero-routine-attention rule:** for an authorized ordinary maintenance, public-presence or provider-administration duty, the service owns discovery, truthful sourcing, review under existing editorial/identity policy, choice of permitted supplier, execution, retries, receipt verification and recurrence. Do not transform preparation of copy into the principal's assigned job or repeatedly ask for approval to perform routine delegated work.
- **Select an actual independent route:** first check provider-native APIs/permissions and already connected legitimate publishing tools; then existing owned public channels and syndication, provider-supported scheduling and authorized external services. Reuse Red Cup provider integration instead of installing client-side scripts or misusing the assisted browser. Identify per-verb capability: read, create/update profile, publish, retrieve receipt, and moderate are different grants.
- **Platform refusals:** if an outside provider disallows the required browser automation or an account grant is absent, do not evade access restrictions, fabricate receipts, or turn an unverified workaround into live operation. Keep the original customer outcome `active` while progressing its independent permissible parts; select `waiting_external` only for a concrete external event with a wake criterion. Route reusable software gaps to Engineering through existing Work and formal qualification.
- **Nondelegable actions only:** use `requires_client` only when an actual decision, identity/consent authorization, account secret or lawful personal act cannot be delegated or performed with existing authority. Name the exact reason and the least-demanding step, without reclassifying ordinary writing, profile-research or publication management as requiring the principal.
- **Receiving:** source edits, drafts, repository mounts, queued messages, scheduler configuration and token possession never close an external presence requirement. An authentic provider receipt and independently observed public result close that provider step; when unavailable, report only the remaining blocked effect without pretending the whole duty was fulfilled.
- **Attention economy:** periodically review permitted routes and newly available grants without re-probing known unchanged blocks each cycle. Surface only material outcomes, an unavoidable one-time authorization, or a serious risk; do not send recurring 'please paste this' requests.

Apply this to the original client work item and the subject-owned web-presence resources, not a parallel tracker. A public-facing personal property must retain the principal's factual identity, privacy, rights and distinct customer custody.

## Receive personal web presence from its actual owners

The historical `web.emsenn.net` scaffold asked to surface Morgan's external
presence, initially Kolektiva/ActivityPub and Substack, through upstream feed
readers. It never contained an executable service. Its missing server entry,
old port and removed serve/check/verify scripts are not a deployment design.
The useful customer requirement is retained here as **unreceived**: authorized
external presence must reach a real personal publication surface with source
identity, provenance and independently observed output. Its original source
and disposition are held by [Operations' existing custody work](https://github.com/coesite-operations/operations-services-section/issues/10#issuecomment-6251967225).

Keep the actual family distinct: `emsenn/emsenn-web-services-section` composes
personal channel sections; `emsenn/emsenn.net` carries a generated personal
website; `emsenn/web.emsenn.net` was only the external-presence placeholder.
These are three carriers with different roles, not three equivalent runnable
monitors. Use the existing subject-owned channel work and this personal-service
receiver; do not make a new tracker or copy a placeholder into another package.
Red Cup's public-personality machinery provisions and tends constructed personas;
it is not authority to represent this real person as a generated persona.

For the existing public-presence work, first resolve the exact public account,
permitted feed/API reader, factual and privacy authority, normalized records and
actual personal publication consumer. Reuse qualified ActivityPub and platform
suppliers rather than embed another scraper in the personal site. Receiving
requires a real source item reaching that consumer, a second supported source
or format, and a relevant refusal: unread or unavailable provider data stays
unknown/stale and must not replace the last valid publication with an empty
success. Reading a feed does not authorize posting or profile changes. Preserve
provider URL and publication identity, and keep private messages outside public
output. Until requirements, specification, design and useful receiving are
qualified, retain the original obligation without advertising a running monitor.

## Run discipline

1. Reconcile fresh provider/client deltas.
2. Retire terminal work immediately.
3. Execute the highest-value lawful actions.
4. Prepare real decisions for the principal.
5. Inspect neglected domains.
6. Verify effects and update frontier/coverage.
7. Suppress unchanged external waits and already-surfaced client gates until their wake.

Provider-native systems remain authoritative. This repo stores only the minimum durable client work state needed to operate the service; it is not a shadow copy of every email, calendar record, account or provider database.

## Professional basis

The service model was rebuilt against executive-assistant/secretarial/chief-of-staff training and role frameworks from UCL, University of Salford, CUNY/CCNY, Chongqing Normal University and Duke University. See `service-model.json`.

## Check

```sh
node --test system/frontier.test.mjs
node system/frontier.mjs
```

## Source-owned T-PEA instance

The [machine-readable service instance](t-pea.instance.json) binds this *existing* 14-domain frontier to the [Business Science T-PEA type](https://github.com/lenticule-science/business-research-services-section/blob/main/content/concepts/trusted-personal-executive-assistant.v1.json), [Coesite's method](https://github.com/coesite-operations/operations-services-section/blob/main/lib/agency/skills/instantiate-trusted-personal-executive-assistant/SKILL.md) and [Red Cup's generic instance admission](https://github.com/red-cup-engineering/assist/blob/main/src/tpea-instance.mjs).

The descriptor additionally selects Causeway's original `trusted-personal-executive-assistance-service.json` public offering at immutable `causeway-services/public-services-section@36bc569ab2f460b189f5835914a98455a829830d`. Red Cup's original `admitTpeaInstance` now consumes this third source alongside Science and Operations, refusing mismatched revisions, unauthorized commerce, cross-person data access and unsupported domains. The offering is not a grant, sale or host receiving receipt.

The descriptor requests no active verbs and grants no authority; actual identity, hosted engine, purpose, rights and exact effect scope must be admitted separately by the native provider and FeltOS. The source record currently says `receiving.state: unreceived`, consistent with the shared ASSIST roster's still-seated client host: do not conflate committed config with a deployed or independently received customer service.

A second client's T-PEA must reuse these *definitions*, never copy this person's frontier, credentials, history or access. The shared T-PEA offering is held under `causeway-services/public-services-section/services/personal-services-section`, not in this private client repo.
