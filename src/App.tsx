import { ReactNode, createContext, useContext, useState } from "react";
import {
  Game,
  Player,
  SidedBoard,
  Targeter,
  LandscapeType,
  BoardPos,
} from "./engine/game";
//import { Creature, Building, Card } from "./engine/card";
import { Creature, Card, Landscape } from "./engine/card";
import { get, exportDecks } from "./engine/CardMap";

import { GetCardTargetEvent } from "./engine/card";
import { GetBoardPosTargetEvent } from "./engine/event";

let globalTempVariable = -1;

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WuNN16G0fnd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 * @author Tanner Brown
 * This has changed a lot since I've made it so let me redo the documentation. Renders a card with onclick/onhover functionality. "state" is poorly named.
 * @returns Returns a card component
 * @param card: the card to render. state: sets the summoning buttons state to a number that makes it true or something. setHover: changes state on the hover useState.
 * essentially, it just makes the magnified card the hovered card. currentplayer: the current player (needed for making events turn exclusive). ownerPlayer: the
 * player the cards are assigned to. phase: current turn phase. needed for making events phase exclusive
 */
function CardComponent({
  card,
  state,
  position,
  setHover,
  currentPlayer,
  ownerPlayer,
  phase,
}: {
  card: Card | Creature;
  children?: ReactNode;
  state: React.Dispatch<React.SetStateAction<number>>;
  setHover: any;
  position: number;
  currentPlayer: Player;
  ownerPlayer: Player;
  phase: number;
}) {
  function handleClick() {
    //in future, if we add spells/buildings again there should be an if statement for activating those
    if (card instanceof Creature) {
      // if the card being clicked belongs to the current turn player
      if (currentPlayer.id == ownerPlayer.id) {
        // if the current phase is the main phase
        if (phase == 0) {
          //why did i make this a number instead of a boolean? am i stupid or something?
          state(position);
        }
      }
      // mark pos of hand
    }
    // else if (card instanceof Building){
    //   //place building
    // }
    // else{
    //   //activate spell
    // }
  }
  return (
    <button>
      <div
        className={
          "card_shape overflow-auto hover:border-black player_" + ownerPlayer.id
        }
        onClick={handleClick}
        onMouseOver={() => {
          setHover(card);
        }}
      >
        <div className="flex aspect-16/9">
          <img
            alt={card.name}
            className="object-cover"
            height={135}
            src={card.imagePath}
            style={{
              aspectRatio: "240/135",
              objectFit: "cover",
            }}
            width={350}
          />
        </div>
        <div className="flex-1 p-4 grid gap-2">
          <h2 className="text-lg font-bold tracking-tight">{card.name}</h2>
        </div>
      </div>
    </button>
  );
}
/**
 * @author Tanner Brown
 * I spoke about this in my documentation on the CreatureComponentOnBoard component. Check there for why this is a thing
 * @param param0
 * @returns
 */
function CardComponentOnBoard({
  card,
  setHover,
}: {
  card: Card | Creature;
  children?: ReactNode;
  setHover: any;
}) {
  let className = "card_shape_not_ready overflow-hidden";
  let classNameImg = "object-cover rotate-90";

  if (card.getIsReady()) {
    className = "card_shape overflow-hidden";
    classNameImg = "object-cover";
  }
  return (
    <button>
      <div
        className={className}
        onMouseOver={() => {
          setHover(card);
        }}
      >
        <div className="flex aspect-16/9">
          <img
            alt={card.name}
            className={classNameImg}
            height={135}
            src={card.imagePath}
            style={{
              aspectRatio: "240/135",
              objectFit: "cover",
            }}
            width={350}
          />
        </div>
        <div className="flex-1 p-4 grid gap-2">
          <h2 className="text-lg font-bold tracking-tight">{card.name}</h2>
        </div>
      </div>
    </button>
  );
}

/**
 * so basically this is just Card Component, but for creatures. It's kinda like a fucked up version
 * of inheritance for objects. I'm using the children props that Jacob showed me to essentially just
 * add attack and defense to the rest of a card component.
 * @author Tanner Brown and Jacob Hummer
 * @param cardName: string, cardText: string, actionCost: number, 
    landscapeType: string, attack: number, defense: number, imagePath: string
 * @returns CardComponent, but with attack/defense values
 */
