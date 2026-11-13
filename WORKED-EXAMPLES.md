# Worked examples — drand gate

## Example A — after bet

betTs 1000, publishedTs 1001 → resolve ok.

## Example B — not after

publishedTs 1000 or 999 → `not after bet`.

## Example C — already resolved

Second verify → `already resolved`.

## Example D — bad shape

Randomness not 64 hex → refused.

## Example E — optional digest

If `expectedDigest` is supplied and mismatches `beaconDigest`, reason `bad signature` (stand-in).
