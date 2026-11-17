# Security — drand beacon gate

## Closed in tests

| Issue | Behavior |
| --- | --- |
| publishedTs ≤ betTs | not after bet |
| Wrong digest | bad signature |
| Second resolve | already resolved |
| Short randomness | refused |
| Bad player / negative betTs | refused |

## Not closed

| Concern | Guidance |
| --- | --- |
| Real BLS | Verify against League of Entropy public key |
| Round freshness | Round must be after the bet's committed round |
| Relay trust | Fetch from official drand HTTP API, not a user-supplied beacon only |
| Game bias | Rejection sample before modulo |

Teaching time gate only — not a production verifier.
