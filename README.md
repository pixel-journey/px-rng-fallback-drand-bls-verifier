# Accept a drand round only after the bet

> **Domain:** RNG fallback — League of Entropy / drand  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** Accept a beacon round only when `publishedTs > betTs`. Equal timestamps are refused. Randomness must be 32-byte hex; signature is shape-checked. Optional `expectedDigest` is a **hash stand-in**, not real BLS12-381 verification.

**Code under test:** `npm test`. No live drand API, no wasm.

Prefer [orng.wax](https://github.com/worldwide-asset-exchange/wax-orng) on WAX. External beacons: [drand.love](https://drand.love/).

```bash
npm test
```

MIT — Pixel Journey
