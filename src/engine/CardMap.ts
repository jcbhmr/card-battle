import {
  LandscapeType
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
  "Unicyclops",
  new Creature("Unicyclops", "", 2, LandscapeType.Swamp, 7, 3,""),
);
put(
  "Man-Witch",
  new Creature("Man-Witch", "", 2, LandscapeType.Swamp, 4, 4,""),
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

put("Bog Frog Bomb", new Creature("Bog Frog Bomb", "", 2, LandscapeType.Swamp, 16, 18, ""));

//=====================================================================================================================================================
//                                                              CANDYLANDS
//=====================================================================================================================================================

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

put("Dr. Stuffenstein", new Creature("Dr. Stuffenstein", "", 0, LandscapeType.Candylands, 0, 1, ""));

put("Furious Chick", new Creature("Furious Chick", "", 1, LandscapeType.Candylands, 7, 8, ""));

//=====================================================================================================================================================
//                                                             SANDYLANDS
//=====================================================================================================================================================

put(
  "Beach Mummy",
  new Creature("Beach Mummy", "", 2, LandscapeType.Desert, 9, 11,"")
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
  "Green Cactiball",
  new Creature("Green Cactiball", "", 1, LandscapeType.Desert, 4, 3,"")
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
  "Sandsnake",
  new Creature("Sandsnake", "", 2, LandscapeType.Desert, 12, 7,"")
);

put(
  "SandWitch",
  new Creature("SandWitch", "", 4, LandscapeType.Desert, 25, 10,"")
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

put("The Mariachi", new Creature("The Mariachi", "", 2, LandscapeType.Desert, 5, 20, ""));

put("Sandhorn Devil", new Creature("Sandhorn Devil", "", 1, LandscapeType.Desert, 18, 21, ""));

put("Peach Djinni", new Creature("Peach Djinni", "", 1, LandscapeType.Desert, 2, 8, ""));

//=====================================================================================================================================================
//                                                                BUILDINGS
//=====================================================================================================================================================

//=====================================================================================================================================================
//                                                                LANDSCAPES
//=====================================================================================================================================================
var Cornfield: Landscape = new Landscape("Cornfields", "Corny Joke Here!", LandscapeType.Cornfields);
var Hills: Landscape = new Landscape("Hills", "", LandscapeType.Hills);
var Swampland: Landscape = new Landscape("Swamplands", "Goopy!", LandscapeType.Swamp);
var Candyland: Landscape = new Landscape("Candylands", "Sweet!", LandscapeType.Candylands);
var Icyland: Landscape = new Landscape("Icylands", "Cold!", LandscapeType.Icelands);
var Sandyland: Landscape = new Landscape("Sandylands", "", LandscapeType.Desert);

//=====================================================================================================================================================
//                                                                   DECKS
//=====================================================================================================================================================
var CornfieldDeck = new Deck("Cornfield Deck", [Cornfield, Cornfield, Cornfield, Cornfield], [get("Husker Worm"), get("Cornataur"), get("Legion of Earlings"), 
get("Field Stalker"), get("Patchy the Pumpkin"), get("Corn Ronin"), get("Wall of Ears"), get("Travelin' Farmer"), get("Husker Knight"), get("Archer Dan"), get("Corn Dog"), 
get("Corn Lord"), get("Field Reaper"), get("Phyllis"), get("Evil Eye"), get("Big Foot"), get("Husker Worm"), get("Corntaur"), get("Legion of Earlings"), 
get("Field Stalker")]);

var HillsDeck = new Deck("Hills Deck", [Hills, Hills, Hills, Hills], [get("Punk Cat"), get("Cool Dog"), get("Embarrassing Bard"), get("Ancient Scholar"), get("Dragon Claw"), 
get("Woadic Chief"), get("Struzann Jinn"), get("Psionic Architect"), get("X-Large Spirit Soldier"), get("Heavenly Gazer"), get("Uni-Knight"), 
get("Woadic Marauder"), get("The Pig"), get("Punk Cat"), get("Cool Dog"), get("Ancient Scholar"), get("Dragon Claw"), get("Struzann Jinn"), 
get("Psionic Architect"), get("X-Large Spirit Soldier")]);

var SwamplandsDeck = new Deck("Swmaplands Deck", [Swampland, Swampland, Candyland, Candyland], [get("Bog Ban-She Angel"), get("Ban-She Princess"), get("Fly Swatter"), 
get("Bog Bum"), get("Unicyclops"), get("Man-Witch"), get("Ban-She Queen"), get("Bog Frog Bomb"), get("Furious Rooster"), get("Music Mallard"), get("Cottonpult"), 
get("Dr. Stuffenstein"), get("Furious Hen"), get("Papercut Tiger"), get("Furious Chick"), get("Ban-She Princess"), get("Fly Swatter"), get("Bog Bum"), 
get("Unicyclops"), get("Man-Witch")]);

var IcelandsDeck = new Deck("Icylands Deck", [Icyland, Icyland, Icyland, Icyland], [get("Cold Soldier"), get("Abdominal Snowman"), get("Icemeister"), get("Sprucy Lucy"), 
get("Reign Deer"), get("Frost Dragon"), get("Slay Rider"), get("Frozen Fish"), get("Snow Angel"), get("Emperor Penguin"), get("Snow Bunny"), get("Snow Dog"), 
get("Boarder Collie"), get("Cold Soldier"), get("Adbominal Snowman"), get("Icemeister"), get("Reign Deer"), get("Frost Dragon"), get("Slay Rider"), 
get("Frozen Fish")])

var SandylandsDeck = new Deck("Sandyland Deck", [Sandyland, Sandyland, Sandyland, Sandyland], [get("Sandsnake"), get("Beach Mummy"), get("The Mariachi"), get("SandWitch"), 
get("Sand Eyebat"), get("Green Cactiball"), get("Sandhorn Devil"), get("Wall of Sand"), get("Lost Golem"), get("Sand Knight"), get("Fummy"), get("Sand Angel"), 
get("Peach Djinni"), get("Ms. Mummy"), get("Sandsnake"), get("Beach Mummy"), get("The Mariachi"), get("SandWitch"), get("Sand Eyebat"), get("Green Cactiball")]);

//[get(""), get(""), get(""), get(""), get(""), get(""), get(""), get(""), get(""), get(""), get(""), 
//get(""), get(""), get(""), get(""), get(""), get(""), get(""), get(""), get("")]

export function seeNonNullDecks() {
  var decks = [CornfieldDeck, HillsDeck, SwamplandsDeck, IcelandsDeck, SandylandsDeck];
  runner: for(var i = 0; i < decks.length; i++) {
    console.log("=====================================================================================");
    console.log("                         CHECKING " + decks[i].name);
    console.log("=====================================================================================")
    for(var j = 0; j < decks[i].cards.length; j++) {
      console.log("Checking Card " + decks[i].cards[j].name);
      if(decks[i].cards[j].equals(Creature.getNull())) {
        decks.splice(i, 1);
        i--;
        continue runner;
      }
    }
  }

  console.log();
  console.log("=====================================NON-NULL DECKS=====================================");
  for(var i = 0; i < decks.length; i++) {
    console.log(decks[i].name + " is Non-Null");
  }
}





export var exportDecks = [{name: "Cornfield deck", deck: getCornfieldDeck}, {name: "Hills deck", deck: getHillsDeck}, 
{name: "SwamplandsDeck", deck: getSwamplandsDeck}, {name: "IcelandsDeck", deck: getIcelandsDeck}, {name: "SandylandsDeck", deck: getSandylandsDeck}];
function getSandylandsDeck(){
  return new Deck("Sandyland Deck", [Sandyland, Sandyland, Sandyland, Sandyland], [get("Sandsnake"), get("Beach Mummy"), get("The Mariachi"), get("SandWitch"), 
  get("Sand Eyebat"), get("Green Cactiball"), get("Sandhorn Devil"), get("Wall of Sand"), get("Lost Golem"), get("Sand Knight"), get("Fummy"), get("Sand Angel"), 
  get("Peach Djinni"), get("Ms. Mummy"), get("Sandsnake"), get("Beach Mummy"), get("The Mariachi"), get("SandWitch"), get("Sand Eyebat"), get("Green Cactiball")]);
}

function getIcelandsDeck(){
  return new Deck("Icylands Deck", [Icyland, Icyland, Icyland, Icyland], [get("Cold Soldier"), get("Abdominal Snowman"), get("Icemeister"), get("Sprucy Lucy"), 
  get("Reign Deer"), get("Frost Dragon"), get("Slay Rider"), get("Frozen Fish"), get("Snow Angel"), get("Emperor Penguin"), get("Snow Bunny"), get("Snow Dog"), 
  get("Boarder Collie"), get("Cold Soldier"), get("Adbominal Snowman"), get("Icemeister"), get("Reign Deer"), get("Frost Dragon"), get("Slay Rider"), 
  get("Frozen Fish")])
}

function getSwamplandsDeck(){
  return new Deck("Swmaplands Deck", [Swampland, Swampland, Candyland, Candyland], [get("Bog Ban-She Angel"), get("Ban-She Princess"), get("Fly Swatter"), 
  get("Bog Bum"), get("Unicyclops"), get("Man-Witch"), get("Ban-She Queen"), get("Bog Frog Bomb"), get("Furious Rooster"), get("Music Mallard"), get("Cottonpult"), 
  get("Dr. Stuffenstein"), get("Furious Hen"), get("Papercut Tiger"), get("Furious Chick"), get("Ban-She Princess"), get("Fly Swatter"), get("Bog Bum"), 
  get("Unicyclops"), get("Man-Witch")]);
}

function getHillsDeck(){
  return new Deck("Hills Deck", [Hills, Hills, Hills, Hills], [get("Punk Cat"), get("Cool Dog"), get("Embarrassing Bard"), get("Ancient Scholar"), get("Dragon Claw"), 
  get("Woadic Chief"), get("Struzann Jinn"), get("Psionic Architect"), get("X-Large Spirit Soldier"), get("Heavenly Gazer"), get("Uni-Knight"), 
  get("Woadic Marauder"), get("The Pig"), get("Punk Cat"), get("Cool Dog"), get("Ancient Scholar"), get("Dragon Claw"), get("Struzann Jinn"), 
  get("Psionic Architect"), get("X-Large Spirit Soldier")]);
}

function getCornfieldDeck(){
  return new Deck("Cornfield Deck", [Cornfield, Cornfield, Cornfield, Cornfield], [get("Husker Worm"), get("Cornataur"), get("Legion of Earlings"), 
  get("Field Stalker"), get("Patchy the Pumpkin"), get("Corn Ronin"), get("Wall of Ears"), get("Travelin' Farmer"), get("Husker Knight"), get("Archer Dan"), get("Corn Dog"), 
  get("Corn Lord"), get("Field Reaper"), get("Phyllis"), get("Evil Eye"), get("Big Foot"), get("Husker Worm"), get("Corntaur"), get("Legion of Earlings"), 
  get("Field Stalker")]);
}