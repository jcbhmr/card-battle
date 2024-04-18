import { expect, test, assert } from "vitest";
import { Game, AbstractGame, Card, Creature } from "./model.ts";
import { get as getCardFromCardMap } from "./CardMap.ts";

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
