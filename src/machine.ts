import { assign, setup } from "xstate";
import { BoardPos, Game, LandscapeType, Player } from "./engine/game.ts";
import { Card, GetCardTargetEvent, Landscape } from "./engine/card.ts";
import { globalTempVariable, setGlobalTempVariable } from "./PlayGameScreen.tsx";
import { GetBoardPosTargetEvent } from "./engine/event.ts";




function initGame(player1Cards: Card[], player2Cards: Card[]) {
    
    const swampLand = new Landscape(
        "Swamp",
        "Goopy!",
        LandscapeType.Swamp,
      );
      Game.startNewGame();
      let g = Game.getInstance();
      let p1 = g.getPlayerById(0);
      let p2 = g.getPlayerById(1);

      
g.addEventListener(GetCardTargetEvent, (evt: Event) => {
if (evt instanceof GetBoardPosTargetEvent) {
  var player: Player = Game.getInstance().getPlayerById(evt.executorId);
  let tmp = Game.getInstance().board.getBoardPosByOwnerId(
    player.id,
    globalTempVariable,
  );
  if (tmp) {
    evt.execute(tmp);
  }
}
// globalTempVariable = -1;
setGlobalTempVariable(-1);
});

      

g.board.getSideByOwnerId(0)?.map((pos: BoardPos) => {
pos.setLandscape(swampLand);
});
g.board.getSideByOwnerId(1)?.map((pos: BoardPos) => {
pos.setLandscape(swampLand);
});

p1.setDeck(player1Cards);
p2.setDeck(player2Cards);

p1.drawCard(5, false);
p2.drawCard(5, false);

p1;

p1.username = "Player 1";
p2.username = "Player 2";


  return Game.getInstance() as Game;
}





export interface Context {
  game: Game | null;
}

export type Events = {
  type: "choose_decks";
  player1Cards: Card[];
  player2Cards: Card[];
};

export const machine = setup({
  types: {
    context: {} as Context,
    events: {} as Events,
  },
  actions: {
    startGame: assign({
        game: ({event}) => initGame(event.player1Cards, event.player2Cards)
    }),
  },
  guards: {},
  schemas: {
    /* ... */
  },
}).createMachine({
  context: {
    game: null,
  },
  id: "app",
  initial: "SelectDecks",
  states: {
    SelectDecks: {
      on: {
        choose_decks: {
          target: "Play",
        },
      },
    },
    Play: {
        entry: [
            {type: "startGame"}
        ]
    },
  },
});