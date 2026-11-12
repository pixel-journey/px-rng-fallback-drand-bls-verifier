# Official sources

| Source | Use |
| --- | --- |
| [drand](https://drand.love/) | League of Entropy public randomness |
| [drand documentation](https://drand.love/docs/) | Rounds, beacons, verification |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | Preferred **on-WAX** oracle when available |
| [docs.wax.io](https://docs.wax.io/) | WAX development |

This lab checks **timing** (`publishedTs > betTs`) and **shape**. The optional digest is a hash stand-in — **not** real BLS12-381 verification. Do not claim cryptographic verification from these tests.

## Domain map

| Repo | Role |
| --- | --- |
| ORNG domain | Native WAX randomness |
| [px-rng-fallback-commit-reveal](https://github.com/pixel-journey/px-rng-fallback-commit-reveal) | Two-party commit-reveal |
| [px-rng-fallback-future-block-tapos](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos) | Delayed block seed |
| **This repo** | External beacon round after bet time |
| [px-rng-fallback-multi-oracle-quorum](https://github.com/pixel-journey/px-rng-fallback-multi-oracle-quorum) | M-of-N reports |
