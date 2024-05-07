import { Game, Player } from "../engine/game";
import { dumbStupidFunction } from "../PlayGameScreen";

/**
 * @author Tanner Brown
 * Displays card shape with a number on it indicating how many cards are in the pile. This one has onclick to allow player to draw
 * @returns returns markup displaying what i wrote just above
 * @param player: the player whom the deck belongs to. resetState: state to cause re-render. reset: variable necessary for determining re-render.
 * log: the log. needed for if player cannot draw anymore and game must tell player as such. setLog: useState for re-rendering log. game: the game object
 */
export function Deck({
  player,
  resetState,
  reset,
  log,
  setLog,
  game,
}: {
  player: Player;
  resetState: any;
  reset: number;
  log: any;
  setLog: any;
  game: Game;
}) {
  function handleDraw() {
    if (player === game.currentPlayer) {
      if (game.turnPhase == 0) {
        if (!player.drawCardUsingAction()) {
          setLog([
            ...log,
            <div>
              {player.username} attempted to draw, but lacks the actions to
            </div>,
          ]);
        }
        resetState(dumbStupidFunction(reset));
      }
    }
  }
  return (
    <button>
      <div
        className={
          "card_shape flex h-screen hover:border-yellow-800 player_" + player.id
        }
        onClick={handleDraw}
      >
        <div className="text-center text-7xl m-auto">
          <div className="">{player.deck.length}</div>
        </div>
      </div>
    </button>
  );
}
