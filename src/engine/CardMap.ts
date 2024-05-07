import { LandscapeType } from "./game.ts";
import { Card, Creature, Landscape } from "./card.ts";

var cardMap: Map<string, Card> = new Map<string, Card>();

function put(name: string, card: Card): void {
  cardMap.set(name, card);
}

export function addUrl(name: string, Url: string): void {
  var card: Card | undefined = cardMap.get(name);
  if (typeof card == "undefined") {
    console.assert("Card not found", name, "for addUrl", Url);
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

class Deck {
  name: string;
  landscapes: Landscape[];
  cards: Card[];

  constructor(name: string, lands: Landscape[], cards: Card[]) {
    this.name = name;
    this.landscapes = lands;
    this.cards = cards;
  }
}

//WRITE CARDS BELOW

//=====================================================================================================================================================
//                                                                  SWAMP
//=====================================================================================================================================================

//Swamp Creatures

//Made this card more for testing or ending the game quickly if we have to.
import n0 from "../assets/swamp-dragon.png";
put(
  "Swamp Dragon",
  new Creature("Swamp Dragon", "", 2, LandscapeType.Swamp, 25, 8, n0),
);
import n1 from "../assets/dark-angel.png";
put(
  "Dark Angel",
  new Creature("Dark Angel", "", 1, LandscapeType.Swamp, 10, 5, n1),
);

import n2 from "../assets/bog-bum.png";
put("Bog Bum", new Creature("Bog Bum", "", 1, LandscapeType.Swamp, 2, 6, n2));

// Not sure about this one. This card's ability is not really functional right now.
import n3 from "../assets/fly-swatter.png";
put(
  "Fly Swatter",
  new Creature(
    "Fly Swatter",
    "He kill a exodia!!!",
    1,
    LandscapeType.Swamp,
    1,
    6,
    n3,
  ),
);

import n4 from "../assets/unicyclops.png";
put(
  "Unicyclops",
  new Creature("Unicyclops", "", 2, LandscapeType.Swamp, 7, 3, n4),
);
import n5 from "../assets/man-witch.png";
put(
  "Man-Witch",
  new Creature("Man-Witch", "", 2, LandscapeType.Swamp, 4, 4, n5),
);

import n6 from "../assets/ban-she-princess.png";
put(
  "Ban-She Princess",
  new Creature("Ban She Princess", "", 1, LandscapeType.Swamp, 2, 7, n6),
);
import n7 from "../assets/ban-she-queen.png";
put(
  "Ban-She Queen",
  new Creature("Ban She Queen", "", 2, LandscapeType.Swamp, 4, 9, n7),
);

import n8 from "../assets/ban-she-knight.png";
put(
  "Ban-She Knight",
  new Creature("Ban She Knight", "", 1, LandscapeType.Swamp, 3, 7, n8),
);
import n9 from "../assets/black-merlock.png";
put(
  "Black Merlock",
  new Creature("Black Merlock", "", 1, LandscapeType.Swamp, 2, 5, n9),
);

import n10 from "../assets/bog-ban-she-angel.png";
put(
  "Bog Ban-She Angel",
  new Creature("Bog Ban-She Angel", "", 1, LandscapeType.Swamp, 2, 7, n10),
);
import n11 from "../assets/eye-dude.png";
put("Eye Dude", new Creature("Eye Dude", "", 1, LandscapeType.Swamp, 2, 9, n11));

import n12 from "../assets/giant-spider.png";
put(
  "Giant Spider",
  new Creature("Giant Spider", "", 2, LandscapeType.Swamp, 4, 10, n12),
);
import n13 from "../assets/burning-eyebat.png";
put(
  "Burning Eyebat",
  new Creature("Burning Eyebat", "", 1, LandscapeType.Swamp, 4, 4, n13),
);

import n14 from "../assets/instigator.png";
put(
  "InstiGator",
  new Creature("GoldenGator", "", 1, LandscapeType.Swamp, 5, 2, n14),
);
import n15 from "../assets/axe-stump.png";
put(
  "Axe Stump",
  new Creature("Axe Stump", "", 1, LandscapeType.Swamp, 4, 4, n15),
);

import n16 from "../assets/skeleton-hand.png";
put(
  "Skeleton Hand",
  new Creature("Skeleton Hand", "", 2, LandscapeType.Swamp, 1, 11, n16),
);
import n17 from "../assets/undying-tree.png";
put(
  "Undying Tree",
  new Creature("Undying Tree", "", 2, LandscapeType.Swamp, 3, 8, n17),
);

import n18 from "../assets/bald-guy.png";
put("Bald Guy", new Creature("Bald Guy", "", 1, LandscapeType.Swamp, 3, 2, n18));

import n19 from "../assets/the-sludge.png";
put(
  "",
  new Creature("The Sludge", "The Sludge", 1, LandscapeType.Swamp, 2, 5, n19),
);

import n20 from "../assets/sludgebob.png";
put(
  "Sludgebob",
  new Creature("Sludgebob", "", 1, LandscapeType.Swamp, 1, 7, n20),
);

import n21 from "../assets/general-mushroom.png";
put(
  "General Mushroom",
  new Creature("General Mushroom", "", 1, LandscapeType.Swamp, 4, 3, n21),
);

import n22 from "../assets/swamp-beast.png";
put(
  "Swamp Beast",
  new Creature("Swamp Beast", "", 2, LandscapeType.Swamp, 5, 8, n22),
);
import n23 from "../assets/flying-gator.png";
put(
  "Flying Gator",
  new Creature("Flying Gator", "", 2, LandscapeType.Swamp, 6, 4, n23),
);
import n24 from "../assets/orange-slime-monster.png";
put(
  "Orange Slime Monster",
  new Creature("Orange Slime Monster", "", 1, LandscapeType.Swamp, 5, 5, n24),
);

import n25 from "../assets/green-mermaid.png";
put(
  "Green Mermaid",
  new Creature("Green Mermaid", "", 1, LandscapeType.Swamp, 3, 7, n25),
);

import n26 from "../assets/green-merman.png";
put(
  "Green Merman",
  new Creature("Green Merman", "", 1, LandscapeType.Swamp, 0, 10, n26),
);

import n26b from "../assets/bog-frog-bomb.png";
put(
  "Bog Frog Bomb",
  new Creature("Bog Frog Bomb", "", 2, LandscapeType.Swamp, 16, 18, n26b),
);

//=====================================================================================================================================================
//                                                              CANDYLANDS
//=====================================================================================================================================================

import n27 from "../assets/furious-hen.png";
put(
  "Furious Hen",
  new Creature("Furious Hen", "", 1, LandscapeType.Candylands, 2, 7, n27),
);

import n28 from "../assets/furious-rooster.png";
put(
  "Furious Rooster",
  new Creature("Furious Rooster", "", 1, LandscapeType.Candylands, 4, 4, n28),
);

import n29 from "../assets/papercut-tiger.png";
put(
  "Papercut Tiger",
  new Creature("Papercut Tiger", "", 1, LandscapeType.Candylands, 2, 5, n29),
);

import n30 from "../assets/cottonpult.png";
put(
  "Cottonpult",
  new Creature("Cottonpult", "", 2, LandscapeType.Candylands, 6, 6, n30),
);

import n31 from "../assets/music-mallard.png";
put(
  "Music Mallard",
  new Creature("Music Mallard", "", 1, LandscapeType.Candylands, 0, 9, n31),
);

import n31b from "../assets/dr-stuffenstein.png";
put(
  "Dr. Stuffenstein",
  new Creature("Dr. Stuffenstein", "", 0, LandscapeType.Candylands, 0, 1, n31b),
);

import n31c from "../assets/furious-chick.png"
put(
  "Furious Chick",
  new Creature("Furious Chick", "", 1, LandscapeType.Candylands, 7, 8, n31c),
);

//=====================================================================================================================================================
//                                                             SANDYLANDS
//=====================================================================================================================================================

import n32 from "../assets/beach-mum.png";
put(
  "Beach Mummy",
  new Creature("Beach Mummy", "", 2, LandscapeType.Desert, 9, 11, n32),
);

import n33 from "../assets/black-cat.png";
put(
  "Black Cat",
  new Creature("Black Cat", "", 5, LandscapeType.Desert, 15, 35, n33),
);

import n34 from "../assets/burning-hand.png";
put(
  "Burning Hand",
  new Creature("Burning Hand", "", 1, LandscapeType.Desert, 5, 2, n34),
);

import n35 from "../assets/cactus-thug.png";
put(
  "Cactus Thug",
  new Creature("Cactus Thug", "", 5, LandscapeType.Desert, 25, 12, n35),
);

import n36 from "../assets/count-cactus.png";
put(
  "Count Cactus",
  new Creature("Count Cactus", "", 5, LandscapeType.Desert, 5, 48, n36),
);

import n37 from "../assets/fummy.png";
put("Fummy", new Creature("Fummy", "", 4, LandscapeType.Desert, 4, 24, n37));

import n38 from "../assets/giant-mummy-hand.png";
put(
  "Giant Mummy Hand",
  new Creature("Giant Mummy Hand", "", 4, LandscapeType.Desert, 9, 29, n38),
);

import n39 from "../assets/green-cactaball.png";
put(
  "Green Cactiball",
  new Creature("Green Cactiball", "", 1, LandscapeType.Desert, 4, 3, n39),
);

import n40 from "../assets/green-party-ogre.png";
put(
  "Green Party Ogre",
  new Creature("Green Party Ogre", "", 0, LandscapeType.Desert, 11, 19, n40),
);

import n41 from "../assets/lady-mary.png";
put(
  "Lady Mary",
  new Creature("Lady Mary", "", 4, LandscapeType.Desert, 18, 20, n41),
);

import n42 from "../assets/lime-slimey.png";
put(
  "Lime Slimey",
  new Creature("Lime Slimey", "", 2, LandscapeType.Desert, 8, 8, n42),
);

import n43 from "../assets/lost-golem.png";
put(
  "Lost Golem",
  new Creature("Lost Golem", "", 5, LandscapeType.Desert, 10, 36, n43),
);

import n44 from "../assets/mayonaise-angel.png";
put(
  "Mayonaise Angel",
  new Creature("Mayonaise Angel", "", 2, LandscapeType.Desert, 4, 12, n44),
);

import n45 from "../assets/ms-mummy.png"
put(
  "Ms. Mummy",
  new Creature("Ms. Mummy", "", 1, LandscapeType.Desert, 3, 6, n45),
);

import n46 from "../assets/mud-angel.png"
put(
  "Mud Angel",
  new Creature("Mud Angel", "", 3, LandscapeType.Desert, 9, 21, n46),
);

import n47 from "../assets/pieclops.png"
put(
  "Pieclops",
  new Creature("Pieclops", "", 5, LandscapeType.Desert, 20, 25, n47),
);

import n48 from "../assets/mud-angel.png"
put("Prickle", new Creature("Prickle", "", 3, LandscapeType.Desert, 9, 18, n48));

import n49 from "../assets/sandbacho.png"
put(
  "Sandbacho",
  new Creature("Sandbacho", "", 2, LandscapeType.Desert, 11, 10, n49),
);

import n50 from "../assets/sand-angel.png"
put(
  "Sand Angel",
  new Creature("Sand Angel", "", 1, LandscapeType.Desert, 2, 6, n50),
);

import n51 from "../assets/sand-eyebat.png"
put(
  "Sand Eyebat",
  new Creature("Sand Eyebat", "", 1, LandscapeType.Desert, 4, 4, n51),
);

import n52 from "../assets/sand-jackal.png"
put(
  "Sand Jackal",
  new Creature("Sand Jackal", "", 3, LandscapeType.Desert, 6, 21, n52),
);

import n53 from "../assets/sand-knight.png"
put(
  "Sand Knight",
  new Creature("Sand Knight", "", 4, LandscapeType.Desert, 20, 20, n53),
);

import n54 from "../assets/sandasaurus-rex.png"
put(
  "Sandasaurus Rex",
  new Creature("Sandasaurus Rex", "", 0, LandscapeType.Desert, 14, 16, n54),
);

import n55 from "../assets/sandfoot.png"
put(
  "Sandfoot",
  new Creature("Sandfoot", "", 3, LandscapeType.Desert, 10, 17, n55),
);

import n56 from "../assets/sand-snake.png"
put(
  "Sandsnake",
  new Creature("Sandsnake", "", 2, LandscapeType.Desert, 12, 7, n56),
);

import n57 from "../assets/sand-witch.png"
put(
  "SandWitch",
  new Creature("SandWitch", "", 4, LandscapeType.Desert, 25, 10, n57),
);

import n58 from "../assets/sandy.png"
put("Sandy", new Creature("Sandy", "", 5, LandscapeType.Desert, 28, 18, n58));

import n59 from "../assets/wall-of-chocolate.png"
put(
  "Wall of Chocolate",
  new Creature("Wall of Chocolate", "", 3, LandscapeType.Desert, 5, 20, n59),
);

import n60 from "../assets/wall-of-sand.png"
put(
  "Wall of Sand",
  new Creature("Wall of Sand", "", 3, LandscapeType.Desert, 0, 26, n60),
);

import n61 from "../assets/the-mariachi.png"
put(
  "The Mariachi",
  new Creature("The Mariachi", "", 2, LandscapeType.Desert, 5, 20, n61),
);

import n62 from "../assets/sandhorn-devil.png"
put(
  "Sandhorn Devil",
  new Creature("Sandhorn Devil", "", 1, LandscapeType.Desert, 18, 21, n62),
);

import n63 from "../assets/peach-djinni.png"
put(
  "Peach Djinni",
  new Creature("Peach Djinni", "", 1, LandscapeType.Desert, 2, 8, n63),
);

//=====================================================================================================================================================
//                                                                CORNFIELDS
//=====================================================================================================================================================

put(
  "Archer Dan",
  new Creature("Archer Dan", "", 2, LandscapeType.Cornfields, 12, 6, ""),
);

put(
  "Captain Taco",
  new Creature("Captain Taco", "", 5, LandscapeType.Cornfields, 15, 30, ""),
);

put(
  "Weak ChupaMaiz",
  new Creature("Weak ChupaMaiz", "", 3, LandscapeType.Cornfields, 4, 10, ""),
);

put(
  "Corn Dog",
  new Creature("Corn Dog", "", 2, LandscapeType.Cornfields, 9, 11, ""),
);

put(
  "Corn Lord",
  new Creature("Corn Lord", "", 5, LandscapeType.Cornfields, 10, 38, ""),
);

put(
  "Corn Ronin",
  new Creature("Corn Ronin", "", 3, LandscapeType.Cornfields, 18, 10, ""),
);

put(
  "Cornataur",
  new Creature("cornataur", "", 4, LandscapeType.Cornfields, 17, 19, ""),
);

put(
  "Cornball",
  new Creature("Cornball", "", 1, LandscapeType.Cornfields, 2, 5, ""),
);

put(
  "Ethan Allfire",
  new Creature("Ethan Allfire", "", 1, LandscapeType.Cornfields, 5, 1, ""),
);

put(
  "Field Reaper",
  new Creature("Field Reaper", "", 4, LandscapeType.Cornfields, 25, 13, ""),
);

put(
  "Field Stalker",
  new Creature("Field Stalker", "", 4, LandscapeType.Cornfields, 5, 34, ""),
);

put(
  "Ghost Sludger",
  new Creature("Ghost Sludger", "", 4, LandscapeType.Cornfields, 1, 37, ""),
);

put(
  "Husker Giant",
  new Creature("Husker Giant", "", 5, LandscapeType.Cornfields, 15, 30, ""),
);

put(
  "Husker Knight",
  new Creature("Husker Knight", "", 1, LandscapeType.Cornfields, 6, 3, ""),
);

put(
  "Husker Worm",
  new Creature("Husker Worm", "", 1, LandscapeType.Cornfields, 3, 5, ""),
);

put(
  "Huskerbat",
  new Creature("Huskerbat", "", 3, LandscapeType.Cornfields, 4, 22, ""),
);

put(
  "Legion of Earlings",
  new Creature(
    "Legion of Earlings",
    "",
    5,
    LandscapeType.Cornfields,
    23,
    23,
    "",
  ),
);

put(
  "Log Knight",
  new Creature("Log Knight", "", 0, LandscapeType.Cornfields, 10, 20, ""),
);

put(
  "Mary-Ann",
  new Creature("Mary-Ann", "", 4, LandscapeType.Cornfields, 10, 27, ""),
);

put(
  "Patchy the Pumpkin",
  new Creature(
    "Patchy the Pumpkin",
    "",
    3,
    LandscapeType.Cornfields,
    22,
    5,
    "",
  ),
);

put(
  "Purple Cow",
  new Creature("Purple Cow", "", 3, LandscapeType.Cornfields, 5, 20, ""),
);

put(
  "Rural Earl",
  new Creature("Rural Earl", "", 2, LandscapeType.Cornfields, 13, 8, ""),
);

put(
  "Sun King",
  new Creature("Sun King", "", 0, LandscapeType.Cornfields, 5, 25, ""),
);

put(
  "The Sludger",
  new Creature("The Sludger", "", 3, LandscapeType.Cornfields, 15, 15, ""),
);

put(
  "Travelin' Farmer",
  new Creature("Travelin' Farmer", "", 1, LandscapeType.Cornfields, 5, 5, ""),
);

put(
  "Ugly Tree",
  new Creature("Ugly Tree", "", 5, LandscapeType.Cornfields, 15, 33, ""),
);

put(
  "Wall of Ears",
  new Creature("Wall of Ears", "", 2, LandscapeType.Cornfields, 0, 18, ""),
);

put(
  "Yellow Gnome",
  new Creature("Yellow Gnome", "", 0, LandscapeType.Cornfields, 0, 30, ""),
);

put(
  "Phyllis",
  new Creature("Phyllis", "", 4, LandscapeType.Cornfields, 5, 15, ""),
);

put(
  "Evil Eye",
  new Creature("Evil Eye", "", 2, LandscapeType.Cornfields, 5, 5, ""),
);

put(
  "Big Foot",
  new Creature("Big Foot", "", 3, LandscapeType.Cornfields, 7, 8, ""),
);

//=====================================================================================================================================================
//                                                                Hills
//=====================================================================================================================================================

put(
  "Punk Cat",
  new Creature("Punk Cat", "", 3, LandscapeType.Hills, 8, 22, ""),
);

put("Cool Dog", new Creature("Cool Dog", "", 1, LandscapeType.Hills, 3, 7, ""));

put(
  "Embarrassing Bard",
  new Creature("Embarrassing Bard", "", 5, LandscapeType.Hills, 10, 34, ""),
);

put(
  "Ancient Scholar",
  new Creature("Ancient Scholar", "", 2, LandscapeType.Hills, 3, 13, ""),
);

put(
  "Dragon Claw",
  new Creature("Dragon Claw", "", 2, LandscapeType.Hills, 5, 15, ""),
);

put(
  "Woadic Chief",
  new Creature("Woadic Chief", "", 5, LandscapeType.Hills, 18, 30, ""),
);

put(
  "Struzann Jinn",
  new Creature("Struzann Jinn", "", 4, LandscapeType.Hills, 15, 25, ""),
);

put(
  "Psionic Architect",
  new Creature("Psionic Architect", "", 3, LandscapeType.Hills, 17, 8, ""),
);

put(
  "X-Large Spirit Soldier",
  new Creature("X-Large Spirit Soldier", "", 5, LandscapeType.Hills, 5, 40, ""),
);

put(
  "Heavenly Gazer",
  new Creature("Heavenly Gazer", "", 1, LandscapeType.Hills, 1, 6, ""),
);

put(
  "Woadic Marauder",
  new Creature("Woadic Marauder", "", 4, LandscapeType.Hills, 22, 12, ""),
);

put("The Pig", new Creature("The Pig", "", 1, LandscapeType.Hills, 1, 4, ""));

put(
  "Uni-Knight",
  new Creature("Unicycle Knight", "", 5, LandscapeType.Hills, 12, 13, ""),
);

//=====================================================================================================================================================
//                                                                Icelands
//=====================================================================================================================================================

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

put("Uni", new Creature("Unicycle", "", 5, LandscapeType.Hills, 12, 13, ""));

//=====================================================================================================================================================
//                                                                BUILDINGS
//=====================================================================================================================================================

//=====================================================================================================================================================
//                                                                LANDSCAPES
//=====================================================================================================================================================
var Cornfield: Landscape = new Landscape(
  "Cornfields",
  "Corny Joke Here!",
  LandscapeType.Cornfields,
);
var Hills: Landscape = new Landscape("Hills", "", LandscapeType.Hills);
var Swampland: Landscape = new Landscape(
  "Swamplands",
  "Goopy!",
  LandscapeType.Swamp,
);
var Candyland: Landscape = new Landscape(
  "Candylands",
  "Sweet!",
  LandscapeType.Candylands,
);
var Icyland: Landscape = new Landscape(
  "Icylands",
  "Cold!",
  LandscapeType.Icelands,
);
var Sandyland: Landscape = new Landscape(
  "Sandylands",
  "",
  LandscapeType.Desert,
);

//=====================================================================================================================================================
//                                                                   DECKS
//=====================================================================================================================================================
var CornfieldDeck = new Deck(
  "Cornfield Deck",
  [Cornfield, Cornfield, Cornfield, Cornfield],
  [
    get("Husker Worm"),
    get("Cornataur"),
    get("Legion of Earlings"),
    get("Field Stalker"),
    get("Patchy the Pumpkin"),
    get("Corn Ronin"),
    get("Wall of Ears"),
    get("Travelin' Farmer"),
    get("Husker Knight"),
    get("Archer Dan"),
    get("Corn Dog"),
    get("Corn Lord"),
    get("Field Reaper"),
    get("Phyllis"),
    get("Evil Eye"),
    get("Big Foot"),
    get("Husker Worm"),
    get("Cornataur"),
    get("Legion of Earlings"),
    get("Field Stalker"),
  ],
);

var HillsDeck = new Deck(
  "Hills Deck",
  [Hills, Hills, Hills, Hills],
  [
    get("Punk Cat"),
    get("Cool Dog"),
    get("Embarrassing Bard"),
    get("Ancient Scholar"),
    get("Dragon Claw"),
    get("Woadic Chief"),
    get("Struzann Jinn"),
    get("Psionic Architect"),
    get("X-Large Spirit Soldier"),
    get("Heavenly Gazer"),
    get("Uni-Knight"),
    get("Woadic Marauder"),
    get("The Pig"),
    get("Punk Cat"),
    get("Cool Dog"),
    get("Ancient Scholar"),
    get("Dragon Claw"),
    get("Struzann Jinn"),
    get("Psionic Architect"),
    get("X-Large Spirit Soldier"),
  ],
);

var SwamplandsDeck = new Deck(
  "Swmaplands Deck",
  [Swampland, Swampland, Candyland, Candyland],
  [
    get("Bog Ban-She Angel"),
    get("Ban-She Princess"),
    get("Fly Swatter"),
    get("Bog Bum"),
    get("Unicyclops"),
    get("Man-Witch"),
    get("Ban-She Queen"),
    get("Bog Frog Bomb"),
    get("Furious Rooster"),
    get("Music Mallard"),
    get("Cottonpult"),
    get("Dr. Stuffenstein"),
    get("Furious Hen"),
    get("Papercut Tiger"),
    get("Furious Chick"),
    get("Ban-She Princess"),
    get("Fly Swatter"),
    get("Bog Bum"),
    get("Unicyclops"),
    get("Man-Witch"),
  ],
);

/*var IcelandsDeck = new Deck("Icylands Deck", [Icyland, Icyland, Icyland, Icyland], [get("Cold Soldier"), get("Abdominal Snowman"), get("Icemeister"), get("Sprucy Lucy"), 
get("Reign Deer"), get("Frost Dragon"), get("Slay Rider"), get("Frozen Fish"), get("Snow Angel"), get("Emperor Penguin"), get("Snow Bunny"), get("Snow Dog"), 
get("Boarder Collie"), get("Cold Soldier"), get("Adbominal Snowman"), get("Icemeister"), get("Reign Deer"), get("Frost Dragon"), get("Slay Rider"), 
get("Frozen Fish")])*/

var SandylandsDeck = new Deck(
  "Sandyland Deck",
  [Sandyland, Sandyland, Sandyland, Sandyland],
  [
    get("Sandsnake"),
    get("Beach Mummy"),
    get("The Mariachi"),
    get("SandWitch"),
    get("Sand Eyebat"),
    get("Green Cactiball"),
    get("Sandhorn Devil"),
    get("Wall of Sand"),
    get("Lost Golem"),
    get("Sand Knight"),
    get("Fummy"),
    get("Sand Angel"),
    get("Peach Djinni"),
    get("Ms. Mummy"),
    get("Sandsnake"),
    get("Beach Mummy"),
    get("The Mariachi"),
    get("SandWitch"),
    get("Sand Eyebat"),
    get("Green Cactiball"),
  ],
);

//[get(""), get(""), get(""), get(""), get(""), get(""), get(""), get(""), get(""), get(""), get(""),
//get(""), get(""), get(""), get(""), get(""), get(""), get(""), get(""), get("")]

export function seeNonNullDecks() {
  var decks = [CornfieldDeck, HillsDeck, SwamplandsDeck, SandylandsDeck];
  runner: for (var i = 0; i < decks.length; i++) {
    console.log(
      "=====================================================================================",
    );
    console.log("                         CHECKING " + decks[i].name);
    console.log(
      "=====================================================================================",
    );
    for (var j = 0; j < decks[i].cards.length; j++) {
      console.log("Checking Card " + decks[i].cards[j].name);
      if (decks[i].cards[j].equals(Creature.getNull())) {
        decks.splice(i, 1);
        i--;
        continue runner;
      }
    }
  }

  console.log();
  console.log(
    "=====================================NON-NULL DECKS=====================================",
  );
  for (var i = 0; i < decks.length; i++) {
    console.log(decks[i].name + " is Non-Null");
  }
}

export var exportDecks = [
  { name: "Cornfield deck", deck: getCornfieldDeck },
  { name: "Hills deck", deck: getHillsDeck },
  { name: "SwamplandsDeck", deck: getSwamplandsDeck },
  { name: "IcelandsDeck", deck: getIcelandsDeck },
  { name: "SandylandsDeck", deck: getSandylandsDeck },
];
function getSandylandsDeck() {
  return new Deck(
    "Sandyland Deck",
    [Sandyland, Sandyland, Sandyland, Sandyland],
    [
      get("Sandsnake"),
      get("Beach Mummy"),
      get("The Mariachi"),
      get("SandWitch"),
      get("Sand Eyebat"),
      get("Green Cactiball"),
      get("Sandhorn Devil"),
      get("Wall of Sand"),
      get("Lost Golem"),
      get("Sand Knight"),
      get("Fummy"),
      get("Sand Angel"),
      get("Peach Djinni"),
      get("Ms. Mummy"),
      get("Sandsnake"),
      get("Beach Mummy"),
      get("The Mariachi"),
      get("SandWitch"),
      get("Sand Eyebat"),
      get("Green Cactiball"),
    ],
  );
}

function getIcelandsDeck() {
  return new Deck(
    "Icylands Deck",
    [Icyland, Icyland, Icyland, Icyland],
    [
      get("Cold Soldier"),
      get("Abdominal Snowman"),
      get("Icemeister"),
      get("Sprucy Lucy"),
      get("Reign Deer"),
      get("Frost Dragon"),
      get("Slay Rider"),
      get("Frozen Fish"),
      get("Snow Angel"),
      get("Emperor Penguin"),
      get("Snow Bunny"),
      get("Snow Dog"),
      get("Boarder Collie"),
      get("Cold Soldier"),
      get("Adbominal Snowman"),
      get("Icemeister"),
      get("Reign Deer"),
      get("Frost Dragon"),
      get("Slay Rider"),
      get("Frozen Fish"),
    ],
  );
}

function getSwamplandsDeck() {
  return new Deck(
    "Swmaplands Deck",
    [Swampland, Swampland, Candyland, Candyland],
    [
      get("Bog Ban-She Angel"),
      get("Ban-She Princess"),
      get("Fly Swatter"),
      get("Bog Bum"),
      get("Unicyclops"),
      get("Man-Witch"),
      get("Ban-She Queen"),
      get("Bog Frog Bomb"),
      get("Furious Rooster"),
      get("Music Mallard"),
      get("Cottonpult"),
      get("Dr. Stuffenstein"),
      get("Furious Hen"),
      get("Papercut Tiger"),
      get("Furious Chick"),
      get("Ban-She Princess"),
      get("Fly Swatter"),
      get("Bog Bum"),
      get("Unicyclops"),
      get("Man-Witch"),
    ],
  );
}

function getHillsDeck() {
  return new Deck(
    "Hills Deck",
    [Hills, Hills, Hills, Hills],
    [
      get("Punk Cat"),
      get("Cool Dog"),
      get("Embarrassing Bard"),
      get("Ancient Scholar"),
      get("Dragon Claw"),
      get("Woadic Chief"),
      get("Struzann Jinn"),
      get("Psionic Architect"),
      get("X-Large Spirit Soldier"),
      get("Heavenly Gazer"),
      get("Uni-Knight"),
      get("Woadic Marauder"),
      get("The Pig"),
      get("Punk Cat"),
      get("Cool Dog"),
      get("Ancient Scholar"),
      get("Dragon Claw"),
      get("Struzann Jinn"),
      get("Psionic Architect"),
      get("X-Large Spirit Soldier"),
    ],
  );
}

function getCornfieldDeck() {
  return new Deck(
    "Cornfield Deck",
    [Cornfield, Cornfield, Cornfield, Cornfield],
    [
      get("Husker Worm"),
      get("Cornataur"),
      get("Legion of Earlings"),
      get("Field Stalker"),
      get("Patchy the Pumpkin"),
      get("Corn Ronin"),
      get("Wall of Ears"),
      get("Travelin' Farmer"),
      get("Husker Knight"),
      get("Archer Dan"),
      get("Corn Dog"),
      get("Corn Lord"),
      get("Field Reaper"),
      get("Phyllis"),
      get("Evil Eye"),
      get("Big Foot"),
      get("Husker Worm"),
      get("Corntaur"),
      get("Legion of Earlings"),
      get("Field Stalker"),
    ],
  );
}
