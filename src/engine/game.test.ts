import { expect, test, assert } from "vitest";
import {
  Game,
  AbstractGame,
  LandscapeType,
  BoardPos,
  CardType,
  Player,
} from "./game.ts";
import { Card, Creature, Landscape, GetCardTargetEvent } from "./card.ts";
import { get as getCardFromCardMap } from "./CardMap.ts";
import {
  GetBoardPosTargetEvent,
  PlayCardEventName,
  PlayCardEvent,
} from "./event.ts";

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
  var deck1: Card[] = [
    getCardFromCardMap("Dark Angel"),
    getCardFromCardMap("Bog Bum"),
    getCardFromCardMap("Fly Swatter"),
    getCardFromCardMap("Dark Angel"),
    getCardFromCardMap("Bog Bum"),
    getCardFromCardMap("Fly Swatter"),
    getCardFromCardMap("Dark Angel"),
    getCardFromCardMap("Bog Bum"),
    getCardFromCardMap("Fly Swatter"),
    getCardFromCardMap("Dark Angel"),
    getCardFromCardMap("Bog Bum"),
    getCardFromCardMap("Fly Swatter"),
  ];

  assert(
    deck1.map((card: Card) => {
      return card.name != Card.getNull().name;
    }),
  );

  var deck2: Card[] = [
    getCardFromCardMap("Dark Angel"),
    getCardFromCardMap("Bog Bum"),
    getCardFromCardMap("Fly Swatter"),
    getCardFromCardMap("Dark Angel"),
    getCardFromCardMap("Bog Bum"),
    getCardFromCardMap("Fly Swatter"),
    getCardFromCardMap("Dark Angel"),
    getCardFromCardMap("Bog Bum"),
    getCardFromCardMap("Fly Swatter"),
    getCardFromCardMap("Dark Angel"),
    getCardFromCardMap("Bog Bum"),
    getCardFromCardMap("Fly Swatter"),
  ];

  var tempDeck: Card[] = [
    getCardFromCardMap("Dark Angel"),
    getCardFromCardMap("Bog Bum"),
    getCardFromCardMap("Fly Swatter"),
    getCardFromCardMap("Dark Angel"),
    getCardFromCardMap("Bog Bum"),
    getCardFromCardMap("Fly Swatter"),
    getCardFromCardMap("Dark Angel"),
    getCardFromCardMap("Bog Bum"),
    getCardFromCardMap("Fly Swatter"),
    getCardFromCardMap("Dark Angel"),
    getCardFromCardMap("Bog Bum"),
    getCardFromCardMap("Fly Swatter"),
  ];

  var swampLand: Landscape = new Landscape(
    "Swamp",
    "Goopy!",
    LandscapeType.Swamp,
  );

  Game.startNewGame();

  //Game Test
  Game.getInstance().addGameEventListener(GetCardTargetEvent, (evt: Event) => {
    //console.log("Recieved event with name " + evt.type);
    if (evt instanceof GetBoardPosTargetEvent) {
      //console.log("Recieved event of Type GetBoardPosTargetEvent!");
      var player: Player = Game.getInstance().getPlayerById(evt.executorId);
      var didExecute = false;
      var playerBoard: BoardPos[] | undefined =
        Game.getInstance().board.getSideByOwnerId(player.id);
      if (typeof playerBoard == "undefined") {
        console.log("====PlayerId is incorrect, cannot play card!====");
      } else {
        for (var j = 0; j < playerBoard.length; j++) {
          if (didExecute) {
            return;
          } else {
            didExecute = evt.execute(playerBoard[j]);
          }
        }
      }
    }
  });

  Game.getInstance().addGameEventListener(PlayCardEventName, (evt: Event) => {
    console.log("Recieved PlayCardEvent event with name " + evt.type);
    // if(evt instanceof PlayCardEvent) {
    //   var board: BoardPos[] | undefined = Game.getInstance().board.getSideByOwnerId(Game.getInstance().getPlayerById(evt.executorId).id);
    //   if(typeof(board) != "undefined") {
    //     for(var i = 0; i < board.length; i++) {
    //       if(evt.card.play(board[i], evt.executorId)) {
    //         break;
    //       }
    //     }
    //   }
    // }
  });

  Game.getInstance()
    .board.getSideByOwnerId(0)
    ?.map((pos: BoardPos) => {
      pos.setLandscape(swampLand);
    });
  Game.getInstance()
    .board.getSideByOwnerId(1)
    ?.map((pos: BoardPos) => {
      pos.setLandscape(swampLand);
    });

  var player0Side: BoardPos[] | undefined =
    Game.getInstance().board.getSideByOwnerId(0);
  expect(
    typeof player0Side != "undefined" &&
      player0Side[0].landscape == LandscapeType.Swamp,
  );

  assert(
    Game.getInstance().currentPlayer == Game.getInstance().getPlayerById(0),
  );

  Game.getInstance().getPlayerById(0).setDeck(deck1);
  Game.getInstance().getPlayerById(1).setDeck(deck2);

  // console.log("===================================== SHUFFLED DECKS =====================================");
  // var deck1String = "";
  // tempDeck.map((card: Card) => {deck1String += (card.name + ", ")});
  // console.log("Pre-shuffle Deck: {" + deck1String.slice(0, deck1String.length - 2) + "}, length " + tempDeck.length);
  // deck1String = "";
  // Game.getInstance().getPlayerById(0).deck.map((card: Card) => {deck1String += (card.name + ", ")});
  // console.log("Player 1's Deck: {" + deck1String.slice(0, deck1String.length - 2) + "}, length " + Game.getInstance().getPlayerById(0).deck.length);
  // deck1String = "";
  // Game.getInstance().getPlayerById(1).deck.map((card: Card) => {deck1String += (card.name + ", ")});
  // console.log("Player 2's Deck: {" + deck1String.slice(0, deck1String.length - 2) + "}, length " + Game.getInstance().getPlayerById(1).deck.length);

  Game.getInstance().getPlayerById(0).drawCard(6, false);
  Game.getInstance().getPlayerById(1).drawCard(5, false);

  assert(Game.getInstance().currentPlayer.hand.length == 6);

  for (var i = 0; i < 50; i++) {
    console.log(
      "====================================== TURN " +
        (i + 1) +
        " ======================================",
    );
    console.log(
      "Game Phase: " +
        Game.getInstance().turnPhase +
        ", Actual Game turn: " +
        (Game.getInstance().currentTurn + 1),
    );
    console.log(
      "My HP: " +
        Game.getInstance().currentPlayer.hp +
        ", Their HP: " +
        Game.getInstance().getOtherPlayer(Game.getInstance().currentPlayer.id)
          .hp,
    );
    var cardHand = "";
    Game.getInstance().currentPlayer.hand.map((card: Card) => {
      cardHand += card.name + ", ";
    });
    console.log(
      "Current player's hand: [" + cardHand.slice(0, cardHand.length - 2) + "]",
    );

    var playerHand: Card[] = Game.getInstance().currentPlayer.hand;
    for (var j = 0; j < playerHand.length; j++) {
      var card: Card = playerHand[j];
      if (
        Game.getInstance().currentPlayer.actions >= card.getCost() &&
        card.cardType == CardType.Creature
      ) {
        //console.log("Trying to play card " + card.name);
        if (
          Game.getInstance().playCard(card, Game.getInstance().currentPlayer.id)
        ) {
          //console.log("Trying to play card " + card.name);
        }
      }
    }

    assert(
      Game.getInstance().currentPlayer.actions >= 0,
      "Player Actions left: " + Game.getInstance().currentPlayer.actions,
    );
    Game.getInstance().enterNextPhase();

    var mySide: BoardPos[] | undefined =
      Game.getInstance().board.getSideByOwnerId(
        Game.getInstance().currentPlayer.id,
      );
    var theirSide: BoardPos[] | undefined =
      Game.getInstance().board.getSideByOwnerId(
        Game.getInstance().getOtherPlayer(Game.getInstance().currentPlayer.id)
          .id,
      );

    assert(typeof mySide != "undefined" && typeof theirSide != "undefined");
    assert(mySide.length == theirSide.length);

    var mySideString = "";
    for (var j = 0; j < mySide.length; j++) {
      mySideString +=
        mySide[j].creature.name +
        "{A:" +
        mySide[j].creature.attack +
        "--D:" +
        mySide[j].creature.defense +
        "}" +
        ", ";
    }
    console.log(
      "My Side: [" + mySideString.slice(0, mySideString.length - 2) + "]",
    );

    var theirSideString = "";
    for (var j = 0; j < theirSide.length; j++) {
      theirSideString +=
        theirSide[j].creature.name +
        "{A:" +
        theirSide[j].creature.attack +
        "--D:" +
        theirSide[j].creature.defense +
        "}" +
        ", ";
    }
    console.log(
      "Their Side: [" +
        theirSideString.slice(0, theirSideString.length - 2) +
        "]",
    );

    //Do attacks
    if (typeof mySide != "undefined" && typeof theirSide != "undefined") {
      for (var j = 0; j < mySide.length; j++) {
        var myPos: BoardPos = mySide[j];
        var theirPos: BoardPos = theirSide[j];
        if (!myPos.creature.equals(Creature.getNull())) {
          if (!theirPos.creature.equals(Creature.getNull())) {
            console.log(
              "My " +
                myPos.creature.name +
                " is attacking their " +
                theirPos.creature.name +
                " in lane " +
                (myPos.posId + 1) +
                "!",
            );
            myPos.creature.Attack(theirPos.creature);
          } else {
            console.log(
              "My " +
                myPos.creature.name +
                " is attacking their hero from lane " +
                myPos.posId +
                "!",
            );
            myPos.creature.Attack(
              Game.getInstance().getOtherPlayer(
                Game.getInstance().currentPlayer.id,
              ),
            );
          }
        }
      }
    }

    if (
      Game.getInstance().getOtherPlayer(Game.getInstance().currentPlayer.id)
        .hp <= 0
    ) {
      console.log(
        "Player " + Game.getInstance().currentPlayer.id + " has won the game!",
      );
      break;
    }

    Game.getInstance().enterNextPhase();
  }
});
