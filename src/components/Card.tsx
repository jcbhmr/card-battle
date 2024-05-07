import { ReactNode } from "react";
import { Player } from "../engine/game";
import { Creature, Card } from "../engine/card";
import { CreatureComponentOnBoard } from "./Creature";

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
export function CardComponent({
  card, state, position, setHover, currentPlayer, ownerPlayer, phase,
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
        className={"card_shape overflow-auto hover:border-black player_" + ownerPlayer.id}
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
            width={350} />
        </div>
        <div className="flex-1 p-4 grid gap-2">
          <h2 className="text-lg font-bold tracking-tight">{card.name}</h2>
        </div>
      </div>
    </button>
  );
}/**
 * @author Tanner Brown
 * I spoke about this in my documentation on the CreatureComponentOnBoard component. Check there for why this is a thing
 * @param param0
 * @returns
 */
export function CardComponentOnBoard({
  card, setHover,
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
        } }
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
            width={350} />
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
 * This method will take in a Creature and building from a given "landscape card" from the backend. This will
 * then dynamically render them inside of the landscape.
 * @returns markup that displays a landscape box with building and creature optionally inside
 * @param creature: the creature in the landscape. player: the player. needed for dynamic css reasons. landscape color: the landscape type. setHover: magnify cards
 * when hovered oooooh so cool
 */
export function LandscapeCard({
  //building,
  creature, player, landscapeColor, setHover,
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
      className={"landscape_shape flex justify-center items-center player_" +
        player.id +
        ` bg-[${landscapeColor}]`}
    >
      {c}
      {/* {b} */}
    </div>
  );
}

