import { useState } from "react";
import placeholderSVGURL from "./assets/placeholder.svg"
import { Game } from "./model";



/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WuNN16G0fnd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 * 
 * TODO: rework this to make it work for spells/buildings
 * 
 * @returns Returns a card component
 * @param cardName: the actual name of the card, cardText: the description of the text on the card,
 * actionCost: the cost of the card, landscapeType: the type of landscape that the card needs, 
 * attack and defense: the offensive and defensive stats of the card respectively, imagePath: the 
 * location of the image for the card
 */
function CardComponent({cardName, cardText, actionCost, landscapeType,
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

//not finished
// function handOfCards(){
//   let playerHand = tempGameObject.players[0].hand
//   let shownHand = []
//   for(let i = 0; i < playerHand.length; i++){
    
//     shownHand.push(CardComponent(playerHand[i].name, playerHand[i].flavorText, playerHand[i].cost, 
//       playerHand[i].landscapeType, playerHand[i]))
//   }
//   return(
//     <CardComponent></CardComponent>
//   )
// }

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



function App() {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <AppBoard />
    </div>
  );
}

export default App;
