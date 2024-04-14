import { expect, test, assert } from "vitest";
import { game, Game } from "./model.ts";

test("new game works", () => {
  assert(game instanceof Game);
});