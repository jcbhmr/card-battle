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
  "Swamp Dragon",new Creature("Swamp Dragon","",2,LandscapeType.Swamp,25,8)
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
  ),
);

put(
  "Bog Bum",
  new Creature("Bog Bum", "", 1, LandscapeType.Swamp, 2, 6),
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
  "Ban-She Princess",new Creature("Ban She Princess","",1,LandscapeType.Swamp,2,7)
);
put(
  "Ban-She Queen",new Creature("Ban She Queen","",2,LandscapeType.Swamp,4,9)
);

put(
  "Ban-She Knight",new Creature("Ban She Knight","",1,LandscapeType.Swamp,3,7)
);
put(
  "Black Merlock",new Creature("Black Merlock","",1,LandscapeType.Swamp,2,5)
);

put(
  "Bog Ban-She Angel",new Creature("Bog Ban-She Angel","",1,LandscapeType.Swamp,2,7)
);
put(
  "Eye Dude",new Creature("Eye Dude","",1,LandscapeType.Swamp,2,9)
);

put(
  "Giant Spider",new Creature("Giant Spider","",2,LandscapeType.Swamp,4,10)
);
put(
  "Burning Eyebat",new Creature("Burning Eyebat","",1,LandscapeType.Swamp,4,4)
);

put(
  "InstiGator",new Creature("GoldenGator","",1,LandscapeType.Swamp,5,2)
);
put(
  "Axe Stump",new Creature("Axe Stump","",1,LandscapeType.Swamp,4,4)
);

put(
  "Skeleton Hand",new Creature("Skeleton Hand","",2,LandscapeType.Swamp,1,11)
);
put(
  "Undying Tree",new Creature("Undying Tree","",2,LandscapeType.Swamp,3,8)
);

put(
  "InstiGator",new Creature("GoldenGator","",1,LandscapeType.Swamp,5,2)
);
put(
  "Bald Guy",new Creature("Bald Guy","",1,LandscapeType.Swamp,3,2)
);

put(
  "",new Creature("The Sludge","The Sludge",1,LandscapeType.Swamp,2,5)
);

put(
  "Sludgebob",new Creature("Sludgebob","",1,LandscapeType.Swamp,1,7)
);

put(
  "General Mushroom",new Creature("General Mushroom","",1,LandscapeType.Swamp,4,3)
);

put(
  "Swamp Beast",new Creature("Swamp Beast","",2,LandscapeType.Swamp,5,8)
);
put(
  "Flying Gator",new Creature("Flying Gator","",2,LandscapeType.Swamp,6,4)
);
put(
  "Orange Slime Monster",new Creature("Orange Slime Monster","",1,LandscapeType.Swamp,5,5)
);

put(
  "Green Mermaid",new Creature("Green Mermaid","",1,LandscapeType.Swamp,3,7)
);

