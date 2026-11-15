# Education — post-bet drand beacon acceptance

A bet at time `betTs` may only accept a beacon whose `publishedTs` is **strictly later**. Optional digest check stands in for signature verification in this lab.

## Outcomes

1. Show exact betTs is refused (must be after).
2. Show once-only resolve.
3. Show first four randomness bytes as a uint32 sample.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).
