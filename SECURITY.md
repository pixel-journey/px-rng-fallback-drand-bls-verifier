# Security — drand post-bet time gate (fallback)

## Closed in tests

| Issue | Behavior |
| --- | --- |
| `publishedTs ≤ betTs` | refused (`not after bet`) |
| Wrong structural digest | bad signature |
| Second resolve | already resolved |
| Short randomness / bad player / negative betTs | refused |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Real BLS | Verify against the League of Entropy public key ([drand.love](https://drand.love/)) |
| Round freshness | Round must be after the bet's committed round |
| Relay trust | Fetch from official drand HTTP API, not only a user-supplied blob |
| Game bias | Rejection sample before any modulus |
| Auth | Who may submit the beacon on-chain |

## Attack angles

1. Accepting a beacon the player could already see at bet time (`>=` instead of `>`).
2. Calling this file a production BLS verifier without the structural caveat.
3. Using raw beacon bytes as a d20 without rejection sampling.
4. Skipping `orng.wax` on WAX because drand is public.

## Honesty limits

Teaching time gate only. Prefer [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) on WAX. Related: [TAPOS](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos) · [Solana publishTime gate](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth).
