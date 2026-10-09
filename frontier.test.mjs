import assert from "node:assert/strict";
import test from "node:test";
import { inspect, validate } from "./frontier.mjs";

const model={version:"1.0.0",domains:[
  {id:"calendar-meetings",reviewCadenceDays:3},
  {id:"research-decisions",reviewCadenceDays:7}
]};
const coverage={schemaVersion:"1.0.0",domains:[
  {id:"calendar-meetings",lastReviewedAt:"2026-10-09T00:00:00Z"},
  {id:"research-decisions",lastReviewedAt:null}
]};

test("terminal work cannot remain in the live frontier",()=>{
  assert.throws(()=>validate(model,{schemaVersion:"1.0.0",items:[
    {id:"renewal",domain:"calendar-meetings",lifecycle:"done",sourceRef:"provider:1"}
  ]},coverage),/must be retired/);
});

test("external waits stay silent before their wake",()=>{
  const result=inspect(model,{schemaVersion:"1.0.0",items:[
    {id:"wait",domain:"calendar-meetings",lifecycle:"waiting_external",sourceRef:"provider:2",wakeAt:"2026-10-12T00:00:00Z"}
  ]},coverage,Date.parse("2026-10-10T00:00:00Z"));
  assert.equal(result.actionable.length,0);
});

test("already surfaced client gates stay silent before escalation",()=>{
  const result=inspect(model,{schemaVersion:"1.0.0",items:[
    {id:"gate",domain:"research-decisions",lifecycle:"requires_client",sourceRef:"form:1",userAction:"Choose A or B",lastSurfacedAt:"2026-10-09T00:00:00Z",escalationAt:"2026-10-15T00:00:00Z",dueAt:"2026-10-20T00:00:00Z"}
  ]},coverage,Date.parse("2026-10-10T00:00:00Z"));
  assert.equal(result.actionable.length,0);
});

test("never reviewed domains are selected for discovery",()=>{
  const result=inspect(model,{schemaVersion:"1.0.0",items:[]},coverage,Date.parse("2026-10-10T00:00:00Z"));
  assert.deepEqual(result.neglectedDomains,["research-decisions"]);
});

test("higher client impact and attention cost rank first",()=>{
  const result=inspect(model,{schemaVersion:"1.0.0",items:[
    {id:"low",domain:"calendar-meetings",lifecycle:"active",sourceRef:"a",nextAction:"x",priority:{impact:1,urgency:1,attentionCost:1}},
    {id:"high",domain:"research-decisions",lifecycle:"active",sourceRef:"b",nextAction:"y",priority:{impact:3,urgency:2,attentionCost:3}}
  ]},coverage,Date.parse("2026-10-10T00:00:00Z"));
  assert.equal(result.actionable[0].id,"high");
});
