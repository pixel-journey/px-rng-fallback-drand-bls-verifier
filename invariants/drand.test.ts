import assert from "node:assert/strict";
import test from "node:test";
import {
  beaconDigest,
  openBet,
  uint32FromRandomness,
  verifyAndResolve,
} from "./drand.ts";

const T0 = 1_700_000_000;
const RAND = "11".repeat(32);
const SIG = "22".repeat(48);

function beacon(
  over: Partial<{
    round: number;
    publishedTs: number;
    randomness: string;
    signature: string;
  }> = {},
) {
  return {
    round: 100,
    publishedTs: T0 + 30,
    randomness: RAND,
    signature: SIG,
    ...over,
  };
}

test("open bet starts unresolved", () => {
  const b = openBet({ id: 1, player: "player1", betTs: T0 });
  assert.equal(b.phase, "open");
  assert.equal(b.round, null);
});

test("beacon published strictly after bet resolves", () => {
  const bet = openBet({ id: 1, player: "player1", betTs: T0 });
  const r = verifyAndResolve(bet, beacon({ publishedTs: T0 + 1 }));
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.bet.phase, "resolved");
    assert.equal(r.bet.round, 100);
    assert.equal(r.bet.randomness, RAND);
  }
});

test("beacon at exact betTs refused", () => {
  const bet = openBet({ id: 1, player: "player1", betTs: T0 });
  const r = verifyAndResolve(bet, beacon({ publishedTs: T0 }));
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, "not after bet");
});

test("beacon before bet refused", () => {
  const bet = openBet({ id: 1, player: "player1", betTs: T0 });
  const r = verifyAndResolve(bet, beacon({ publishedTs: T0 - 1 }));
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, "not after bet");
});

test("expectedDigest mismatch is bad signature", () => {
  const bet = openBet({ id: 1, player: "player1", betTs: T0 });
  const r = verifyAndResolve(bet, beacon(), { expectedDigest: "00".repeat(32) });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, "bad signature");
});

test("matching expectedDigest accepts", () => {
  const bet = openBet({ id: 1, player: "player1", betTs: T0 });
  const b = beacon();
  const dig = beaconDigest(b);
  const r = verifyAndResolve(bet, b, { expectedDigest: dig });
  assert.equal(r.ok, true);
});

test("second resolve refused", () => {
  const bet = openBet({ id: 1, player: "player1", betTs: T0 });
  let r = verifyAndResolve(bet, beacon());
  assert.equal(r.ok, true);
  if (!r.ok) return;
  r = verifyAndResolve(r.bet, beacon({ round: 101, publishedTs: T0 + 60 }));
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, "already resolved");
});

test("bad randomness length refused", () => {
  const bet = openBet({ id: 1, player: "player1", betTs: T0 });
  const r = verifyAndResolve(bet, beacon({ randomness: "abcd" }));
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.reason, "bad randomness");
});

test("bad player and betTs refused on open", () => {
  assert.throws(() => openBet({ id: 1, player: "Bad", betTs: T0 }), /bad player/);
  assert.throws(() => openBet({ id: 1, player: "player1", betTs: -1 }), /bad betTs/);
});

test("uint32FromRandomness reads first 4 bytes", () => {
  assert.equal(uint32FromRandomness("0000002a" + "11".repeat(28)), 0x2a);
});
