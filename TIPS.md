# Tips — drand post-bet time gate (fallback)

Accept a League of Entropy / drand-shaped payload only if **`publishedTs` is strictly greater than `betTs`**. Signature check here is a **structural stand-in**, not real BLS verification against the live chain key.

Prefer [orng.wax](https://github.com/worldwide-asset-exchange/wax-orng) on WAX mainnet.

## Do

- Require `publishedTs > betTs` (strict inequality). Equal timestamps are refused.
- Resolve **once** per bet.
- Map randomness with rejection sampling before any game modulus.
- Document that production must verify BLS against the published drand chain key ([drand.love](https://drand.love/)).

## Don't

- Accept a beacon the player could already see at bet time.
- Treat a matching local digest as a network proof.
- Skip orng on WAX just because drand is public.

## Common mistakes

1. `publishedTs >= betTs` (allows a print already known at the bet instant).
2. Calling this file a “BLS verifier” in a README without the structural caveat.
3. Using the raw beacon bytes as a d20 without rejection sampling.
4. Confusing this with the [Solana price `publishTime` gate](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth) — same *time* idea, different payload and chain.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Real BLS verify | Needs the group parameters and on-chain cost model |
| Round-number commit at bet | Player picks future round; still enforce time |
| Game book after accept | [dice](https://github.com/pixel-journey/px-orng-dice-multi-tier-payout) / [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) |

Related: [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) · [TAPOS](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos) · [Solana facade](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth) · `px-contract-examples-vault` (private index; not this public course)
