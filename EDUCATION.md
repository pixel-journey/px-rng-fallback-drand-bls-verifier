# Education

If a player can bind a bet to a drand round that already exists, they can grind favorable randomness. The contract rule is: the beacon's **published time must be strictly greater than the bet timestamp**.

Equal times are refused — the round may already have been public at the moment of the bet.

A production verifier still needs real BLS12-381 verification against the League of Entropy group public key. This lab only enforces the time gate and payload shape, plus an optional digest stand-in so tests can exercise a failed "signature" path without claiming crypto security.
