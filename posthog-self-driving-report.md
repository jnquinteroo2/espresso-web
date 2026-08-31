# PostHog Self-driving Setup Report

_Generated 2026-08-31 · Project: espresso-coffee-shop (ID 584795)_

## Summary

PostHog Self-driving has been configured for the Espresso coffee shop. Session Replay, Error Tracking, and Support (Conversations) are on; six signal sources are wired; the scout troop is tuned to five scouts matched to this product's surfaces; and two Replay Vision scanners are armed on the cart and checkout flow. Findings will start appearing in your [Self-driving inbox](https://us.posthog.com/project/584795/inbox) within ~30 minutes of the first scout run.

---

## AI data processing

**Status:** Approved. Organization-level AI data processing consent was granted before this run.

---

## GitHub

**Status:** Connected during this run.

- Account: `jnquinteroo2`
- Integration ID: 260707
- Repos are now accessible to Self-driving for code research and fix PRs.

---

## Products enabled

| Product | Status | Note |
|---|---|---|
| Session Replay | Already enabled | Recording confirmed active (live sessions found). `posthog.init` has no `disable_session_recording` override — clean. |
| Error Tracking | Already enabled | `capture_exceptions: true` set in `instrumentation-client.ts` — clean. |
| Support (Conversations) | Enabled during this run | Tickets only arrive once an inbound channel (email / Slack / inbox) is connected — see Follow-ups. |

---

## Signal sources

| Source product | Source type | Action |
|---|---|---|
| `signals_scout` | `cross_source_issue` | On by default — no config row needed |
| `health_checks` | `health_issue` | **Enabled** |
| `error_tracking` | `issue_created` | **Enabled** |
| `error_tracking` | `issue_reopened` | **Enabled** |
| `error_tracking` | `issue_spiking` | **Enabled** |
| `session_replay` | `session_analysis_cluster` | **Enabled** (sample rate: 10%) |
| `conversations` | `ticket` | **Enabled** (dormant until a channel is connected) |
| `replay_vision` | — | Self-authorizing via scanner `emits_signals` flag — no row created |
| `llm_analytics` | — | Skipped — no LLM features in this project |
| `logs` | — | Skipped — logs product not in use |

---

## Connected tools

| Tool | Status |
|---|---|
| All external tools (GitHub Issues, Linear, Jira, Sentry, Zendesk, etc.) | Not used — user selected "None of these" |

---

## Scout troop

**Run budget:** 100 runs/day (early access default); 0 used today.
**Early access banner:** _"Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more."_

### Enabled (5 scouts)

| Scout | Why |
|---|---|
| `signals-scout-general` | Always on — cross-product correlations and surfaces no specialist covers |
| `signals-scout-product-analytics` | Core commerce funnels (add-to-cart → checkout → order) need conversion regression watching |
| `signals-scout-web-analytics` | Coffee shop site: traffic channel health and landing-page bounce directly affect sales |
| `signals-scout-web-vitals` | Core Web Vitals (LCP, INP, CLS, FCP) — poor performance kills add-to-cart conversion |
| `signals-scout-observability-gaps` | New project; finds commerce events with significant volume but no insight/dashboard coverage |

### Disabled (22 scouts)

| Scout | Reason |
|---|---|
| `signals-scout-error-tracking` | Covered by native `error_tracking` signal source — intentional, not a re-enable follow-up |
| `signals-scout-session-replay` | Covered by native `session_replay` signal source — intentional, not a re-enable follow-up |
| `signals-scout-ai-observability` | No AI/LLM features in this project |
| `signals-scout-apm` | No OpenTelemetry/distributed tracing |
| `signals-scout-anomaly-detection` | No saved dashboards or insights yet |
| `signals-scout-conversations` | Conversations just enabled; no ticket data yet |
| `signals-scout-csp-violations` | No Content Security Policy configured |
| `signals-scout-customer-analytics` | B2C project; no group/account analytics |
| `signals-scout-data-pipelines` | No CDP destinations, batch exports, or hog flows |
| `signals-scout-data-warehouse` | No external warehouse sources |
| `signals-scout-experiments` | No active A/B experiments |
| `signals-scout-feature-flags` | No feature flags in use |
| `signals-scout-health-checks` | Covered by native `health_checks` source |
| `signals-scout-inbox-validation` | Fresh setup; no shipped fixes to validate |
| `signals-scout-insight-alerts` | No alerts configured |
| `signals-scout-logs` | Logs product not in use |
| `signals-scout-mcp-tool-calls` | No MCP telemetry in this project |
| `signals-scout-replay-vision` | Scanners created in this run have no accumulated observations yet — enable after a week of data |
| `signals-scout-revenue-analytics` | No Stripe or payment SDK connected |
| `signals-scout-skills-store` | Not relevant to this project |
| `signals-scout-surveys` | No surveys in use |
| `signals-scout-tasks` | Not relevant to this project |

