import { Player } from "../engine/game";
import { Creature } from "../engine/card";
import { CardComponent, CardComponentOnBoard } from "./Card";

/**
 * so basically this is just Card Component, but for creatures. It's kinda like a fucked up version
 * of inheritance for objects. I'm using the children props that Jacob showed me to essentially just
 * add attack and defense to the rest of a card component.
 * @author Tanner Brown and Jacob Hummer
 * @param cardName: string, cardText: string, actionCost: number,
    landscapeType: string, attack: number, defense: number, imagePath: string
 * @returns CardComponent, but with attack/defense values
 */
export function CreatureComponent({
  card, state, position, setHover, currentPlayer, ownerPlayer, phase,
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
}/**
 * Kinda dumb, but since cards on board have different function than ones in hand I felt this was necessary. Currently, this just is the other creature/card
 * component but without triggering summoning buttons
 * @param param0
 * @returns
 */
export function CreatureComponentOnBoard({
  card, setHover,
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

