import {
  LandscapeType
} from "../model.ts";
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
  "Swamp Dragon",new Creature("Swamp Dragon","",2,LandscapeType.Swamp,25,8,"")
);
put(
  "Dark Angel",
  new Creature(
    "Dark Angel",
    "",
    1,
    LandscapeType.Swamp,
    10,
    5,
    ""
  ),
);

put(
  "Bog Bum",
  new Creature("Bog Bum", "", 1, LandscapeType.Swamp, 2, 6,""),
);


// Not sure about this one. This card's ability is not really functional right now.
put(
  "Fly Swatter",
  new Creature(
    "Fly Swatter",
    "He kill a exodia!!!",
    1,
    LandscapeType.Swamp,
    1,
    6,
    "src/assets/flyswatter.png"
  ),
);

put(
  "Unicylops",
  new Creature("Unicylops", "", 2, LandscapeType.Swamp, 7, 3,""),
);
put(
  "Man Witch",
  new Creature("Man Witch", "", 2, LandscapeType.Swamp, 4, 4,""),
);



put(
  "Ban-She Princess",new Creature("Ban She Princess","",1,LandscapeType.Swamp,2,7,"")
);
put(
  "Ban-She Queen",new Creature("Ban She Queen","",2,LandscapeType.Swamp,4,9,"")
);

put(
  "Ban-She Knight",new Creature("Ban She Knight","",1,LandscapeType.Swamp,3,7,"")
);
put(
  "Black Merlock",new Creature("Black Merlock","",1,LandscapeType.Swamp,2,5,"")
);

put(
  "Bog Ban-She Angel",new Creature("Bog Ban-She Angel","",1,LandscapeType.Swamp,2,7,"")
);
put(
  "Eye Dude",new Creature("Eye Dude","",1,LandscapeType.Swamp,2,9,"")
);

put(
  "Giant Spider",new Creature("Giant Spider","",2,LandscapeType.Swamp,4,10,"")
);
put(
  "Burning Eyebat",new Creature("Burning Eyebat","",1,LandscapeType.Swamp,4,4,"")
);

put(
  "InstiGator",new Creature("GoldenGator","",1,LandscapeType.Swamp,5,2,"")
);
put(
  "Axe Stump",new Creature("Axe Stump","",1,LandscapeType.Swamp,4,4,"")
);

put(
  "Skeleton Hand",new Creature("Skeleton Hand","",2,LandscapeType.Swamp,1,11,"")
);
put(
  "Undying Tree",new Creature("Undying Tree","",2,LandscapeType.Swamp,3,8,"")
);

put(
  "InstiGator",new Creature("GoldenGator","",1,LandscapeType.Swamp,5,2,"")
);
put(
  "Bald Guy",new Creature("Bald Guy","",1,LandscapeType.Swamp,3,2,"")
);

put(
  "",new Creature("The Sludge","The Sludge",1,LandscapeType.Swamp,2,5,"")
);

put(
  "Sludgebob",new Creature("Sludgebob","",1,LandscapeType.Swamp,1,7,"")
);

put(
  "General Mushroom",new Creature("General Mushroom","",1,LandscapeType.Swamp,4,3,"")
);

put(
  "Swamp Beast",new Creature("Swamp Beast","",2,LandscapeType.Swamp,5,8,"")
);
put(
  "Flying Gator",new Creature("Flying Gator","",2,LandscapeType.Swamp,6,4,"")
);
put(
  "Orange Slime Monster",new Creature("Orange Slime Monster","",1,LandscapeType.Swamp,5,5,"")
);

put(
  "Green Mermaid",new Creature("Green Mermaid","",1,LandscapeType.Swamp,3,7,"")
);

put(
  "Green Merman",new Creature("Green Merman","",1,LandscapeType.Swamp,0,10,"")
);



//CandyLand Creatures

put(
  "Furious Hen",
  new Creature("Furious Hen", "", 1, LandscapeType.Candylands, 2, 7,""),
);

put(
  "Furious Rooster",
  new Creature("Furious Rooster", "", 1, LandscapeType.Candylands, 4, 4,""),
);

put(
  "Papercut Tiger",
  new Creature("Papercut Tiger", "", 1, LandscapeType.Candylands, 2, 5,""),
);

