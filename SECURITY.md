# Security notes — drand lab

| Mitigated | Behavior |
| --- | --- |
| publishedTs ≤ betTs | refused |
| Bad hex / round | refused |
| Double resolve | refused |

**Not mitigated here:** real BLS forgery. Treat signature checks as educational only.
