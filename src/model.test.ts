import { expect, test, assert } from "vitest";
import { Game, AbstractGame } from "./model.ts";

test("new game works", () => {
  assert(Game.getInstance() instanceof AbstractGame);
});
