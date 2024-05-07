import { get, exportDecks } from "./engine/CardMap";
import PlayGameScreen from "./PlayGameScreen";
import { DeckSelectScreen } from "./DeckSelectScreen";
import { machine } from "./machine";
import { useMachine } from "@xstate/react";

function App() {
    const [state, send] = useMachine(machine);

    const deckNames = exportDecks.map((deck) => deck.name);
    function handleChoose(name1: string, name2: string) {
        const deck = exportDecks.find((deck) => deck.name === name1)!;
        const deck2 = exportDecks.find((deck) => deck.name === name2)!;
        send({ type: "choose_decks", player1Cards: deck.deck().cards, player2Cards: deck2.deck().cards });
    }
  
    return (
      <>
        {state.matches("SelectDecks") && (
          <DeckSelectScreen onChoose={handleChoose} deckNames={deckNames} />
        )}
        {state.matches("Play") && <PlayGameScreen game={state.context.game!} />
        }
      </>
    );
}

export default App;