put(
  "Green Merman",new Creature("Green Merman","",1,LandscapeType.Swamp,0,10)
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
  new Creature("Cottonpult","",2, LandscapeType.Candylands,6,6),
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

import n0 from "../assets/swamp-dragon.png"; addUrl("Swamp Dragon", n0)

import n1 from "../assets/dark-angel.png"; addUrl("Dark Angel", n1)

import n2 from "../assets/bog-bum.png"; addUrl("Bog Bum", n2)

import n3 from "../assets/fly-swatter.png"; addUrl("Fly Swatter", n3)

import n4 from "../assets/unicylops.png"; addUrl("Unicylops", n4)

import n5 from "../assets/man-witch.png"; addUrl("Man Witch", n5)

import n6 from "../assets/ban-she-princess.png"; addUrl("Ban-She Princess", n6)

import n7 from "../assets/ban-she-queen.png"; addUrl("Ban-She Queen", n7)

import n8 from "../assets/ban-she-knight.png"; addUrl("Ban-She Knight", n8)

import n9 from "../assets/black-merlock.png"; addUrl("Black Merlock", n9)

import n10 from "../assets/bog-ban-she-angel.png"; addUrl("Bog Ban-She Angel", n10)

import n11 from "../assets/eye-dude.png"; addUrl("Eye Dude", n11)

import n12 from "../assets/giant-spider.png"; addUrl("Giant Spider", n12)

import n13 from "../assets/burning-eyebat.png"; addUrl("Burning Eyebat", n13)

import n14 from "../assets/instigator.png"; addUrl("InstiGator", n14)

import n15 from "../assets/axe-stump.png"; addUrl("Axe Stump", n15)

import n16 from "../assets/skeleton-hand.png"; addUrl("Skeleton Hand", n16)

import n17 from "../assets/undying-tree.png"; addUrl("Undying Tree", n17)

import n18 from "../assets/bald-guy.png"; addUrl("Bald Guy", n18)

import n19 from "../assets/the-sludge.png"; addUrl("The Sludge", n19)

import n20 from "../assets/sludgebob.png"; addUrl("Sludgebob", n20)

import n21 from "../assets/general-mushroom.png"; addUrl("General Mushroom", n21)

import n22 from "../assets/swamp-beast.png"; addUrl("Swamp Beast", n22)

import n23 from "../assets/flying-gator.png"; addUrl("Flying Gator", n23)

import n24 from "../assets/orange-slime-monster.png"; addUrl("Orange Slime Monster", n24)

import n25 from "../assets/green-mermaid.png"; addUrl("Green Mermaid", n25)

import n26 from "../assets/green-merman.png"; addUrl("Green Merman", n26)

import n27 from "../assets/furious-hen.png"; addUrl("Furious Hen", n27)

import n28 from "../assets/furious-rooster.png"; addUrl("Furious Rooster", n28)

import n29 from "../assets/papercut-tiger.png"; addUrl("Papercut Tiger", n29)

import n30 from "../assets/cottonpult.png"; addUrl("Cottonpult", n30)

import n31 from "../assets/music-mallard.png"; addUrl("Music Mallard", n31)

import n32 from "../assets/beach-mum.png"; addUrl("Beach Mum", n32)

import n33 from "../assets/black-cat.png"; addUrl("Black Cat", n33)

import n34 from "../assets/burning-hand.png"; addUrl("Burning Hand", n34)

import n35 from "../assets/cactus-thug.png"; addUrl("Cactus Thug", n35)

import n36 from "../assets/count-cactus.png"; addUrl("Count Cactus", n36)

import n37 from "../assets/fummy.png"; addUrl("Fummy", n37)

import n38 from "../assets/giant-mummy-hand.png"; addUrl("Giant Mummy Hand", n38)

import n39 from "../assets/green-cactaball.png"; addUrl("Green Cactaball", n39)

import n40 from "../assets/green-party-ogre.png"; addUrl("Green Party Ogre", n40)

import n41 from "../assets/lady-mary.png"; addUrl("Lady Mary", n41)

import n42 from "../assets/lime-slimey.png"; addUrl("Lime Slimey", n42)

import n43 from "../assets/lost-golem.png"; addUrl("Lost Golem", n43)

import n44 from "../assets/mayonaise-angel.png"; addUrl("Mayonaise Angel", n44)

import n45 from "../assets/ms-mummy.png"; addUrl("Ms. Mummy", n45)

import n46 from "../assets/mud-angel.png"; addUrl("Mud Angel", n46)

import n47 from "../assets/pieclops.png"; addUrl("Pieclops", n47)

import n48 from "../assets/prickle.png"; addUrl("Prickle", n48)

import n49 from "../assets/sandbacho.png"; addUrl("Sandbacho", n49)

import n50 from "../assets/sand-angel.png"; addUrl("Sand Angel", n50)

import n51 from "../assets/sand-eyebat.png"; addUrl("Sand Eyebat", n51)

import n52 from "../assets/sand-jackal.png"; addUrl("Sand Jackal", n52)

import n53 from "../assets/sand-knight.png"; addUrl("Sand Knight", n53)

import n54 from "../assets/sandasaurus-rex.png"; addUrl("Sandasaurus Rex", n54)

import n55 from "../assets/sandfoot.png"; addUrl("Sandfoot", n55)

import n56 from "../assets/sandsnake.png"; addUrl("Sandsnake", n56)

import n57 from "../assets/sandwitch.png"; addUrl("Sandwitch", n57)

import n58 from "../assets/sandy.png"; addUrl("Sandy", n58)

import n59 from "../assets/wall-of-chocolate.png"; addUrl("Wall of Chocolate", n59)

import n60 from "../assets/wall-of-sand.png"; addUrl("Wall of Sand", n60)