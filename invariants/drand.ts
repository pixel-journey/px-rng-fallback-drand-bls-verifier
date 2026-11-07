/**
 * drand / League of Entropy round gate (educational).
 * Accept a beacon round only if its published time is strictly after the bet.
 * Signature check here is a structural/hash stand-in — not real BLS12-381.
 * No live drand API. No wasm.
 */

import { createHash } from "node:crypto";

export const MIN_ROUND = 1;
export const MAX_ROUND = 2 ** 53 - 1;
export const RANDOMNESS_HEX = 64;
export const SIG_HEX_MIN = 64;
export const SIG_HEX_MAX = 192;

export type Bet = {
  id: number;
  player: string;
  betTs: number;
  phase: "open" | "resolved";
  round: number | null;
  randomness: string | null;
};

export type BeaconRound = {
  round: number;
  publishedTs: number;
  randomness: string;
  signature: string;
  previousSignature?: string;
};

export type VerifyResult =
  | { ok: true; bet: Bet }
  | { ok: false; reason: string };

const NAME = /^[a-z1-5.]{1,12}$/;
const HEX = /^[0-9a-f]+$/;

function assertName(name: string): void {
  if (!NAME.test(name) || name.startsWith(".") || name.endsWith(".")) {
    throw new Error("bad player");
  }
}

export function openBet(input: {
  id: number;
  player: string;
  betTs: number;
}): Bet {
  if (!Number.isInteger(input.id) || input.id < 1) throw new Error("bad id");
  assertName(input.player);
  if (!Number.isInteger(input.betTs) || input.betTs < 0) throw new Error("bad betTs");
  return {
    id: input.id,
    player: input.player,
    betTs: input.betTs,
    phase: "open",
    round: null,
    randomness: null,
  };
}

function normalizeHex(h: string, label: string, min: number, max: number): string {
  const hex = h.toLowerCase();
  if (!HEX.test(hex) || hex.length < min || hex.length > max || hex.length % 2 !== 0) {
    throw new Error("bad " + label);
  }
  return hex;
}

export function assertBeaconShape(beacon: BeaconRound): void {
  if (
    !Number.isInteger(beacon.round) ||
    beacon.round < MIN_ROUND ||
    beacon.round > MAX_ROUND
  ) {
    throw new Error("bad round");
  }
  if (!Number.isInteger(beacon.publishedTs) || beacon.publishedTs < 0) {
    throw new Error("bad publishedTs");
  }
  normalizeHex(beacon.randomness, "randomness", RANDOMNESS_HEX, RANDOMNESS_HEX);
  normalizeHex(beacon.signature, "signature", SIG_HEX_MIN, SIG_HEX_MAX);
}

export function beaconDigest(beacon: BeaconRound): string {
  assertBeaconShape(beacon);
  const r = beacon.randomness.toLowerCase();
  const s = beacon.signature.toLowerCase();
  return createHash("sha256")
    .update(`${beacon.round}|${r}|${s}`, "utf8")
    .digest("hex");
}

export function verifyAndResolve(
  bet: Bet,
  beacon: BeaconRound,
  input: { expectedDigest?: string } = {},
): VerifyResult {
  if (bet.phase !== "open") return { ok: false, reason: "already resolved" };
  try {
    assertBeaconShape(beacon);
  } catch (e) {
    return { ok: false, reason: (e as Error).message };
  }
  if (beacon.publishedTs <= bet.betTs) {
    return { ok: false, reason: "not after bet" };
  }
  if (input.expectedDigest !== undefined) {
    const dig = beaconDigest(beacon);
    if (dig !== input.expectedDigest.toLowerCase()) {
      return { ok: false, reason: "bad signature" };
    }
  }
  return {
    ok: true,
    bet: {
      ...bet,
      phase: "resolved",
      round: beacon.round,
      randomness: beacon.randomness.toLowerCase(),
    },
  };
}

export function uint32FromRandomness(randomness: string): number {
  const h = randomness.toLowerCase();
  if (!/^[0-9a-f]{64}$/.test(h)) throw new Error("bad randomness");
  return Number(BigInt("0x" + h.slice(0, 8)));
}
