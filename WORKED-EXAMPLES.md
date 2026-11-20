# Worked examples — drand beacon gate

`T0 = 1_700_000_000`. Randomness `11`×32, signature `22`×48.

## openBet

Phase `open`, round null. Player `Bad` / betTs `-1` refused.

## verifyAndResolve

| Beacon publishedTs | Result |
| --- | --- |
| T0 + 1 | resolved, round 100, randomness stored |
| T0 (exact) | `not after bet` |
| T0 - 1 | `not after bet` |

| Check | Result |
| --- | --- |
| `expectedDigest` wrong | `bad signature` |
| matching `beaconDigest(beacon)` | accepted |
| second resolve | `already resolved` |
| short randomness `abcd` | `bad randomness` |

## uint32FromRandomness

`0000002a` + 28 bytes of `11` → **0x2a**.

## Product facts

- **Strict inequality:** `publishedTs > betTs` (same second is refused).
- Digest compare is a **teaching stand-in** for signature verification — not League of Entropy BLS.
- Prefer `orng.wax` on WAX when available; this is the public-beacon fallback path.
