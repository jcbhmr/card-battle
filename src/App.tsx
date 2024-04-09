import { ReactNode, useState } from "react";
import placeholderSVGURL from "./assets/placeholder.svg"
import {Game, Creature, Building } from "./model"


//let testCreature = new Creature("", "", 1, "", null, 2, 3);

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
function CardComponent({cardName, cardText, actionCost, landscapeType, imagePath, children}: 
  { cardName: string, cardText: string, actionCost: number,landscapeType: string,imagePath: string
  children?: ReactNode}) {
    return (
        <div className="card_shape">
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
              <div>AC: {actionCost} Type: {landscapeType} </div>
              <div></div>

              {children}
            </div>
          </div>
        </div>
    )
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
function CreatureComponent({cardName, cardText, actionCost, landscapeType,
  attack, defense, imagePath}: { cardName: string, cardText: string, actionCost: number, 
    landscapeType: string, attack: number, defense: number, imagePath: string}) {

  let child = (<><div>Attack: {attack}</div><div>Defense: {defense}</div></>)
  return <CardComponent cardName={cardName} cardText={cardText} actionCost={actionCost} 
  landscapeType={landscapeType} imagePath={imagePath}>
    {child}
  </CardComponent>
}

/**
 * NOT DONE
 * @param param0 
 * @returns 
 */
function PileOfCards({size}: {size: number}){
  return(
    <div className="card_shape flex h-screen hover:border-yellow-800">
      <div className="text-center text-9xl m-auto">   
       <div className="">
       {size}
       </div>
        

      </div>
      
    </div>
  )
}

/**
 * This method will (currently) only make an array of "generic" card/creature components. This method WILL
 * have to be updated to get a players hand from the game object. tempGameObject is my current placeholder
 * for that.
 * 
 * 
 * @author Tanner Brown
 * @returns Array of CardComponents/CreatureComponents
 */
function HandOfCards(){
  // let playerHand = tempGameObject.players[0].hand
  let shownHand = []
  //for(let i = 0; i < playerHand.length; i++){
  for(let i = 0; i < 5; i++){
    // let card = playerHand[i];
    //if(card.constructor.name == "Creature"){
    if(true){
      // shownHand.push(CreatureComponent({cardName: card.name, cardText:card.flavorText, actionCost: card.cost,
      // landscapeType: card.landscapeType, attack: card.attack,defense:card.defense,imagePath: ""}))
      shownHand.push(CreatureComponent({cardName: "name", cardText: "flavorText", actionCost: 0,
      landscapeType: "lType", attack: 0, defense:0,imagePath: ""}))
    }
    // children does not HAVE to be assigned here, but it has the red underline if you dont
    //so i've given it an empty element just to stop that
    else{
      shownHand.push(CardComponent({cardName:"name", cardText: "text", actionCost:0, landscapeType: "landscape",
    imagePath: "", children: <></>}))
    }
  }
  return(
    <div className="flex flex-row">
      {shownHand}
    </div>
    
  )
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
  )
}


/**
 * INCOMPLETE METHOD
 * currently using Creatures as placeholders for landscapes. Basically, I just made some generic looking ones 
 * for testing purposes. a
 * @returns 
 */
function Board({game}: {game: Game}){
  let p1Board = []
  let p2Board = []
  for(let i = 0; i > 4; i++){
    p1Board.push(LandscapeCard({creature: game.board.getBoardPosByOwnerId(0, i)?.creature, 
    building: game.board.getBoardPosByOwnerId(0, i)?.building}));

    p2Board.push(LandscapeCard({creature: game.board.getBoardPosByOwnerId(1, i)?.creature, 
      building: game.board.getBoardPosByOwnerId(1, i)?.building}));
    // dont know why but i added them to the same array instead of making them into landscape components
    // then doing that but I'm running low on time so this will just have to stay like that for now. 
    // Definitively not complete.
  }
  
  return(
    <div className="board_shape">
      <br></br>
      <div className="flex flex-row justify-between justify-around">
        {p1Board}
      </div>
      <br></br>
      <div className="flex flex-row justify-between justify-around">
        {p2Board}
      </div>   
    </div>
        
  )
}
/**
 * This method will take in a Creature and building from a given "landscape card" from the backend. This will 
 * then dynamically render them inside of the landscape. Also need to figure out how to center cards inside
 * of a landscape.
 * TODO: add passing in a creature and building, then change if statements to check if those buildings are null 
 * or such, then change c and c2 to have appropriate values
 * 
 * @returns 
 */
function LandscapeCard({building, creature}: {building: Building | undefined, creature: Creature | undefined}){
  //c is creature, b is building. default values are empty tags (is that what they're called?)
  let c = (<></>);
  let b = (<></>);
  // check if creature is undefined
  if(creature){
    c = CreatureComponent({cardName: creature.name, cardText: creature.flavorText, actionCost: creature.cost,
    landscapeType: creature.landscapeType, attack: creature.attack, defense: creature.defense,imagePath: ""});
  }
  // check if building is undefined
  if(building){
    b = CardComponent({cardName: building.name, cardText: building.flavorText, actionCost: building.cost,
    landscapeType: building.landscapeType,imagePath: ""});
  }
  return(
    <div className="landscape_shape flex justify-center items-center">
      {c}
      {b}
    </div>
  )
}

function App() {

  return (
    <>
    <div className="flex justify-center items-center h-screen p-4">
      <Board/>
    </div>
    </>
  );
}


export default App;

