import { ReactNode, createContext, useContext, useState } from "react";
import placeholderSVGURL from "./assets/placeholder.svg";
import {
  Game,
  Player,
  SidedBoard,
  Targeter,
} from "./model";
//import { Creature, Building, Card } from "./engine/card";
import { Creature, Card } from "./engine/card";
import { Ability } from "./engine/ability";
import { get } from "./engine/CardMap";
import { G } from "vitest/dist/reporters-MmQN-57K.js";

var log = [];
log.push(<div>Player 1 activated "Spell name!"</div>);
log.push(<div>Player 2 activated "Spell name!"</div>);
log.push(<div>Player 1 summoned "Monster name!"</div>);
log.push(<div>Player 2 summoned "Monster name!"</div>);

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WuNN16G0fnd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 *
 *
 * @returns Returns a card component
 * @param cardName: the actual name of the card, cardText: the description of the text on the card,
 * actionCost: the cost of the card, landscapeType: the type of landscape that the card needs,
 * imagePath: the location of the image for the card. this is made for spell/building cards
 */
function CardComponent({
  card,
  children,
  state,
  position,
  currentPlayer,
  ownerPlayer,
}: {
  card: Card | Creature;
  children?: ReactNode;
  state: React.Dispatch<React.SetStateAction<number>>,
  position: number
  currentPlayer: Player,
  ownerPlayer: Player
}) {
  function handleClick(){
    if(card instanceof Creature){
      if(currentPlayer.id==ownerPlayer.id){
        state(position);
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
    <div className="card_shape overflow-auto" onClick={handleClick}>
      <div className="flex aspect-16/9">
        <img
          alt={card.name}
          className="object-cover"
          height={135}
          src={card.imageURL}
          style={{
            aspectRatio: "240/135",
            objectFit: "cover",
          }}
          width={350}
        />
      </div>
      <div className="flex-1 p-4 grid gap-2">
        <h2 className="text-lg font-bold tracking-tight">{card.name}</h2>
        <p className="text-sm line-clamp-3">{card.flavorText}</p>
        <div className="text-xs">
          <div>
            AC: {card.getCost()} Type: {card.landscapeType}{" "}
          </div>
          <div></div>

          {children}
        </div>
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
    currentPlayer,
    ownerPlayer
}: {
  card: Creature,
  state: React.Dispatch<React.SetStateAction<number>>,
  position: number,
  currentPlayer: Player,
  ownerPlayer: Player
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
      position={position}
      ownerPlayer={ownerPlayer}
      currentPlayer={currentPlayer}
    >
      {child}
    </CardComponent>
  );
}

/**
 * Displays card shape with a number on it indicating how many cards are in the pile. This one has onclick to allow player to draw
 * @returns returns markup displaying what i wrote just above
 */
function Deck({ player, handState, hand}: { player: Player, hand: Card[], handState: React.Dispatch<React.SetStateAction<Card[]>>}) {
  let handleDraw = function () {
    let boolean = player.drawCardUsingAction();
    handState(player.hand);
    if (!boolean) {
      console.log("it was false!!!")
      log.push(
        <div>
          {player.username} attempted to draw, but does not have enough actions.
        </div>,
      );
    } 
    
  };
  return (
    <div
      className="card_shape flex h-screen hover:border-red-800"
      onClick={handleDraw}
    >
      <div className="text-center text-7xl m-auto">
        <div className="">{player.deck.length}</div>
      </div>
    </div>
  );
}

/**
 * Displays card shape with a number on it indicating how many cards are in the pile.
 * @param size, a number that represents number of cards in pile
 * @returns returns markup displaying what i wrote just above
 */
function DiscardPile({ size }: { size: number }) {
  return (
    <div className="card_shape flex h-screen hover:border-red-800">
      <div className="text-center text-7xl m-auto">
        <div className="">{size}</div>
      </div>
    </div>
  );
}
/**
 * Creates markup that displays players hand
 * @author Tanner Brown
 * @returns Array of CardComponents/CreatureComponents
 */
function HandOfCards({ playerHand, stateChange, currentPlayer, ownerPlayer}: 
  { playerHand: Card[], stateChange: React.Dispatch<React.SetStateAction<number>>, currentPlayer: Player, ownerPlayer: Player}) {
  let shownHand = [];
  
  for (let i = 0; i < playerHand.length; i++) {
    let currentCard = playerHand[i];
    if (currentCard instanceof Creature) {
      shownHand.push(
        CreatureComponent({
          card: currentCard,
          state: stateChange,
          position: i,
          ownerPlayer: ownerPlayer,
          currentPlayer: currentPlayer
          
        }),
      );
    } else {
      shownHand.push(
        CardComponent({
          card: currentCard,
          state: stateChange,
          position: i,
          ownerPlayer: ownerPlayer,
          currentPlayer: currentPlayer
        }),
      );
    }
    
  }
  return <div className="flex flex-row gap-10">{shownHand}</div>;
}

/**
 *
 * Board loops through the board (the actual array that keeps track of the board) to display each
 * creature, building in the array inside of each landscape inside of a larger board.
 * @returns markup that displays the board.
 */
function Board({ game, board}: { game: Game, board: SidedBoard}) {
  let p1Board = [];
  let p2Board = [];
  let t = board.getSideByOwnerId(0);
  //Looping through board to display it
  for (let i = 0; i < 4; i++) {
    p1Board.push(
      LandscapeCard({
        creature: board.getBoardPosByOwnerId(0, i)?.creature,
        //building: game.board.getBoardPosByOwnerId(0, i)?.building
      }),
    );

    p2Board.push(
      LandscapeCard({
        creature: board.getBoardPosByOwnerId(1, i)?.creature,
        //building: game.board.getBoardPosByOwnerId(1, i)?.building,
      }),
    );
  }

  return (
    <div className="board_shape">
      <br></br>
      <div className="flex flex-row justify-between justify-around"> 
        {/**not sure if just printing the array will work*/}
        {p1Board}
      </div>
      <br></br>
      <div className="flex flex-row justify-between justify-around">
        {p2Board}
      </div>
      <div>

      </div>
    </div>
  );
}
/**
 * This method will take in a Creature and building from a given "landscape card" from the backend. This will
 * then dynamically render them inside of the landscape.
 * @returns markup that displays a landscape box with building and creature optionally inside
 */
function LandscapeCard({
  //building,
  creature,
}: {
  //building: Building | undefined;
  creature: Creature | undefined;
}) {
  //c is creature, b is building. default values are empty tags (is that what they're called?)
  let c = <></>;
  let b = <></>;
  // check if creature is undefined
  if (creature?.name == null) {
    c = CreatureComponent({card: creature});
  }
  // check if building is undefined
  // if (building?.name == null) {
  //   b = CardComponent({card: building});
  // }
  return (
    <div className={"landscape_shape flex justify-center items-center border-indigo-800"}>
      {c}
      {/* {b} */}
    </div>
  );
}

/**
 * Block that shows players hp, username, and actions
 * @param game object (probably temporarily) and a player id (0 or 1)
 * @returns markup that shows what I just wrote above
 */
function PlayerDisplay({ game, player }: { game: Game; player: Player }) {
  return (
    <div className="player_display">
      <div className="flex flex-col">
        <h1>{player.username}username</h1>
        HP: {player.hp}
        <br></br>
        Actions: {player.actions}
      </div>
    </div>
  );
}
function getDemoPlayer(player: Player) {
  player.deck.push(get("Dark Angel")!);
  player.deck.push(get("Dark Angel")!);
  player.deck.push(get("Dark Angel")!);
  player.deck.push(get("Dark Angel")!);
  player.deck.push(get("Dark Angel")!);

  player.hand.push(get("Dark Angel")!);
  player.hand.push(get("Dark Angel")!);
  player.hand.push(get("Dark Angel")!);
  player.hand.push(get("Dark Angel")!);
  player.hand.push(get("Dark Angel")!);
}
/**
 * This is like the big daddy of the components. This makes up pretty much the entire game. Shows players board, hp, hands, etc etc.
 * @returns Markup to display the game
 */
function GameBoard({ game }: { game: Game }) {
  //States:
  const [turn, setTurn] = useState(game.currentTurn);
  const [phase, setPhase] = useState(game.turnPhase);
  const [currentPlayer, setCurrentPlayer] = useState(game.currentPlayer);
  const [hand1, setCurrentHand1] = useState(game.players[0].hand);
  const [hand2, setCurrentHand2] = useState(game.players[1].hand);
  const [summoningCard, setSummoningCard] = useState(-1);
  const[board, setBoard] = useState(game.board);

  let player1 = game.getPlayerById(0);
  let player2 = game.getPlayerById(1);
  let buttons1 = (<></>)
  let buttons2 = (<></>)
  if(summoningCard+1){
    if(currentPlayer.id==0){
      buttons1 = <SummoningButtons playerid={0} cardPos ={summoningCard} setSummonState={setSummoningCard} game={game} hand={hand1} setHandState={setCurrentHand1} 
    setBoardState={setBoard} board={board}></SummoningButtons>
    }
    else{
      buttons2 = <SummoningButtons playerid={1} cardPos ={summoningCard} setSummonState={setSummoningCard} game={game} hand={hand2} setHandState={setCurrentHand2} 
    setBoardState={setBoard} board={board}></SummoningButtons>
    }
    
  }
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div>
        {buttons2}
        {/*Gonna need to comment much of this just so we're aware of what is happening in some of these.*/}
        {/*This div is a row that shows a players stats and then their hand of cards*/}
        <div className="flex flex-col justify-center items-center gap-4">
          <br></br>
          <br></br>
          <div className="flex flex-row justify-center items-center">
            <HandOfCards playerHand={hand2} stateChange={setSummoningCard} currentPlayer={currentPlayer} ownerPlayer={player2}></HandOfCards>
          </div>
          {buttons2}
        </div>
        {/*This div pretty large. It's where discard piles, decks, and the actual board goes*/}
        <div className="flex justify-center items-center gap-4">
          {/*This column shows a deck and discard pile*/}
          <div className="flex flex-col gap-10">
            <PlayerDisplay game={game} player={player2}></PlayerDisplay>
            <Deck player={player2} hand={hand2} handState={setCurrentHand2}></Deck>
            <DiscardPile size={5}></DiscardPile>
          </div>
          {/*The board between two columns*/}
          <Board game={game} board={board}/>
          {/*This is a row of two columns*/}
          <div className="flex flex-row gap-4">
            {/*The first column shows the deck and discard pile (like the one you saw earlier*/}
            <div className="flex flex-col gap-10">
              <DiscardPile size={5}></DiscardPile>
              <Deck player={player1} hand={hand1} handState={setCurrentHand1}></Deck>
              <PlayerDisplay game={game} player={player1}></PlayerDisplay>
            </div>
            {/*This column shows the game log text bot and the button for moving phases below it*/}
            <div className="flex flex-col justify-center items-center gap-20">
              <GameLog
                turn={turn}
                phase={phase}
                currentPlayer={currentPlayer}
              ></GameLog>
              <PhaseButton
                game={game}
                imagePath="https://th.bing.com/th/id/R.64cd05752ba370bda27cbcfa260693ce?rik=UMwRwhskWbPISQ&pid=ImgRaw&r=0"
                setCurrentPlayer={setCurrentPlayer}
                setPhase={setPhase}
                setTurn={setTurn}
              ></PhaseButton>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <HandOfCards playerHand={hand1} stateChange={setSummoningCard} currentPlayer={currentPlayer} ownerPlayer={player1}></HandOfCards>
        </div>
        <div className="flex flex-row justify-center items-center gap-10">
        {buttons1}
        </div>
      </div>
    </div>
  );
}

function SummoningButtons({cardPos, game, setSummonState, hand, setHandState, setBoardState, playerid}: {cardPos: number, game: Game, setSummonState: any, 
  hand: Card[], setHandState: any, setBoardState: any, board: any, playerid: number}){
  function handle(boardPos: number, playerid: number){
    game.summonCardFromHand(playerid,boardPos, cardPos)
    setHandState(hand);
    console.log(hand.length)
    setBoardState(game.getBoard());
    setSummonState(-1);
  }
  return(
    <div className="flex flex-row justify-center items-center gap-20">
       <button type="button" onClick={function(){
        handle(0, playerid);
       }}>Zone 1</button>
       <button type="button" onClick={function(){
        handle(1, playerid);
       }}>Zone 2</button>
       <button type="button" onClick={function(){
        handle(2, playerid);
       }}>Zone 3</button>
       <button type="button" onClick={function(){
        handle(3, playerid);
       }}>Zone 4</button>
    </div>
   
  )
}
/**
 * has a block of scrollable text showing player actions and shows turn and phase
 * @returns markup that displays the gamelog in the browser
 */
function GameLog({
  turn,
  phase,
  currentPlayer,
}: {
  turn: number;
  phase: number;
  currentPlayer: Player;
}) {
  return (
    <>
      <div className="game_log">{log}</div>
      <div className="text-3xl">
        Turn: {turn}
        <br></br>
        Phase: {phase}
        <br></br>
        Turn Player: {currentPlayer.username}
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
}: {
  game: Game;
  imagePath: string;
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  setTurn: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<Player>>;
}) {
  function handle() {
    game.enterNextPhase();
    setPhase(game.turnPhase);
    setTurn(game.currentTurn);
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
  let h = function () {
    setBegin(true);
  };
  let page = <></>;
  if (begin) {
    let game = new Game();
    getDemoPlayer(game.getPlayerById(0))
    getDemoPlayer(game.getPlayerById(1))
    page = <GameBoard game={game}></GameBoard>;
  } else {
    page = <DeckSelectScreen handle={h}></DeckSelectScreen>;
  }
  return <>{page}</>;
}

export default App;

function ListOfDecks() {
  return (
    <div>
      <label>Choose a deck:</label>
      <select>
        <option>Deck 1</option>
        <option>Deck 2</option>
      </select>
    </div>
  );
}

function DeckSelectScreen({ handle }: { handle: Function }) {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl flex flex-row justify-center">CARD BATTLES</h1>
      <div className="flex flex-row justify-center gap-10">
        <ListOfDecks></ListOfDecks>
        <button onClick={handle}>Begin</button>
        <ListOfDecks></ListOfDecks>
      </div>
    </div>
  );
}
