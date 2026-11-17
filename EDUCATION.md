# Education — post-bet drand beacon gate

> **Rung:** `npm test` passes. Optional digest check stands in for BLS signature verification. No live League of Entropy call.  
> **The test is the rule.**

A bet at time `betTs` may only accept a beacon whose `publishedTs` is **strictly later**. Same-second beacons are a fairness bug: the player could have seen the randomness before placing the bet.

Prefer [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) on WAX when available. This lab is the **public randomness fallback** with a time gate.

Siblings: [TAPOS](https://github.com/pixel-journey/px-rng-fallback-future-block-tapos), [commit-reveal](https://github.com/pixel-journey/px-rng-fallback-commit-reveal), [quorum](https://github.com/pixel-journey/px-rng-fallback-multi-oracle-quorum), [Solana price gate](https://github.com/pixel-journey/px-rng-crosschain-solana-pyth) (same strict-after idea).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | publishedTs must be strictly after betTs |
| Intermediate | Once-only resolve; bad digest refuses |
| Masterclass | Why this is not a live BLS verify |

---

## Beginner

`T0 = 1_700_000_000`. Randomness `11`×32, signature `22`×48.

| Beacon publishedTs | Result |
| --- | --- |
| T0 + 1 | resolved, round stored |
| T0 (exact) | `not after bet` |
| T0 - 1 | `not after bet` |

Player name `Bad` or betTs `-1` refused on open.

## Intermediate

| Check | Result |
| --- | --- |
| expectedDigest mismatch | `bad signature` |
| matching `beaconDigest(beacon)` | accepted |
| second resolve | `already resolved` |
| short randomness `abcd` | `bad randomness` |
| `uint32FromRandomness` of `0000002a` + rest | **0x2a** |

## Masterclass — honesty

### What the digest check is

The lab compares a digest you pass to a digest computed from the beacon object. That is a **teaching stand-in** for signature verification. It does **not**:

- Fetch the chain from api.drand.love  
- Verify a BLS signature against the League of Entropy public key  
- Prove the round number is the next round after the bet  

### Common mistakes

1. Accepting `publishedTs === betTs` (“close enough”).  
2. Resolving twice if two clients race.  
3. Using only the first byte without documenting rejection sampling for a game modulus.  
4. Shipping the digest compare as if it were BLS.

### Nice-to-have extensions (not in this repo)

- Real BLS verify against the quicknet or default chain public key.  
- Round number > last accepted round (not only timestamp).  
- Unbias mapping via [loot CDF](https://github.com/pixel-journey/px-orng-weighted-loot-table-cdf) / [byte-slicer](https://github.com/pixel-journey/px-orng-byte-slicer-multi-roll).  
- Fallback order: try orng, then drand, then TAPOS.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).

### Exercises

1. Exact betTs — accept or refuse? (Refuse.)  
2. First four bytes `0000002a` — uint32? (0x2a)  
3. Is this a live BLS verify? (No.)
