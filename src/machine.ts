import { assign, setup } from "xstate"
import { Game, Player } from "./engine/game.ts"
import * as cards from "./engine/CardMap.ts"

export interface Context {
    game: Game | null
}

function addDemoCardsTo(player: Player) {
    player.deck.push(cards.get("Dark Angel")!);
    player.deck.push(cards.get("Swamp Dragon")!);
    player.deck.push(cards.get("Dark Angel")!);
    player.deck.push(cards.get("Swamp Dragon")!);
    player.deck.push(cards.get("Dark Angel")!);
  
    player.hand.push(cards.get("Dark Angel")!);
    player.hand.push(cards.get("Swamp Dragon")!);
    player.hand.push(cards.get("Dark Angel")!);
    player.hand.push(cards.get("Swamp Dragon")!);
    player.hand.push(cards.get("Dark Angel")!);
  }

export type Events =
    | { type: "choose_decks", player1DeckName: string, player2DeckName: string }

export const machine = setup({
    types: {
        context: {} as Context,
        events: {} as Events,
    },
    actions: {
        startGame({ context, event }, params) {
            const game = new Game()
            addDemoCardsTo(game.getPlayerById(0))
            addDemoCardsTo(game.getPlayerById(1))
            context.game = game
        }
    },
    guards: {},
    schemas: { /* ... */ },
}).createMachine({
    context: {
        game: null,
    },
    id: "app",
    initial: "SelectDecks",
    states: {
        "SelectDecks": {
            on: {
                "choose_decks": {
                    target: "Play"
                }
            }
        },
        "Play": {}
    }
})