Re-enable any specialist that becomes relevant directly in PostHog (e.g. `signals-scout-feature-flags` when you start rolling out flags, `signals-scout-experiments` when you run A/B tests).

---

## Custom scouts

Two custom scouts were proposed based on the gap analysis:

| Proposed scout | Decision | Reason |
|---|---|---|
| Cart-to-order funnel watcher — monitors `product_added_to_cart` → `cart_checkout_started` → `order_completed` conversion drops | **Declined by user** | Proposed, user cancelled the selection |
| Subscription flow watcher — monitors `subscription_form_opened` → `subscription_started` conversion drops | **Declined by user** | Proposed, user cancelled the selection |

**Surfaces ruled out:**
- Maquila inquiry (`maquila_inquiry_submitted`): single-event surface with no multi-step funnel or additional properties — insufficient signal richness for a scout.
- Error bursts / session analysis: covered by native sources, not eligible for custom scouts.

**Noise escape hatch:** If any enabled scout turns out noisy, set `emit: false` on its config in PostHog — it will keep running and logging but write nothing to the inbox (dry-run mode).

---

## Replay Vision scanners

Replay Vision scanners are an LLM that watches individual session recordings on a schedule and pushes what it finds directly to the Self-driving inbox. They see what events can't: blank screens, broken layouts, buttons that do nothing. Findings arrive at half weight — corroboration from a second scan of the same issue is needed before a report is promoted to the inbox.

Note: the sizing skill (`creating-replay-vision-scanners`) was not available on this deploy, so monthly credit spend was not pre-calculated. At 5 credits/observation and the project's current low recording volume, spend is expected to be negligible.

| Scanner | Type | What it watches | Query scope | Sample rate | Est. monthly credits |
|---|---|---|---|---|---|
| **Coffee shop cart and checkout breakage** | Monitor | Cart drawer failures, checkout modal not appearing, quantity stepper unresponsive, sold-out display issues, WhatsApp redirect failures | Sessions visiting `/cafe/*` (product listing and individual coffee pages) | 50% | 0 (no cafe recordings yet) |
| **Coffee shop purchase frustration** | Monitor | Rage-clicks on cart buttons, checkout trigger, grind/size selectors, subscription configurator steps | Sessions containing a `$rageclick` event — any page | 100% | 0 (no rage-click recordings yet) |

Both scanners have `emits_signals: true` and are active. Since the project has minimal recordings (only from localhost development), scanners will start firing findings once production traffic arrives.

---

## Follow-ups

- [ ] **Connect a Support/Conversations inbound channel** — Support is enabled but silent until you add an email, Slack, or inbox channel in PostHog. [Settings → Conversations](https://us.posthog.com/project/584795/settings)
- [ ] **Enable `signals-scout-replay-vision`** after the Replay Vision scanners accumulate ~1 week of observations — it reads trends across scans and needs history to be useful.
- [ ] **Consider adding the cart-to-order funnel as a saved PostHog funnel** — once saved, `signals-scout-product-analytics` will watch it for conversion regressions automatically.
- [ ] **Consider adding the subscription conversion funnel** (`subscription_form_opened` → `subscription_started`) as a saved PostHog funnel for the same reason.
- [ ] **Monthly credit spend verification** — the `creating-replay-vision-scanners` sizing skill was unavailable; verify scanner credit burn after the first week in [Replay Vision settings](https://us.posthog.com/project/584795/replay-vision).
- [ ] **Connect issue trackers** — if you start using Linear, Jira, GitHub Issues, or others, re-run this setup or connect them from [Pipeline → Sources](https://us.posthog.com/project/584795/pipeline/new/source).

---

## What happens next

- The scout coordinator picks up fresh configs within ~30 minutes; each enabled scout fires once per day by default.
- Scout runs draw from the project's daily budget (100 runs/day during early access).
- Findings cluster into reports in the [Self-driving inbox](https://us.posthog.com/project/584795/inbox); immediately-actionable ones can trigger coding tasks automatically.
- Replay Vision scanners begin scanning on the next sweep after production recordings arrive.