put(
  "Cottonpult",
  new Creature("Cottonpult","",2, LandscapeType.Candylands,6,6,""),
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
    ""
  ),
);

//=====================================================================================================================================================
//                                                                SANDYLANDS
//=====================================================================================================================================================

put(
  "Beach Mum",
  new Creature("Beach Mum", "", 2, LandscapeType.Desert, 9, 11,"")
);

put(
  "Black Cat",
  new Creature("Black Cat", "", 5, LandscapeType.Desert, 15, 35,"")
);

put(
  "Burning Hand",
  new Creature("Burning Hand", "", 1, LandscapeType.Desert, 5, 2,"")
);

put(
  "Cactus Thug",
  new Creature("Cactus Thug", "", 5, LandscapeType.Desert, 25, 12,"")
);

put(
  "Count Cactus",
  new Creature("Count Cactus", "", 5, LandscapeType.Desert, 5, 48,"")
);

put(
  "Fummy",
  new Creature("Fummy", "", 4, LandscapeType.Desert, 4, 24,"")
);

put(
  "Giant Mummy Hand",
  new Creature("Giant Mummy Hand", "", 4, LandscapeType.Desert, 9, 29,"")
);

put(
  "Green Cactaball",
  new Creature("Greem Cactaball", "", 1, LandscapeType.Desert, 4, 3,"")
);

put(
  "Green Party Ogre",
  new Creature("Green Party Ogre", "", 0, LandscapeType.Desert, 11, 19,"")
);

put(
  "Lady Mary",
  new Creature("Lady Mary", "", 4, LandscapeType.Desert, 18, 20,"")
);

put(
  "Lime Slimey",
  new Creature("Lime Slimey", "", 2, LandscapeType.Desert, 8, 8,"")
);

put(
  "Lost Golem",
  new Creature("Lost Golem", "", 5, LandscapeType.Desert, 10, 36,"")
);

put(
  "Mayonaise Angel",
  new Creature("Mayonaise Angel", "", 2, LandscapeType.Desert, 4, 12,"")
);

put(
  "Ms. Mummy",
  new Creature("Ms. Mummy", "", 1, LandscapeType.Desert, 3, 6,"")
);

put(
  "Mud Angel",
  new Creature("Mud Angel", "", 3, LandscapeType.Desert, 9, 21,"")
);

put(
  "Pieclops",
  new Creature("Pieclops", "", 5, LandscapeType.Desert, 20, 25,"")
);

put(
  "Prickle",
  new Creature("Prickle", "", 3, LandscapeType.Desert, 9, 18,"")
);

put(
  "Sandbacho",
  new Creature("Sandbacho", "", 2, LandscapeType.Desert, 11, 10,"")
);

put(
  "Sand Angel",
  new Creature("Sand Angel", "", 1, LandscapeType.Desert, 2, 6,"")
);

put(
  "Sand Eyebat",
  new Creature("Sand Eyebat", "", 1, LandscapeType.Desert, 4, 4,"")
);

put(
  "Sand Jackal",
  new Creature("Sand Jackal", "", 3, LandscapeType.Desert, 6, 21,"")
);

put(
  "Sand Knight",
  new Creature("Sand Knight", "", 4, LandscapeType.Desert, 20, 20,"")
);

put(
  "Sandasaurus Rex",
  new Creature("Sandasaurus Rex", "", 0, LandscapeType.Desert, 14, 16,"")
);

put(
  "Sandfoot", 
  new Creature("Sandfoot", "", 3, LandscapeType.Desert, 10, 17,"")
);

put(
  "Snadsnake",
  new Creature("Sandsnake", "", 2, LandscapeType.Desert, 12, 7,"")
);

put(
  "Sandwitch",
  new Creature("Sandwitch", "", 4, LandscapeType.Desert, 25, 10,"")
);

put(
  "Sandy",
  new Creature("Sandy", "", 5, LandscapeType.Desert, 28, 18,"")
);

put(
  "Wall of Chocolate",
  new Creature("Wall of Chocolate", "", 3, LandscapeType.Desert, 5, 20,"")
);

put(
  "Wall of Sand",
  new Creature("Wall of Sand", "", 3, LandscapeType.Desert, 0, 26,"")
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
