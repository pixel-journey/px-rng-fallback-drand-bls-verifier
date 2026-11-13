# Education — drand round after the bet

> **Rung:** `npm test` passes. Prefer [orng.wax](https://github.com/worldwide-asset-exchange/wax-orng) on WAX.  
> Structural gate only: **publishedTs must be strictly greater than betTs**. Signature is a **hash stand-in**, not BLS12-381.

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | Refuse equal or earlier beacon times |
| Intermediate | Shape-check randomness (64 hex) and signature length |
| Masterclass | Optional expectedDigest vs real BLS verification gap |

## Beginner

Open a bet at `betTs`. A beacon is acceptable only if `publishedTs > betTs`. Same second is **not** after.

## Intermediate

`assertBeaconShape` enforces round bounds and hex formats. `verifyAndResolve` freezes randomness onto the bet once.

## Masterclass

`beaconDigest` is sha256 of round|randomness|signature for teaching. Production must verify League of Entropy BLS signatures (see [drand.love](https://drand.love/)). This lab never claims that.

## Will not teach

Live HTTP fetch of drand, real BLS pairing, or replacing orng.wax on WAX.
