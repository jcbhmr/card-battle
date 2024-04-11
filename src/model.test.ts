import { expect, test, assert } from "vitest";
import { Game, TurnPhases } from "./model.ts";

test("new game works", () => {
  Game.instance.enterNextPhase();
  assert(Game.instance.turnPhase == TurnPhases.Action);
});