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
