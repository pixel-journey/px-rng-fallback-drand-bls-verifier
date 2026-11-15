# Education — drand as a time-locked beacon

## Beginner

A bet at time T may only accept a public randomness beacon published **strictly after** T. That stops grinding a known past round.

## Intermediate

The lab checks:

1. Time ordering (`publishedTs > betTs`).
2. Randomness length (32 bytes hex).
3. Optional digest equality as a **stand-in** for signature verify.
4. Once-only resolve.

It does **not** run BLS verification.

## Masterclass (not in this repo)

- Real BLS12-381 verify against the drand public key.
- Fetching the beacon from the League of Entropy API.
- Mapping randomness into a game payout.

## Outcomes

1. Refuse equal and earlier timestamps.
2. State that "bad signature" here means digest mismatch, not cryptography.
3. Refuse a second resolve.
