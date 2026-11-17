# Tips — drand post-bet gate

## Do

- Require `publishedTs > betTs` (strict).  
- Resolve once per bet.  
- Map randomness with rejection sampling before a game modulus.  
- Document that production must verify BLS against the published chain key.

## Don't

- Accept the beacon the player could already see.  
- Treat a matching local digest as a network proof.  
- Skip orng on WAX just because drand is public.

## Related

[orng dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) · [TAPOS](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos) · [Solana price gate](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth) · [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf)
