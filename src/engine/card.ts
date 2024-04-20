import { Game, BoardPos, CardType, Player, LandscapeType } from "../model.ts";
import { Effect, Ability } from "./ability.ts";

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
  ability: Ability;
  ownerId: number | null = null;
  currentOwnerId: number | null = null;
  imageURL: string = "";
  private cost: number;
  private isReady: boolean;
  private location: BoardPos | string = CardLocations.Deck;
  private activeEffects: Effect[] = [];

  constructor(
    name: string,
    flavorText: string,
    cardType: number,
    cost: number,
    landscapeType: string,
    ability: Ability,
  ) {
    this.name = name;
    this.flavorText = flavorText;
    this.cardType = cardType;
    this.cost = cost;
    this.landscapeType = landscapeType;
    this.turnPlayed = Game.getInstance().currentTurn;
    this.ability = ability;
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
    this.displayCard();
    return false;
  }

  death() {
    if (this.ownerId != null) {
      Game.getInstance().getPlayerById(this.ownerId).discardPile.push(this);
      //this.moveCard(CardLocations.Discard);
    }
  }

  activateAbility() {
    if (this.currentOwnerId != null) {
      this.ability.activate(this);
    }
  }

  addEffect(effect: Effect) {
    this.activeEffects.push(effect);
    this.displayCard();
  }

  removeEffect(effect: Effect) {
    if (effect == Effect.NULL) {
      return false;
    }

    if (this.hasEffect(effect)) {
      for (var i = 0; i < this.activeEffects.length; i++) {
        if (this.activeEffects[i] == effect) {
          this.activeEffects[i] == Effect.NULL;
        }
      }
      this.displayCard();
      return true;
    }
    return false;
  }

  hasEffect(effect: Effect) {
    for (var i = 0; i < this.activeEffects.length; i++) {
      if (this.activeEffects[i] == effect) {
        return true;
      }
    }
    return false;
  }

  returnToHand() {
    if (this.ownerId != null) {
      Game.getInstance().getPlayerById(this.ownerId).hand.push(this);
      // this.moveCard(CardLocations.Hand);
    }
  }

  // moveCard(newLocation: string | BoardPos) {
  //   Game.getInstance().dispatchEvent(
  //     new CustomEvent("removeCard", { detail: this }),
  //   );

  //   //REMOVING CARD
  //   if (this.location instanceof BoardPos) {
  //     //Type safe check for removeCreature()
  //     var type = this.constructor.name;
  //     switch(type){
  //       case 'Creature':
  //         this.location.removeCreature();
  //         break;
  //       case 'Building':
  //         this.location.removeBuilding();
  //         break;
  //     }
  //   } else {
  //     switch(this.location){
  //       case CardLocations.Deck:
  //         if(this.ownerId != null){
  //           var deck = Game.getInstance().getPlayerById(this.ownerId).deck;
  //           deck.splice(deck.indexOf(this), 1);
  //         }
  //         break;
  //       case CardLocations.Hand:
  //         if(this.ownerId != null){
  //           var hand = Game.getInstance().getPlayerById(this.ownerId).hand;
  //           hand.splice(hand.indexOf(this), 1);
  //         }
  //         break;
  //       case CardLocations.Discard:
  //         if(this.ownerId != null){
  //           var discardPile = Game.getInstance().getPlayerById(this.ownerId).discardPile;
  //           discardPile.splice(discardPile.indexOf(this), 1);
  //         }
  //         break
  //     }
  //   }

  //   this.location = newLocation;

  //   //ADDING CARD
  //   if (this.location instanceof BoardPos) {
  //     //Type safe check for removeCreature()
  //     var type = this.constructor.name;
  //     switch(type){
  //       case 'Creature':
  //         this.location.setCreature(this);
  //         break;
  //       case 'Building':
  //         this.location.setBuilding(this);
  //         break;
  //     }
  //   } else {
  //     switch(this.location){
  //       case CardLocations.Deck:
  //         if(this.ownerId != null){
  //           var deck = Game.getInstance().getPlayerById(this.ownerId).deck;
  //           deck.push(this);
  //         }
  //         break;
  //       case CardLocations.Hand:
  //         if(this.ownerId != null){
  //           var hand = Game.getInstance().getPlayerById(this.ownerId).hand;
  //           hand.push(this);
  //         }
  //         break;
  //       case CardLocations.Discard:
  //         if(this.ownerId != null){
  //           var discardPile = Game.getInstance().getPlayerById(this.ownerId).discardPile;
  //           discardPile.push(this);
  //         }
  //         break;
  //     }
  //   }

  //   this.displayCard();
  // }

  displayCard() {
    //Was drawCard, name changed for clarity
    Game.getInstance().dispatchEvent(
      new CustomEvent("displayCard", { detail: this }),
    );
  }

  clone(): Card {
    return new Card(
      this.name,
      this.flavorText,
      this.cardType,
      this.cost,
      this.landscapeType,
      this.ability,
    );
  }

  //Null Card Constant
  static NULL = new Card("Null", "You shouldn't be seeing this!", 99, 0, LandscapeType.NULL, Ability.NULL);
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
    ability: Ability,
    attack: number,
    defense: number,
  ) {
    super(name, flavorText, CardType.Creature, cost, landscapeType, ability);
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
    if (pos.creature == Creature.NULL) {
      if(pos.setCreature(this)) {
        Game.getInstance().getPlayerById(playerId).actions -= this.getCost();
        return true;
      }
    }
    return false;
  }

  override addEffect(effect: Effect) {
    super.addEffect(effect);
    var loc: string | BoardPos = this.getLocation();
    if (loc instanceof BoardPos) {
      this.attack += effect.attackBonus.call(null, loc);
      this.defense -= effect.damage.call(null, loc);
      this.defense += effect.defenseBonus.call(null, loc);
      this.setIsReady(effect.disables);

      effect.conditionsApplied.call(null, loc).map((effect: Effect) => {
        this.addEffect(effect);
      });
      effect.conditionsApplied.call(null, loc).map((effect: Effect) => {
        this.removeEffect(effect);
      });

      //We have absolutely no way to reveal cards for effect.cardsRevealed at the moment, will probably be removed.
      if (this.currentOwnerId != null) {
        Game.getInstance().getPlayerById(this.currentOwnerId).actions +=
          effect.actionBonus.call(null, loc);
        Game.getInstance().getPlayerById(this.currentOwnerId).cardDiscount +=
          effect.cardDiscount.call(null, loc);
        Game.getInstance()
          .getPlayerById(this.currentOwnerId)
          .drawCard(effect.cardsDrawn.call(null, loc));
      }
    }
  }

  override clone(): Creature {
    return new Creature(
      this.name,
      this.flavorText,
      this.getCost(),
      this.landscapeType,
      this.ability,
      this.attack,
      this.defense,
    );
  }

  //Creature Constants
  static NULL = new Creature(
    "Null",
    "You shouldn't be seeing this!",
    0,
    LandscapeType.NULL,
    Ability.NULL,
    0,
    0,
  );
}