function CreatureComponent({
  card,
  state,
  position,
  setHover,
  currentPlayer,
  ownerPlayer,
  phase,
}: {
  card: Creature;
  state: React.Dispatch<React.SetStateAction<number>>;
  setHover: any;
  currentPlayer: Player;
  ownerPlayer: Player;
  position: number;
  phase: number;
}) {
  let child = (
    <>
      <div>Attack: {card.attack}</div>
      <div>Defense: {card.defense}</div>
    </>
  );
  return (
    <CardComponent
      card={card}
      state={state}
      ownerPlayer={ownerPlayer}
      currentPlayer={currentPlayer}
      phase={phase}
      setHover={setHover}
      position={position}
    >
      {child}
    </CardComponent>
  );
}
/**
 * Kinda dumb, but since cards on board have different function than ones in hand I felt this was necessary. Currently, this just is the other creature/card
 * component but without triggering summoning buttons
 * @param param0
 * @returns
 */
function CreatureComponentOnBoard({
  card,
  setHover,
}: {
  card: Creature;
  setHover: any;
}) {
  let child = (
    <>
      <div>Attack: {card.attack}</div>
      <div>Defense: {card.defense}</div>
    </>
  );
  return (
    <CardComponentOnBoard
      card={card}
      setHover={setHover}
    ></CardComponentOnBoard>
  );
}

/**
 * @author Tanner Brown
 * So basically this is the markup that sits on the left of the screen. If its null (ie. no one has hovered a card yet) then its blank. However, if a card
 * (whether it be field or hand) is hovered we show it here. It's essentially a magnified version of the card so you don't have to break out the reading glasses
 * to read a card.
 * @param param0
 * @returns
 */
function HoverCard({ card }: { card: Creature }) {
  if (card === null) {
    return <div className="hover_card_shape"></div>;
  }
  return (
    <div className="hover_card_shape overflow-auto">
      <div className="flex aspect-16/9">
        <img
          alt={card.name}
          className="object-cover"
          height={135}
          src={card.imagePath}
          style={{
            objectFit: "cover",
          }}
          width={350}
        />
      </div>
      <div className="flex-1 p-4 grid gap-2">
        <h2 className="text-s font-bold tracking-tight">{card.name}</h2>
        <p className="text-sm line-clamp-3">{card.flavorText}</p>
        <div className="text-xs">
          <div>
            AC: {card.getCost()} Type: {card.landscapeType}{" "}
          </div>
          <div></div>

          <div>Attack: {card.attack}</div>
          <div>Defense: {card.defense}</div>
        </div>
      </div>
    </div>
  );
}
/**
 * @author Tanner Brown
 * Displays card shape with a number on it indicating how many cards are in the pile. This one has onclick to allow player to draw
 * @returns returns markup displaying what i wrote just above
 * @param player: the player whom the deck belongs to. resetState: state to cause re-render. reset: variable necessary for determining re-render.
 * log: the log. needed for if player cannot draw anymore and game must tell player as such. setLog: useState for re-rendering log. game: the game object
 */
