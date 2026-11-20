# Sources

| Source | Use |
| --- | --- |
| [drand](https://drand.love/) | League of Entropy public randomness |
| [drand HTTP API](https://docs.drand.love/docs/http-api) | Round / randomness fetch |
| [drand BLS](https://docs.drand.love/docs/cryptography) | What a real verifier checks |
| [docs.wax.io](https://docs.wax.io/) | WAX settlement context |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | **Preferred** native RNG on WAX |

**Product fact locked by tests:** `publishedTs` must be **strictly greater** than `betTs`. Same-second publication is refused. This lab does **not** verify a BLS signature.

## Related labs

| Lab | Topic |
| --- | --- |
| [TAPOS](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos) | Future-block delay |
| [quorum](https://github.com/pixel-journey/px-rng-fallback-multi-oracle-quorum) | M-of-N reports |
| [commit-reveal](https://github.com/pixel-journey/px-rng-fallback-commit-reveal) | Bonded house reveal |
| [Solana facade](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth) | Same strict post-bet time idea |
| `px-contract-examples-vault` (private index; not this public course) | Section E — prefer orng |