export class Building extends Card {
  constructor(
    name: string,
    flavorText: string,
    cost: number,
    landscapeType: string,
    ability: Ability,
  ) {
    super(name, flavorText, CardType.Building, cost, landscapeType, ability);
  }

  override play(pos: BoardPos, playerId: number) {
    if (pos.building == Building.NULL) {
      if(pos.setBuilding(this)) {
        Game.getInstance().getPlayerById(playerId).actions -= this.getCost();
        return true;
      }
    }
    return false;
  }

  override addEffect(effect: Effect) {
    super.addEffect(effect);
    var loc: string | BoardPos = this.getLocation();
    if (loc instanceof BoardPos) {
      this.setIsReady(effect.disables);

      effect.conditionsApplied.call(null, loc).map((effect: Effect) => {
        this.addEffect(effect);
      });
      effect.conditionsApplied.call(null, loc).map((effect: Effect) => {
        this.removeEffect(effect);
      });

      //We have absolutely no way to reveal cards for effect.cardsRevealed at the moment, will probably be removed.
      if (this.currentOwnerId != null) {
        Game.getInstance().getPlayerById(this.currentOwnerId).actions +=
          effect.actionBonus.call(null, loc);
        Game.getInstance().getPlayerById(this.currentOwnerId).cardDiscount +=
          effect.cardDiscount.call(null, loc);
        Game.getInstance()
          .getPlayerById(this.currentOwnerId)
          .drawCard(effect.cardsDrawn.call(null, loc));
      }
    }
  }

  override clone(): Building {
    return new Building(
      this.name,
      this.flavorText,
      this.getCost(),
      this.landscapeType,
      this.ability,
    );
  }

  //Building Constants
  static NULL = new Building(
    "Null",
    "You shouldn't be seeing this!",
    0,
    LandscapeType.NULL,
    Ability.NULL,
  );
}

export class Spell extends Card {
  constructor(
    name: string,
    flavorText: string,
    cost: number,
    landscapeType: string,
    ability: Ability,
  ) {
    super(name, flavorText, CardType.Spell, cost, landscapeType, ability);
  }

  override play(_pos: BoardPos, playerId: number) {
    this.activateAbility();
    Game.getInstance().getPlayerById(playerId).discardPile.push(this)
    Game.getInstance().getPlayerById(playerId).actions -= this.getCost();
    return true;
  }

  override clone(): Spell {
    return new Spell(
      this.name,
      this.flavorText,
      this.getCost(),
      this.landscapeType,
      this.ability,
    );
  }

  //Spell Constants
  static NULL = new Spell(
    "Null",
    "You shouldn't be seeing this!",
    0,
    LandscapeType.NULL,
    Ability.NULL,
  );
}

// By having this class, the front end can render these like they're in your hand when the game starts so you can choose where your landscapes belong
export class Landscape extends Card {
  constructor(name: string, flavorText: string, landscapeType: string) {
    super(name, flavorText, CardType.Landscape, 0, landscapeType, Ability.NULL);
  }

  static addGetTargetEventListener(
    eventCallback: EventListenerOrEventListenerObject,
    game: Game,
  ) {
    game.addEventListener("getTargetForLandscape", eventCallback);
  }

  override play(pos: BoardPos) {
    if (pos.landscape == LandscapeType.NULL) {
      return pos.setLandscape(this);
    }
    return false;
  }

  override addEffect(effect: Effect) {
    super.addEffect(effect);
    var loc: string | BoardPos = this.getLocation();
    if (loc instanceof BoardPos) {
      this.setIsReady(effect.disables);

      effect.conditionsApplied.call(null, loc).map((effect: Effect) => {
        this.addEffect(effect);
      });
      effect.conditionsApplied.call(null, loc).map((effect: Effect) => {
        this.removeEffect(effect);
      });

      //We have absolutely no way to reveal cards for effect.cardsRevealed at the moment, will probably be removed.
      if (this.currentOwnerId != null) {
        Game.getInstance().getPlayerById(this.currentOwnerId).actions +=
          effect.actionBonus.call(null, loc);
        Game.getInstance().getPlayerById(this.currentOwnerId).cardDiscount +=
          effect.cardDiscount.call(null, loc);
        Game.getInstance()
          .getPlayerById(this.currentOwnerId)
          .drawCard(effect.cardsDrawn.call(null, loc));
      }
    }
  }
}
