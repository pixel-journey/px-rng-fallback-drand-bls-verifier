# Worked examples — drand time gate

`T0 = 1_700_000_000`. Randomness is 32 bytes hex (`11` × 32). Signature field is 48 bytes hex in tests (`22` × 48) — **structural only, not real BLS verification**.

## Resolve after bet

Open bet at `T0`. Beacon `publishedTs: T0 + 1` → phase `resolved`, round 100, randomness stored.

| publishedTs | Result |
| --- | --- |
| T0 | not after bet |
| T0 - 1 | not after bet |
| T0 + 1 | ok |

## Digest stand-in

Optional `expectedDigest` must match `beaconDigest(beacon)`. Wrong digest (`00` × 32) → `bad signature`. Matching digest accepts.

This is **not** BLS12-381 verification. Production must verify the League of Entropy signature properly.

## Once-only

Second `verifyAndResolve` → `already resolved`.

## Shape checks

| Case | Error |
| --- | --- |
| randomness `abcd` | bad randomness |
| player `Bad` | bad player |
| betTs -1 | bad betTs |

`uint32FromRandomness("0000002a" + …)` → `0x2a`.
