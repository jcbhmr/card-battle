import { Game, BoardPos, CardType, Player, LandscapeType } from "../model.ts";
import { DisplayCardEvent } from "./event.ts";

export const GetCardTargetEvent: string = "getCardTarget";

const CardLocations = {
  Deck: "deck",
  Hand: "hand",
  Discard: "discardPile",
};

//============================================================== Cards ==============================================================
export class Card {
  name: string;
  flavorText: string;
  cardType: number;
  landscapeType: string;
  turnPlayed: number;
  ownerId: number | null = null;
  currentOwnerId: number | null = null;
  imageURL: string = "";
  private cost: number;
  private isReady: boolean;
  private location: BoardPos | string = CardLocations.Deck;

  constructor(
    name: string,
    flavorText: string,
    cardType: number,
    cost: number,
    landscapeType: string,
  ) {
    this.name = name;
    this.flavorText = flavorText;
    this.cardType = cardType;
    this.cost = cost;
    this.landscapeType = landscapeType;
    this.turnPlayed = Game.getInstance().currentTurn;
    this.isReady = true;
  }

  setImageUrl(URL: string): Card {
    this.imageURL = URL;
    return this;
  }

  getCost() {
    return this.cost;
  }

  setCost(cost: number) {
    this.cost = cost;
    this.displayCard();
  }

  getIsReady() {
    return this.isReady;
  }

  setIsReady(isReady: boolean) {
    this.isReady = isReady;
    this.displayCard();
  }

  getLocation() {
    return this.location;
  }

  static addCardChangedEventListener(
    eventCallback: EventListenerOrEventListenerObject,
  ) {
    Game.getInstance().addEventListener("displayCards", eventCallback);
  }

  static addGetCardTargetEventListener(
    eventCallback: EventListenerOrEventListenerObject,
  ) {
    Game.getInstance().addEventListener(GetCardTargetEvent, eventCallback);
  }

  setOwnerId(ownerId: number) {
    this.ownerId = ownerId;
  }

  wasPlayedThisTurn() {
    return Game.getInstance().currentTurn == this.turnPlayed;
  }

  play(_target: BoardPos, _playerId: number) {
    console.log("Calling play in class Card");
    this.displayCard();
    return false;
  }

  death() {
    if (this.ownerId != null) {
      Game.getInstance().getPlayerById(this.ownerId).discardPile.push(this);
      this.moveCard(CardLocations.Discard);
    }
  }

  returnToHand() {
    if (this.ownerId != null) {
      Game.getInstance().getPlayerById(this.ownerId).hand.push(this);
      this.moveCard(CardLocations.Hand);
    }
  }

  moveCard(newLocation: string | BoardPos) {
    //REMOVING CARD
    if (this.location instanceof BoardPos) {
      //Type safe check for removeCreature()
      var type = this.constructor.name;
      switch(type){
        case 'Creature':
          this.location.removeCreature();
          break;
        //case 'Building':
          //this.location.removeBuilding();
          //break;
      }
    } else {
      switch(this.location){
        case CardLocations.Deck:
          if(this.ownerId != null){
            var deck = Game.getInstance().getPlayerById(this.ownerId).deck;
            deck.splice(deck.indexOf(this), 1);
          }
          break;
        case CardLocations.Hand:
          if(this.ownerId != null){
            var hand = Game.getInstance().getPlayerById(this.ownerId).hand;
            hand.splice(hand.indexOf(this), 1);
          }
          break;
        case CardLocations.Discard:
          if(this.ownerId != null){
            var discardPile = Game.getInstance().getPlayerById(this.ownerId).discardPile;
            discardPile.splice(discardPile.indexOf(this), 1);
          }
          break
      }
     
    this.location = newLocation
    //ADDING CARD
    if (this.location instanceof BoardPos) {
      //Type safe check for removeCreature()
      var type = this.constructor.name;
      switch(type){
        case 'Creature':
          this.location.setCreature(this);
          break;
        //case 'Building':
          //this.location.setBuilding(this);
          //break;
      }
    } else {
      switch(this.location){
        case CardLocations.Deck:
          if(this.ownerId != null){
            var deck = Game.getInstance().getPlayerById(this.ownerId).deck;
            deck.push(this);
          }
          break;
        case CardLocations.Hand:
          if(this.ownerId != null){
            var hand = Game.getInstance().getPlayerById(this.ownerId).hand;
            hand.push(this);
          }
          break;
        case CardLocations.Discard:
          if(this.ownerId != null){
            var discardPile = Game.getInstance().getPlayerById(this.ownerId).discardPile;
            discardPile.push(this);
          }
          break;
        }
      }
    }
    this.displayCard();
  }

  displayCard() {
    //Was drawCard, name changed for clarity
    Game.getInstance().dispatchEvent(
      new DisplayCardEvent(),
    );
  }

  clone(): Card {
    return new Card(
      this.name,
      this.flavorText,
      this.cardType,
      this.cost,
      this.landscapeType,
    );
  }

  //Null Card Constant
  static getNull(): Card {
    return new Card("Null", "You shouldn't be seeing this!", 99, 0, LandscapeType.NULL);
  }
}

export class Creature extends Card {
  attack: number;
  defense: number;
  maxDefense: number;

  constructor(
    name: string,
    flavorText: string,
    cost: number,
    landscapeType: string,
    attack: number,
    defense: number,
  ) {
    super(name, flavorText, CardType.Creature, cost, landscapeType);
    this.attack = attack;
    this.defense = defense;
    this.maxDefense = defense; // Used when healing a creature so it doesn't overheal, and cards that say things like "if a creature has exactly x damage."
  }

  Attack(Target: Creature | Player) {
    if (Target instanceof Creature) {
      Target.defense -= this.attack;
      if (Target.defense <= 0) {
        Target.death();
      }
      this.defense -= Target.attack;
      if (this.defense <= 0) {
        this.death();
      }
    } else {
      Target.hp -= this.attack;
    }
  }

  override play(pos: BoardPos, playerId: number) {
    console.log("Playing Creature " + this.name + " at pos " + pos.posId + " on player " + playerId + "'s side of the board");
    if (pos.creature.name == Creature.getNull().name) {
      if(pos.setCreature(this)) {
        Game.getInstance().getPlayerById(playerId).actions -= this.getCost();
        return true;
      }
    }
    return false;
  }

  override clone(): Creature {
    return new Creature(
      this.name,
      this.flavorText,
      this.getCost(),
      this.landscapeType,
      this.attack,
      this.defense,
    );
  }

  //Creature Constants
  static getNull(): Creature {
    return new Creature(
      "Null",
      "You shouldn't be seeing this!",
      0,
      LandscapeType.NULL,
      0,
      0,
    );
  }
}

// By having this class, the front end can render these like they're in your hand when the game starts so you can choose where your landscapes belong
export class Landscape extends Card {
  constructor(name: string, flavorText: string, landscapeType: string) {
    super(name, flavorText, CardType.Landscape, 0, landscapeType);
  }

  static addGetTargetEventListener(
    eventCallback: EventListenerOrEventListenerObject,
    game: Game,
  ) {
    game.addEventListener("getTargetForLandscape", eventCallback);
  }

  override play(pos: BoardPos) {
    console.log("Playing Landscape " + this.name + " at pos " + pos.posId + " on player " + pos.ownerId + "'s side of the board");
    if (pos.landscape == LandscapeType.NULL) {
      return pos.setLandscape(this);
    }
    return false;
  }
}
