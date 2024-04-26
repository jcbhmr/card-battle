import {
  LandscapeType,
  Targeter,
  PlayerTargeter,
  LaneTargeter,
  TargetType,
  BoardPos,
  Game,
} from "../model.ts";
import { Card, Creature, Landscape } from "./card.ts";

var cardMap: Map<string, Card> = new Map<string, Card>();

function put(name: string, card: Card): void {
  cardMap.set(name, card);
}

export function addUrl(name: string, Url: string): void {
  var card: Card | undefined = cardMap.get(name);
  if (typeof card == "undefined") {
    return;
  } else {
    put(name, card.setImageUrl(Url));
  }
}

export function get(name: string): Card {
  var card: Card | undefined = cardMap.get(name);
  if (typeof card == "undefined") {
    return Card.getNull();
  } else {
    return card.clone();
  }
}

//WRITE CARDS BELOW

//=====================================================================================================================================================
//                                                                  CREATURES
//=====================================================================================================================================================
put(
  "Dark Angel",
  new Creature(
    "Dark Angel",
    "",
    1,
    LandscapeType.Swamp,
    0,
    5,
  ),
);

put(
  "Bog Bum",
  new Creature("Bog Bum", "", 1, LandscapeType.Swamp, 2, 6),
);
put(
  "Music Mallard",
  new Creature(
    "Music Mallard",
    "",
    1,
    LandscapeType.Candylands,
    0,
    9,
  ),
);

// Not sure about this one. This card's ability is not really functional right now.
put(
  "Fly Swatter",
  new Creature(
    "Fly Swatter",
    "",
    1,
    LandscapeType.Swamp,
    1,
    6,
  ),
);

put(
  "Unicylops",
  new Creature("Unicylops", "", 2, LandscapeType.Swamp, 7, 3),
);
put(
  "Man Witch",
  new Creature("Man Witch", "", 2, LandscapeType.Swamp, 4, 4),
);

put(
  "Furious Hen",
  new Creature("Furious Hen", "", 1, LandscapeType.Candylands, 2, 7),
);

put(
  "Furious Rooster",
  new Creature("Furious Rooster", "", 1, LandscapeType.Candylands, 4, 4),
);

put(
  "Papercut Tiger",
  new Creature("Papercut Tiger", "", 1, LandscapeType.Candylands, 2, 5),
);

put(
  "Cottonpult",
  new Creature("Cottonpult","",2, LandscapeType.Candylands,6,6),
);

//=====================================================================================================================================================
//                                                                SANDYLANDS
//=====================================================================================================================================================

put(
  "Beach Mum",
  new Creature("Beach Mum", "", 2, LandscapeType.Desert, 9, 11)
);

put(
  "Black Cat",
  new Creature("Black Cat", "", 5, LandscapeType.Desert, 15, 35)
);

put(
  "Burning Hand",
  new Creature("Burning Hand", "", 1, LandscapeType.Desert, 5, 2)
);

put(
  "Cactus Thug",
  new Creature("Cactus Thug", "", 5, LandscapeType.Desert, 25, 12)
);

put(
  "Count Cactus",
  new Creature("Count Cactus", "", 5, LandscapeType.Desert, 5, 48)
);

put(
  "Fummy",
  new Creature("Fummy", "", 4, LandscapeType.Desert, 4, 24)
);

put(
  "Giant Mummy Hand",
  new Creature("Giant Mummy Hand", "", 4, LandscapeType.Desert, 9, 29)
);

put(
  "Green Cactaball",
  new Creature("Greem Cactaball", "", 1, LandscapeType.Desert, 4, 3)
);

put(
  "Green Party Ogre",
  new Creature("Green Party Ogre", "", 0, LandscapeType.Desert, 11, 19)
);

put(
  "Lady Mary",
  new Creature("Lady Mary", "", 4, LandscapeType.Desert, 18, 20)
);

put(
  "Lime Slimey",
  new Creature("Lime Slimey", "", 2, LandscapeType.Desert, 8, 8)
);

put(
  "Lost Golem",
  new Creature("Lost Golem", "", 5, LandscapeType.Desert, 10, 36)
);

put(
  "Mayonaise Angel",
  new Creature("Mayonaise Angel", "", 2, LandscapeType.Desert, 4, 12)
);

put(
  "Ms. Mummy",
  new Creature("Ms. Mummy", "", 1, LandscapeType.Desert, 3, 6)
);

put(
  "Mud Angel",
  new Creature("Mud Angel", "", 3, LandscapeType.Desert, 9, 21)
);

put(
  "Pieclops",
  new Creature("Pieclops", "", 5, LandscapeType.Desert, 20, 25)
);

put(
  "Prickle",
  new Creature("Prickle", "", 3, LandscapeType.Desert, 9, 18)
);

put(
  "Sandbacho",
  new Creature("Sandbacho", "", 2, LandscapeType.Desert, 11, 10)
);

put(
  "Sand Angel",
  new Creature("Sand Angel", "", 1, LandscapeType.Desert, 2, 6)
);

put(
  "Sand Eyebat",
  new Creature("Sand Eyebat", "", 1, LandscapeType.Desert, 4, 4)
);

put(
  "Sand Jackal",
  new Creature("Sand Jackal", "", 3, LandscapeType.Desert, 6, 21)
);

put(
  "Sand Knight",
  new Creature("Sand Knight", "", 4, LandscapeType.Desert, 20, 20)
);

put(
  "Sandasaurus Rex",
  new Creature("Sandasaurus Rex", "", 0, LandscapeType.Desert, 14, 16)
);

put(
  "Sandfoot", 
  new Creature("Sandfoot", "", 3, LandscapeType.Desert, 10, 17)
);

put(
  "Snadsnake",
  new Creature("Sandsnake", "", 2, LandscapeType.Desert, 12, 7)
);

put(
  "Sandwitch",
  new Creature("Sandwitch", "", 4, LandscapeType.Desert, 25, 10)
);

put(
  "Sandy",
  new Creature("Sandy", "", 5, LandscapeType.Desert, 28, 18)
);

put(
  "Wall of Chocolate",
  new Creature("Wall of Chocolate", "", 3, LandscapeType.Desert, 5, 20)
);

put(
  "Wall of Sand",
  new Creature("Wall of Sand", "", 3, LandscapeType.Desert, 0, 26)
)

//=====================================================================================================================================================
//                                                                BUILDINGS
//=====================================================================================================================================================

//=====================================================================================================================================================
//                                                                  SPELLS
//=====================================================================================================================================================

//=====================================================================================================================================================
//                                                                LANDSCAPES
//=====================================================================================================================================================