function Deck({
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

/**
 * Displays card shape with a number on it indicating how many cards are in the pile.
 * @param size, a number that represents number of cards in pile
 * @returns returns markup displaying what i wrote just above
 */
function DiscardPile({ size }: { size: number }) {
  return (
    <div className="card_shape flex h-screen hover:border-yellow-800">
      <div className="text-center text-7xl m-auto">
        <div className="">{size}</div>
      </div>
    </div>
  );
}
/**
 * Creates markup that displays players hand
 * @author Tanner Brown
 * @returns a rendered hand of cards\
 * @param playerHand: the actual hand we'll render. stateChange: another poorly named variable? what was i thinking? anyways this is the statechange for letting
 * the summoning buttons appear. currentPlayer: the current player. needed for turn exclusivity reasons. ownerPlayer: the player who owns the cards in hand.
 * phase: the current turn phase. needed for exclusivity reasons. setHover: statechange for magnifying cards.
 */
function HandOfCards({
  playerHand,
  stateChange,
  currentPlayer,
  ownerPlayer,
  phase,
  setHover,
}: {
  playerHand: Card[];
  stateChange: React.Dispatch<React.SetStateAction<number>>;
  currentPlayer: Player;
  ownerPlayer: Player;
  phase: number;
  setHover: any;
}) {
  let shownHand = [];
  //create players hand
  for (let i = 0; i < playerHand.length; i++) {
    let currentCard = playerHand[i];
    if (currentCard instanceof Creature) {
      shownHand.push(
        CreatureComponent({
          card: currentCard,
          state: stateChange,
          setHover: setHover,
          ownerPlayer: ownerPlayer,
          currentPlayer: currentPlayer,
          position: i,
          phase: phase,
        }),
      );
      //not really relevant anymore since back-end axed spells/buildings, but in case we have time and they re-implement them i see no reason to remove this
      // else statement. currently does not execute
    } else {
      shownHand.push(
        CardComponent({
          card: currentCard,
          state: stateChange,
          setHover: setHover,
          position: i,
          ownerPlayer: ownerPlayer,
          currentPlayer: currentPlayer,
          phase: phase,
        }),
      );
    }
  }
  return <div className="flex flex-row gap-10">{shownHand}</div>;
}

/**
 *@author Tanner Brown
 * Board loops through the board (the actual array that keeps track of the board) to display each
 * creature, building in the array inside of each landscape inside of a larger board.
 * @returns markup that displays the board.
 * @param game: the actual game object. board: the board from the game. why do i pass this as a parameter even? setHover: magnify the cards when hovered.
 */
function Board({
  game,
  board,
  setHover,
}: {
  game: Game;
  board: SidedBoard;
  setHover: any;
}) {
  let p1Board = [];
  let p2Board = [];

  let p1 = game.getPlayerById(0);
  let p2 = game.getPlayerById(1);
  let t = board.getSideByOwnerId(0);
  //Looping through board to display it
  for (let i = 0; i < 4; i++) {
    p1Board.push(
      LandscapeCard({
        creature: board.getBoardPosByOwnerId(0, i)?.creature,
        player: p1,
        landscapeColor: board.getBoardPosByOwnerId(p1.id, i)?.landscape,
        setHover: setHover,
        //building: game.board.getBoardPosByOwnerId(0, i)?.building
      }),
    );

    p2Board.push(
      LandscapeCard({
        creature: board.getBoardPosByOwnerId(1, i)?.creature,
        player: p2,
        landscapeColor: board.getBoardPosByOwnerId(p1.id, i)?.landscape,
        setHover: setHover,
        //building: game.board.getBoardPosByOwnerId(1, i)?.building,
      }),
    );
  }

  return (
    <div className="board_shape">
      <br></br>
      <div className="flex flex-row justify-between justify-around">
        {/**not sure if just printing the array will work*/}
        {p2Board}
      </div>
      <br></br>
      <div className="flex flex-row justify-between justify-around">
        {p1Board}
      </div>
      <div></div>
    </div>
  );
}
/**
 * @author Tanner Brown
 * This method will take in a Creature and building from a given "landscape card" from the backend. This will
 * then dynamically render them inside of the landscape.
 * @returns markup that displays a landscape box with building and creature optionally inside
 * @param creature: the creature in the landscape. player: the player. needed for dynamic css reasons. landscape color: the landscape type. setHover: magnify cards
 * when hovered oooooh so cool
 */
function LandscapeCard({
  //building,
  creature,
  player,
  landscapeColor,
  setHover,
}: {
  //building: Building | undefined;
  creature: Creature | undefined;
  player: Player;
  landscapeColor: string;
  setHover: any;
}) {
  //c is creature, b is building. default values are empty tags (is that what they're called?)
  let c;
  let b = <></>;
  // check if creature is undefined
  if (creature?.name === "Null") {
    c = <></>;
  } else {
    c = CreatureComponentOnBoard({ card: creature, setHover: setHover });
  }
  // check if building is undefined
  // if (building?.name == null) {
  //   b = CardComponent({card: building});
  // }

  return (
    <div
      className={
        "landscape_shape flex justify-center items-center player_" +
        player.id +
        ` bg-[${landscapeColor}]`
      }
    >
      {c}
      {/* {b} */}
    </div>
  );
}

/**
 * @author Tanner Brown
 * Man I really should've updated my documentation as I went instead of putting it off. My fingers are getting TIRED. Anyways,
 *
 * Block that shows players hp, username, and actions
 * @param player: gotta know which player we rendering
 * @returns markup that shows what I just wrote above
 */
function PlayerDisplay({ player }: { player: Player }) {
  return (
    <div className={"player_display player_" + player.id}>
      <div className="flex flex-col">
        <h1>{player.username}</h1>
        HP: {player.hp}
        <br></br>
        Actions: {player.actions}
      </div>
    </div>
  );
}

/**
 * @author Tanner Brown
 * This is like the big daddy of the components. This makes up pretty much the entire game. Shows players board, hp, hands, etc etc.
 *
 * How very descript me from a few weeks ago. Anyways yeah this is where everything goes on. We manage state here and stuff. I don't
 * think a paragraph of documentation is fit for the massive wall of text that this component is so I'll just document as we go, okay?
 *
 * @returns Markup to display the game
 * @param game: the game object we're rendering. setBegin: when we set this as true the game ends and we go backto deck select screen
 */
function GameBoard({ game, setBegin }: { game: Game; setBegin: any }) {
  // grab our players. a lot of components need this guys as parameters
  let player1 = game.getPlayerById(0);
  let player2 = game.getPlayerById(1);
  // same for him
  let board = game.board;
  //States:
  const [turn, setTurn] = useState(game.currentTurn); //good
  const [phase, setPhase] = useState(game.turnPhase); //good
  const [currentPlayer, setCurrentPlayer] = useState(game.currentPlayer); // good(?)
  const [log, setLog] = useState([<></>]);
  const [reset, setReset] = useState(-1);
  const [summoningCard, setSummoningCard] = useState(-1); //good
  const [hoverCard, setHoverCard] = useState(null);

  let buttons1 = <></>;
  let buttons2 = <></>;
  //only in main phase can we summon
  if (phase == 0) {
    //Anyways, if we're summoning a card then these buttons need to render (for player 1 or two depending). otherwise they'll stay empty
    if (summoningCard > -1) {
      if (currentPlayer.id == 0) {
        buttons1 = (
          <SummoningButtons
            playerid={0}
            cardPos={summoningCard}
            setSummonState={setSummoningCard}
            game={game}
            board={board}
            log={log}
            setLog={setLog}
          ></SummoningButtons>
        );
      } else {
        buttons2 = (
          <SummoningButtons
            playerid={1}
            cardPos={summoningCard}
            setSummonState={setSummoningCard}
            game={game}
            board={board}
            log={log}
            setLog={setLog}
          ></SummoningButtons>
        );
      }
    }
  }
  //if we're in battle phase then we need to render the attacking buttons
  else if (phase == 1) {
    if (currentPlayer.id == 0) {
      buttons1 = (
        <AttackingButtons
          player={player1}
          game={game}
          setBegin={setBegin}
          reset={reset}
          resetState={setReset}
        ></AttackingButtons>
      );
    } else {
      buttons2 = (
        <AttackingButtons
          player={player2}
          game={game}
          setBegin={setBegin}
          reset={reset}
          resetState={setReset}
        ></AttackingButtons>
      );
    }
  }

  // you should probably just ignore this. its probaly not important. forget you ever saw it
  let dumbStupidVariable = <></>;
  if (reset == 0) {
    dumbStupidVariable = (
      <>
        <></>
      </>
    );
  } else if (reset == 1) {
    dumbStupidVariable = (
      <>
        <>
          <></>
        </>
      </>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen p-4">
      {dumbStupidVariable}
      <div>
        {/*buttons2 are summoning buttons */}
        {/*Gonna need to comment much of this just so we're aware of what is happening in some of these.*/}
        {/*This div is a row that shows a players stats and then their hand of cards*/}
        <div className="flex flex-col justify-center items-center gap-4">
          <br></br>
          <br></br>
          {/*rendered in a seperate div so they'll be in a row*/}
          <div className="flex flex-row justify-center items-center">
            <HandOfCards
              playerHand={player2.hand}
              stateChange={setSummoningCard}
              currentPlayer={currentPlayer}
              setHover={setHoverCard}
              ownerPlayer={player2}
              phase={phase}
            ></HandOfCards>
          </div>
          {buttons2}
        </div>
        {/*This div pretty large. It's where discard piles, decks, and the actual board goes*/}
        <div className="flex flex-row justify-center items-center gap-4">
          {/*the magnified card*/}
          <HoverCard card={hoverCard}></HoverCard>
          {/*This column shows a deck and discard pile*/}
          <div className="flex flex-col gap-10">
            <PlayerDisplay player={player2}></PlayerDisplay>
            <Deck
              player={player2}
              reset={reset}
              resetState={setReset}
              log={log}
              game={game}
              setLog={setLog}
            ></Deck>
            <DiscardPile size={player2.discardPile.length}></DiscardPile>
          </div>
          {/*The board between two columns*/}
          <Board setHover={setHoverCard} game={game} board={board} />
          {/*This is a row of two columns*/}
          <div className="flex flex-row gap-4">
            {/*The first column shows the deck and discard pile (like the one you saw earlier*/}
            <div className="flex flex-col gap-10">
              <DiscardPile size={player1.discardPile.length}></DiscardPile>
              <Deck
                player={player1}
                reset={reset}
                resetState={setReset}
                game={game}
                setLog={setLog}
                log={log}
              ></Deck>
              <PlayerDisplay player={player1}></PlayerDisplay>
            </div>
            {/*This column shows the game log text bot and the button for moving phases below it*/}
            <div className="flex flex-col justify-center items-center gap-20">
              <GameLog
                turn={turn}
                phase={phase}
                currentPlayer={currentPlayer}
                log={log}
              ></GameLog>
              <PhaseButton
                game={game}
                imagePath="https://th.bing.com/th/id/R.64cd05752ba370bda27cbcfa260693ce?rik=UMwRwhskWbPISQ&pid=ImgRaw&r=0"
                setCurrentPlayer={setCurrentPlayer}
                setPhase={setPhase}
                setTurn={setTurn}
                setSummoning={setSummoningCard}
              ></PhaseButton>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-10">
          {buttons1}
        </div>
        <div className="flex flex-row justify-center items-center">
          <HandOfCards
            playerHand={player1.hand}
            stateChange={setSummoningCard}
            setHover={setHoverCard}
            currentPlayer={currentPlayer}
            ownerPlayer={player1}
            phase={phase}
          ></HandOfCards>
        </div>
      </div>
    </div>
  );
}
/**
 * @author Tanner Brown
 * I always thought it was weird that common practice was to put an author on these. Like, I get its so down the line someone can call you up and be like
 * "why does your code suck?", but I can't shake the feeling like I'm a child writing my name on my toys so no one else can play with them.
 *
 * Anyways, summoning buttons are the buttons that render when we're summoning a card. 4 buttons show up; one for each zone.
 * @param cardPos: the position in hand the card we're summoning is. game: the game object. setSummonState: the state that controls when the buttons are rendering.
 * marked -1 to make buttons disappear after we summon. playerid: the id of the player who will be summoning the card. log/setLog: the log the game keeps
 * and the function to update it
 * @returns markup for summoning buttons
 */
function SummoningButtons({
  cardPos,
  game,
  setSummonState,
  playerid,
  log,
  setLog,
}: {
  cardPos: number;
  game: Game;
  setSummonState: any;
  board: any;
  playerid: number;
  log: any;
  setLog: any;
}) {
  function handle(boardPos: number, playerid: number) {
    globalTempVariable = boardPos;
    if (game.playCard(game.getPlayerById(playerid).hand[cardPos], playerid)) {
      setLog([
        ...log,
        <div>
          {game.getPlayerById(playerid).username} summoned the "
          {game.board.getBoardPosByOwnerId(playerid, boardPos)?.creature.name}"
          at zone {boardPos + 1}
        </div>,
      ]);
    } else {
      setLog([
        ...log,
        <div>
          {game.getPlayerById(playerid).username} attempted to summon a
          creature, but lacks the actions
        </div>,
      ]);
    }
    setSummonState(-1);
  }
  return (
    <div className="flex flex-row justify-center items-center gap-20">
      <button
        type="button"
        onClick={function () {
          handle(0, playerid);
        }}
      >
        Zone 1
      </button>
      <button
        type="button"
        onClick={function () {
          handle(1, playerid);
        }}
      >
        Zone 2
      </button>
      <button
        type="button"
        onClick={function () {
          handle(2, playerid);
        }}
      >
        Zone 3
      </button>
      <button
        type="button"
        onClick={function () {
          handle(3, playerid);
        }}
      >
        Zone 4
      </button>
    </div>
  );
}
/**
 * @author Tanner Brown
 *
 * These are the buttons that show up during battle phase and let you attack. if an attack kills the opponent then we alert and reset the game
 * @param player: the player who will be attacking. game: the game object. reset/setReset: variable and function for controlling re-render. setbegin: need this
 * to return to deck select screen
 * @returns mark up for attacking buttons
 */
function AttackingButtons({
  player,
  game,
  reset,
  resetState,
  setBegin,
}: {
  player: Player;
  game: Game;
  reset: number;
  resetState: any;
  setBegin: any;
}) {
  let playerid = player.id;

  function handle(boardPos: number, playerid: number) {
    game.simulateCombat(boardPos, playerid);
    if (game.getOtherPlayer(player.id).hp <= 0) {
      alert(
        `${player.username} has won. Press OK to return to deck select screen.`,
      );
      setBegin(false);
    }
    resetState(dumbStupidFunction(reset));
  }
  return (
    <div className="flex flex-row justify-center items-center gap-20">
      <button
        type="button"
        onClick={function () {
          handle(0, playerid);
        }}
      >
        Attack with monster at zone 1
      </button>
      <button
        type="button"
        onClick={function () {
          handle(1, playerid);
        }}
      >
        Attack with monster at zone 2
      </button>
      <button
        type="button"
        onClick={function () {
          handle(2, playerid);
        }}
      >
        Attack with monster at zone 3
      </button>
      <button
        type="button"
        onClick={function () {
          handle(3, playerid);
        }}
      >
        Attack with monster at zone 4
      </button>
    </div>
  );
}

/**
 * has a block of scrollable text showing player actions and shows turn and phase
 * @returns markup that displays the gamelog in the browser
 */
function GameLog({
  turn,
  phase,
  currentPlayer,
  log,
}: {
  turn: number;
  phase: number;
  currentPlayer: Player;
  log: any;
}) {
  let phaseName;
  if (phase == 0) {
    phaseName = "Main phase";
  } else if (phase == 1) {
    phaseName = "Battle phase";
  } else if (phase == 2) {
    phaseName = "End phase";
  }
  return (
    <>
      <div className="game_log">{log}</div>
      <div className="text-3xl">
        Turn: {turn}
        <br></br>
        Phase: {phaseName}
        <br></br>
        Turn Player:{" "}
        <span className={"text_player_" + currentPlayer.id}>
          {currentPlayer.username}
        </span>
      </div>
    </>
  );
}
/**
 * Button that will control moving between phases.
 * @returns button that looks like an image
 */
function PhaseButton({
  game,
  imagePath,
  setPhase,
  setTurn,
  setCurrentPlayer,
  setSummoning,
}: {
  game: Game;
  imagePath: string;
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<Player>>;
  setSummoning: React.Dispatch<React.SetStateAction<number>>;
}) {
  function handle() {
    game.enterNextPhase();
    setPhase(game.turnPhase);
    setTurn(game.currentTurn);
    setSummoning(-1);
    setCurrentPlayer(game.currentPlayer);
  }
  return (
    <button onClick={handle}>
      <img src={imagePath} width="100" height="100"></img>
    </button>
  );
}
function App() {
  const [begin, setBegin] = useState(false);
  const [deck1, setDeck1] = useState(exportDecks[0].deck());
  const [deck2, setDeck2] = useState(exportDecks[0].deck());
  let h = function () {
    setBegin(true);
  };

  let page = <></>;
  if (begin) {
    page = (
      <GameBoard
        game={gameInit(deck1.cards, deck2.cards)}
        setBegin={setBegin}
      ></GameBoard>
    );
  } else {
    page = (
      <DeckSelectScreen
        setDeck1={setDeck1}
        setDeck2={setDeck2}
        handle={h}
      ></DeckSelectScreen>
    );
  }
  return <>{page}</>;
}

export default App;

function ListOfDecks({ setDeck }: { setDeck: any }) {
  let options = [];
  for (let i = 0; i < exportDecks.length; i++) {
    options.push(<option value={i}>{exportDecks[i].name}</option>);
  }
  function handle(event: any) {
    setDeck(exportDecks[event.target.value].deck());
  }
  return (
    <div>
      <label>Choose a deck:</label>
      <select onChange={handle}>{options}</select>
    </div>
  );
}

function DeckSelectScreen({
  handle,
  setDeck1,
  setDeck2,
}: {
  handle: any;
  setDeck1: any;
  setDeck2: any;
}) {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl flex flex-row justify-center">CARD BATTLES</h1>
      <div className="flex flex-row justify-center gap-10">
        <ListOfDecks setDeck={setDeck1}></ListOfDecks>
        <button onClick={handle}>Begin</button>
        <ListOfDecks setDeck={setDeck2}></ListOfDecks>
      </div>
    </div>
  );
}

function dumbStupidFunction(r: number) {
  if (r == 0) {
    return 1;
  } else {
    return 0;
  }
}

function gameInit(deck1: Card[], deck2: Card[]) {
  var swampLand: Landscape = new Landscape(
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
    globalTempVariable = -1;
  });

  g.board.getSideByOwnerId(0)?.map((pos: BoardPos) => {
    pos.setLandscape(swampLand);
  });
  g.board.getSideByOwnerId(1)?.map((pos: BoardPos) => {
    pos.setLandscape(swampLand);
  });

  p1.setDeck(deck1);
  p2.setDeck(deck2);

  p1.drawCard(5, false);
  p2.drawCard(5, false);

  p1;

  p1.username = "Player 1";
  p2.username = "Player 2";

  return Game.getInstance();
}
