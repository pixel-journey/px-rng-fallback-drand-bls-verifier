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

`expectedDigest` wrong → `bad signature`. Matching `beaconDigest(beacon)` accepts.

Second resolve → `already resolved`. Short randomness `abcd` → `bad randomness`.

## uint32FromRandomness

`0000002a` + 28 bytes of `11` → **0x2a**.

Teaching gate only — not a live BLS verify against the League of Entropy network.
