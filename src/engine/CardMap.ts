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
    1,
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
//                                                                BUILDINGS
//=====================================================================================================================================================

//=====================================================================================================================================================
//                                                                  SPELLS
//=====================================================================================================================================================

//=====================================================================================================================================================
//                                                                LANDSCAPES
//=====================================================================================================================================================
