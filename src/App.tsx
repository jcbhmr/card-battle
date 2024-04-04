import { useState } from "react";
import placeholderSVGURL from "./assets/placeholder.svg"
import { Game } from "./model";



/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WuNN16G0fnd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 * 
 * 
 * @returns Returns a card component
 * @param cardName: the actual name of the card, cardText: the description of the text on the card,
 * actionCost: the cost of the card, landscapeType: the type of landscape that the card needs, 
 * attack and defense: the offensive and defensive stats of the card respectively, imagePath: the 
 * location of the image for the card
 */
function CreatureComponent({cardName, cardText, actionCost, landscapeType,
attack, defense, imagePath}: { cardName: string, cardText: string, actionCost: number, 
  landscapeType: string, attack: number, defense: number, imagePath: string}) {
  return (
      <div className="flex flex-col rounded-lg border overflow-hidden w-[200px]">
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
          <div>
            <div>Action Cost: {actionCost}</div>
            <div>Landscape Type: {landscapeType}</div>
            <div>Attack: {attack}</div>
            <div>Defense: {defense}</div>
          </div>
        </div>
      </div>
  )
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WuNN16G0fnd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 * 
 * 
 * @returns Returns a card component
 * @param cardName: the actual name of the card, cardText: the description of the text on the card,
 * actionCost: the cost of the card, landscapeType: the type of landscape that the card needs,
 * imagePath: the location of the image for the card
 */
function CardComponent({cardName, cardText, actionCost, landscapeType, imagePath}: 
  { cardName: string, cardText: string, actionCost: number,landscapeType: string,imagePath: string}) {
    return (
        <div className="flex flex-col rounded-lg border overflow-hidden w-[200px]">
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
            <div>
              <div>Action Cost: {actionCost}</div>
              <div>Landscape Type: {landscapeType}</div>
            </div>
          </div>
        </div>
    )
  }


/**
 * This method will (currently) only make an array of "generic" card/creature components. This method WILL
 * have to be updated to get a players hand from 
 * @returns 
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
      landscapeType: "landscapeType", attack: 0, defense:0,imagePath: ""}))
    }
    else{
      shownHand.push(CardComponent({cardName:"name", cardText: "text", actionCost:0, landscapeType: "landscape",
    imagePath: ""}))
    }
  }
  return(
    shownHand
  )
}

function AppBoard() {
  return (
    <div className="grid grid-cols-1 gap-4">
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

function Test({myString}: {myString: string}){
  return(
      <p>{myString}</p>
  )
}

function App() {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <AppBoard/>
    </div>
  );
}

export default App;

