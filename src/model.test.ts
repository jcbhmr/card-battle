import { expect, test, assert } from "vitest";
import { Game } from "./model.ts";

test("new game works", () => {
  assert(Game.getInstance() instanceof Game);
});