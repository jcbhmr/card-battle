import { LandscapeType } from "./game.ts";
import { Card, Creature } from "./card.ts";

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

//Swamp Creatures

//Made this card more for testing or ending the game quickly if we have to.
put(
  "Swamp Dragon",
  new Creature("Swamp Dragon", "", 2, LandscapeType.Swamp, 25, 8),
);
put(
  "Dark Angel",
  new Creature("Dark Angel", "", 1, LandscapeType.Swamp, 10, 5),
);

put("Bog Bum", new Creature("Bog Bum", "", 1, LandscapeType.Swamp, 2, 6));

// Not sure about this one. This card's ability is not really functional right now.
put(
  "Fly Swatter",
  new Creature("Fly Swatter", "", 1, LandscapeType.Swamp, 1, 6),
);

put("Unicylops", new Creature("Unicylops", "", 2, LandscapeType.Swamp, 7, 3));
put("Man Witch", new Creature("Man Witch", "", 2, LandscapeType.Swamp, 4, 4));

put(
  "Ban-She Princess",
  new Creature("Ban She Princess", "", 1, LandscapeType.Swamp, 2, 7),
);
put(
  "Ban-She Queen",
  new Creature("Ban She Queen", "", 2, LandscapeType.Swamp, 4, 9),
);

put(
  "Ban-She Knight",
  new Creature("Ban She Knight", "", 1, LandscapeType.Swamp, 3, 7),
);
put(
  "Black Merlock",
  new Creature("Black Merlock", "", 1, LandscapeType.Swamp, 2, 5),
);

put(
  "Bog Ban-She Angel",
  new Creature("Bog Ban-She Angel", "", 1, LandscapeType.Swamp, 2, 7),
);
put("Eye Dude", new Creature("Eye Dude", "", 1, LandscapeType.Swamp, 2, 9));

put(
  "Giant Spider",
  new Creature("Giant Spider", "", 2, LandscapeType.Swamp, 4, 10),
);
put(
  "Burning Eyebat",
  new Creature("Burning Eyebat", "", 1, LandscapeType.Swamp, 4, 4),
);

put(
  "InstiGator",
  new Creature("GoldenGator", "", 1, LandscapeType.Swamp, 5, 2),
);
put("Axe Stump", new Creature("Axe Stump", "", 1, LandscapeType.Swamp, 4, 4));

put(
  "Skeleton Hand",
  new Creature("Skeleton Hand", "", 2, LandscapeType.Swamp, 1, 11),
);
put(
  "Undying Tree",
  new Creature("Undying Tree", "", 2, LandscapeType.Swamp, 3, 8),
);

put(
  "InstiGator",
  new Creature("GoldenGator", "", 1, LandscapeType.Swamp, 5, 2),
);
put("Bald Guy", new Creature("Bald Guy", "", 1, LandscapeType.Swamp, 3, 2));

put("", new Creature("The Sludge", "The Sludge", 1, LandscapeType.Swamp, 2, 5));

put("Sludgebob", new Creature("Sludgebob", "", 1, LandscapeType.Swamp, 1, 7));

put(
  "General Mushroom",
  new Creature("General Mushroom", "", 1, LandscapeType.Swamp, 4, 3),
);

put(
  "Swamp Beast",
  new Creature("Swamp Beast", "", 2, LandscapeType.Swamp, 5, 8),
);
put(
  "Flying Gator",
  new Creature("Flying Gator", "", 2, LandscapeType.Swamp, 6, 4),
);
put(
  "Orange Slime Monster",
  new Creature("Orange Slime Monster", "", 1, LandscapeType.Swamp, 5, 5),
);

put(
  "Green Mermaid",
  new Creature("Green Mermaid", "", 1, LandscapeType.Swamp, 3, 7),
);

put(
  "Green Merman",
  new Creature("Green Merman", "", 1, LandscapeType.Swamp, 0, 10),
);

//CandyLand Creatures

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
  new Creature("Cottonpult", "", 2, LandscapeType.Candylands, 6, 6),
);

put(
  "Music Mallard",
  new Creature("Music Mallard", "", 1, LandscapeType.Candylands, 0, 9),
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
