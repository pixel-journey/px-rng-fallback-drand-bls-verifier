# Worked examples — drand time gate

Bet at `T0`. Beacon randomness `11`×32, signature structural `22`×48.

## Accept / refuse

| publishedTs | Result |
| --- | --- |
| T0 + 1 | resolved, round 100 |
| T0 | not after bet |
| T0 - 1 | not after bet |

Optional `expectedDigest`: mismatch → `bad signature`; match accepts.

Second resolve → `already resolved`. Short randomness → `bad randomness`. Bad player name / negative betTs refused on open.

`uint32FromRandomness` first four bytes: `0000002a…` → `0x2a`.

**Not real BLS verification** — structural digest stand-in only. Live League of Entropy verification is out of scope.
