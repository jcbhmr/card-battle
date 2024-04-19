import { expect, test, assert } from "vitest";
import { Game, AbstractGame } from "./model.ts";
import { Card, Creature } from "./engine/card.ts";
import { get as getCardFromCardMap } from "./engine/CardMap.ts";

test("new game works", () => {
  assert(Game.getInstance() instanceof AbstractGame);
  var card: Card | null = getCardFromCardMap("Dark Angel");
  assert(card != null && card instanceof Creature);
  if (card instanceof Creature) {
    card.attack = 21;
    var card2: Card | null = getCardFromCardMap("Dark Andel");
    if (card2 != null && card2 instanceof Creature) {
      assert(card.attack != card2.attack);
    }
  }
});
