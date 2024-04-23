import { expect, test, assert } from "vitest";
import { Game, AbstractGame, LandscapeType, BoardPos, CardType } from "./model.ts";
import { Card, Creature, Landscape, GetCardTargetEvent } from "./engine/card.ts";
import { get as getCardFromCardMap } from "./engine/CardMap.ts";
import { GetBoardPosTargetEvent, GetTargetEvent } from "./engine/event.ts";
import { randomInt } from "crypto";
import { Console, log } from "console";

test("new game works", () => {
  assert(Game.getInstance() instanceof AbstractGame);
  var card: Card | null = getCardFromCardMap("Dark Angel");
  assert(card != null && card instanceof Creature);
  if (card instanceof Creature) {
    card.attack = 21;
    var card2: Card | null = getCardFromCardMap("Dark Angel");
    if (card2 != null && card2 instanceof Creature) {
      assert(card.attack != card2.attack);
    }
  }
});

test("Game is Playable", () => {
  //Setup
  var deck1: Card[] = [getCardFromCardMap("Dark Angel"), getCardFromCardMap("Bog Bum"), getCardFromCardMap("Fly Swatter"), getCardFromCardMap("Dark Angel"), 
  getCardFromCardMap("Bog Bum"), getCardFromCardMap("Fly Swatter"), getCardFromCardMap("Dark Angel"), getCardFromCardMap("Bog Bum"), 
  getCardFromCardMap("Fly Swatter"), getCardFromCardMap("Dark Angel"), getCardFromCardMap("Bog Bum"), getCardFromCardMap("Fly Swatter")];

  assert(deck1.map((card: Card) => {return card != Card.getNull()}));

  var deck2: Card[] = [getCardFromCardMap("Dark Angel"), getCardFromCardMap("Bog Bum"), getCardFromCardMap("Fly Swatter"), getCardFromCardMap("Dark Angel"), 
  getCardFromCardMap("Bog Bum"), getCardFromCardMap("Fly Swatter"), getCardFromCardMap("Dark Angel"), getCardFromCardMap("Bog Bum"), 
  getCardFromCardMap("Fly Swatter"), getCardFromCardMap("Dark Angel"), getCardFromCardMap("Bog Bum"), getCardFromCardMap("Fly Swatter")];

  assert(deck2.map((card: Card) => {return card != Card.getNull()}));

  var swampLand: Landscape = new Landscape("Swamp", "Goopy!", LandscapeType.Swamp);

  Game.startNewGame();

  //Game Test
  Game.getInstance().board.getSideByOwnerId(0)?.map((pos: BoardPos) => {pos.setLandscape(swampLand)});

  var player0Side: BoardPos[] | undefined = Game.getInstance().board.getSideByOwnerId(0);
  expect(typeof player0Side != "undefined" && player0Side[0].landscape == LandscapeType.Swamp);

  assert(Game.getInstance().currentPlayer == Game.getInstance().getPlayerById(0));

  Game.getInstance().currentPlayer.deck = deck1;
  Game.getInstance().currentPlayer.drawCard(6, false);

  assert(Game.getInstance().currentPlayer.hand.length == 6);

  for(var i = 0; i < 25; i++) {
  Game.getInstance().currentPlayer.hand.map((card: Card) => {if(card.cardType != CardType.Spell) {Game.getInstance().playCard(card, Game.getInstance().currentPlayer.id)}});

  assert(Game.getInstance().currentPlayer.actions >= 0);
  Game.getInstance().enterNextPhase();

  var mySide: BoardPos[] | undefined = Game.getInstance().board.getSideByOwnerId(Game.getInstance().currentPlayer.id);
  var theirSide: BoardPos[] | undefined = Game.getInstance().board.getSideByOwnerId(Game.getInstance().getOtherPlayer(Game.getInstance().currentPlayer.id).id)
  
  assert(typeof(mySide) != "undefined" && typeof(theirSide) != "undefined");
  assert(mySide.length == theirSide.length);

  //Not going to worry about testing with abilities right now, we can test that in another Test() call
  Game.getInstance().enterNextPhase();

  //Do attacks
  if(typeof(mySide) != "undefined" && typeof(theirSide) != "undefined") {
    for(var j = 0; j < mySide.length; j++) {
      var myPos: BoardPos = mySide[j];
      var theirPos: BoardPos = theirSide[j];
      if(myPos.creature != Creature.getNull()) {
         if(theirPos.creature == Creature.getNull()) {
          myPos.creature.Attack(theirPos.creature);
         }else {
          myPos.creature.Attack(Game.getInstance().getOtherPlayer(Game.getInstance().currentPlayer.id));
         }
      }
    }
  }

  if(Game.getInstance().getOtherPlayer(Game.getInstance().currentPlayer.id).hp <= 0) {
    log("Player " + Game.getInstance().currentPlayer.id + " has won the game!");
    break;
  }
}
});