# Tips

- Never accept a beacon with publishedTs ≤ betTs — same-second leakage is a fairness bug.
- Resolve is once-only; store randomness on the bet row before any payout math.
- Real deployments need actual BLS verification against the current group public key; this lab only models the time and digest gates.
