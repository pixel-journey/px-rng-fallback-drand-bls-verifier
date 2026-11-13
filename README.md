# Accept a drand round only after the bet

> **Domain:** RNG fallback — League of Entropy / drand  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** Accept a beacon only when `publishedTs > betTs`. Equal timestamps refused. Randomness 32-byte hex; signature shape-checked. Optional `expectedDigest` is a **hash stand-in**, not real BLS12-381.

**Code under test:** `npm test`. Prefer [orng.wax](https://github.com/worldwide-asset-exchange/wax-orng) on WAX. Beacons: [drand.love](https://drand.love/).

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | After-bet, shape, digest |
| [TIPS.md](TIPS.md) | Commit before beacon |
| [SECURITY.md](SECURITY.md) | Timing; not real BLS |
| [SOURCES.md](SOURCES.md) | Official |

```bash
npm test
```

MIT — Pixel Journey
