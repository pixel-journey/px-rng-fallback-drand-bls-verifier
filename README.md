# px-rng-fallback-drand-bls-verifier

> **Trust:** private educational lab (Tier B)  
> **Quest:** 015 — League of Entropy / drand round strictly after the bet  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

Accept a beacon round only when `publishedTs > betTs`. Equal timestamps are refused. Randomness must be 32 bytes hex; signature is shape-checked. Optional `expectedDigest` is a **hash stand-in**, not real BLS12-381 verification.

**Real code:** `npm test`. No live drand API, no wasm.

## Run

```bash
npm test
```

MIT — Pixel Journey
