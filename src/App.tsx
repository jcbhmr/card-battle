import { ReactNode, useState } from "react";
import placeholderSVGURL from "./assets/placeholder.svg";
import { Game, Creature, Building } from "./model";

let log = [];
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
  cardName,
  cardText,
  actionCost,
  landscapeType,
  imagePath,
  children,
}: {
  cardName: string;
  cardText: string;
  actionCost: number;
  landscapeType: string;
  imagePath: string;
  children?: ReactNode;
}) {
  return (
    <div className="card_shape overflow-auto">
      <div className="flex aspect-16/9">
        <img
          alt={cardName}
          className="object-cover"
          height={135}
          src={imagePath}
          style={{
            aspectRatio: "240/135",
            objectFit: "cover",
          }}
          width={350}
        />
      </div>
      <div className="flex-1 p-4 grid gap-2">
        <h2 className="text-lg font-bold tracking-tight">{cardName}</h2>
        <p className="text-sm line-clamp-3">{cardText}</p>
        <div className="text-xs">
          <div>
            AC: {actionCost} Type: {landscapeType}{" "}
          </div>
          <div></div>

          {children}
        </div>
      </div>
    </div>
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
  cardName,
  cardText,
  actionCost,
  landscapeType,
  attack,
  defense,
  imagePath,
}: {
  cardName: string;
  cardText: string;
  actionCost: number;
  landscapeType: string;
  attack: number;
  defense: number;
  imagePath: string;
}) {
  let child = (
    <>
      <div>Attack: {attack}</div>
      <div>Defense: {defense}</div>
    </>
  );
  return (
    <CardComponent
      cardName={cardName}
      cardText={cardText}
      actionCost={actionCost}
      landscapeType={landscapeType}
      imagePath={imagePath}
    >
      {child}
    </CardComponent>
  );
}

/**
 * Displays card shape with a number on it indicating how many cards are in the pile.
 * @param size, a number that represents number of cards in pile
 * @returns returns markup displaying what i wrote just above
 */
function PileOfCards({ size }: { size: number }) {
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
function HandOfCards({ game }: { game: Game }) {
  let playerHand = game.players[0].hand;
  let shownHand = [];
  for (let i = 0; i < playerHand.length; i++) {
    let card = playerHand[i];
    // not even sure if this if statement would even work. Will have to ask Jacob about it or
    // test it with backends code
    if (card.constructor.name == "Creature") {
      //red underline is due to game.players[i].hand being an array of type Card[]. the supertype
      //card does not have attack or defense
      shownHand.push(
        CreatureComponent({
          cardName: card.name,
          cardText: card.flavorText,
          actionCost: card.getCost(),
          landscapeType: card.landscapeType,
          attack: card.attack,
          defense: card.defense,
          imagePath: "",
        }),
      );
    } else {
      shownHand.push(
        CardComponent({
          cardName: card.name,
          cardText: card.flavorText,
          actionCost: card.getCost(),
          landscapeType: card.landscapeType,
          imagePath: "",
        }),
      );
    }
  }
  return <div className="flex flex-row">{shownHand}</div>;
}

function AppBoard() {
  return (
    <div className="grid grid-cols-1 gap-4 border-yellow-800">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 1"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src={placeholderSVGURL}
                width={150}
              />
            </div>
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 2"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src={placeholderSVGURL}
                width={150}
              />
            </div>
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 3"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src={placeholderSVGURL}
                width={150}
              />
            </div>
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 4"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src={placeholderSVGURL}
                width={150}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 1"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src={placeholderSVGURL}
                width={150}
              />
            </div>
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 2"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src={placeholderSVGURL}
                width={150}
              />
            </div>
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 3"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src={placeholderSVGURL}
                width={150}
              />
            </div>
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 4"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src={placeholderSVGURL}
                width={150}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 *
 * Board loops through the board (the actual array that keeps track of the board) to display each
 * creature, building in the array inside of each landscape inside of a larger board.
 * @returns markup that displays the board.
 */
function Board({ game }: { game: Game }) {
  let p1Board = [];
  let p2Board = [];
  //Looping through board to display it
  for (let i = 0; i > 4; i++) {
    p1Board.push(
      LandscapeCard({
        creature: game.board.getBoardPosByOwnerId(0, i)?.creature,
        building: game.board.getBoardPosByOwnerId(0, i)?.building,
      }),
    );

    p2Board.push(
      LandscapeCard({
        creature: game.board.getBoardPosByOwnerId(1, i)?.creature,
        building: game.board.getBoardPosByOwnerId(1, i)?.building,
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
    </div>
  );
}
/**
 * This method will take in a Creature and building from a given "landscape card" from the backend. This will
 * then dynamically render them inside of the landscape.
 * @returns markup that displays a landscape box with building and creature optionally inside
 */
function LandscapeCard({
  building,
  creature,
}: {
  building: Building | undefined;
  creature: Creature | undefined;
}) {
  //c is creature, b is building. default values are empty tags (is that what they're called?)
  let c = <></>;
  let b = <></>;
  // check if creature is undefined
  if (creature) {
    c = CreatureComponent({
      cardName: creature.name,
      cardText: creature.flavorText,
      actionCost: creature.getCost(),
      landscapeType: creature.landscapeType,
      attack: creature.attack,
      defense: creature.defense,
      imagePath: "",
    });
  }
  // check if building is undefined
  if (building) {
    b = CardComponent({
      cardName: building.name,
      cardText: building.flavorText,
      actionCost: building.getCost(),
      landscapeType: building.landscapeType,
      imagePath: "",
    });
  }

  return (
    <div className="landscape_shape flex justify-center items-center">
      {c}
      {b}
    </div>
  );
}

function PlayerDisplay({game, playerID}: {game: Game, playerID: number}){
  let player = game.getPlayerById(playerID);
  return(
    <div className="player_display">
      <div className="flex flex-col">
        <h1>{player.username}username</h1>
      
      HP: {player.hp}
      Actions: {player.actions}
      </div>
      
    </div>
  )
}

function GameBoard(){
  return(
    <div>
      {/* */}
      <div className="flex flex-row items-center">
        <PlayerDisplay game={gameOb} playerID={0}></PlayerDisplay>
        <HandOfCards game={gameOb}></HandOfCards>
      </div>
      <div>

      </div>
      <div className="flex justify-center items-center gap-4">
      <div className="flex flex-col">
          <PileOfCards size={40}></PileOfCards>
          <PileOfCards size={5}></PileOfCards>
        </div>
        <Board game={gameOb} />
        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            <PileOfCards size={5}></PileOfCards>
            <PileOfCards size={40}></PileOfCards>
          </div>
          <div className="flex flex-col justify-center items-center gap-20">
            <GameLog></GameLog>
            <MyButton></MyButton>
          </div>
          
        </div>
        
      </div>
      <div className="flex flex-row justify-right items-center">
        <HandOfCards game={gameOb}></HandOfCards>
        <PlayerDisplay game={gameOb} playerID={0}></PlayerDisplay>
      </div>
      
    </div>
    
  );
}
/**
 * 
 * @returns markup that displays the gamelog in the browser
 */
function GameLog(){
  return( 
      <p className="game_log">
        {log}
    </p>
    
    
  )
}

function MyButton(){
  return(
    <button><img src="https://th.bing.com/th/id/R.64cd05752ba370bda27cbcfa260693ce?rik=UMwRwhskWbPISQ&pid=ImgRaw&r=0" 
    width="100" height="100"></img></button>
  )
}
function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen p-4">
        <GameBoard />
      </div>
    </>
  );
}

const gameOb = new Game();

export default App;
