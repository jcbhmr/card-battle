//import { Abilities, Creatures, Buildings, Spells, Effects } from "./singletons";

//============================================================== Enums ==============================================================
export const TurnPhases = {
  Play: 0,
  Action: 1,
  Battle: 2,
};

const CardLocations = {
  Deck: "deck",
  Hand: "hand",
  Discard: "discardPile",
};

export const LandscapeType = {
  // Landscape type: associated hex color code for front to render
  NULL: "#94949c",
  Swamp: "#38541b",
  Desert: "#b3b179",
  Hills: "#468546",
  Candylands: "#d192cc",
};

export const EffectUpdateType = {
  EnterPlay: 0,
  StartOfTurn: 1,
  Active: 2,
  Discard: 3,
};

export const EffectDuration = {
  Instant: 0,
  Turn: 1,
  Round: 2,
};

const CardType = {
  Creature: 0,
  Building: 1,
  Spell: 2,
  Landscape: 3,
};

export const LaneTargeter = {
  None: 0,
  SingleLane: 1,
  AdjacentLanes: 2,
  AllLanes: 3,
};

export const PlayerTargeter = {
  Self: 0,
  Opponent: 1,
};

export const TargetType = {
  Creature: 0,
  Building: 1,
  Landscape: 2,
  Player: 3,
  DiscardPile: 4,
  EffectHolder: 5,
  BoardPos: 6,
};

//============================================================== Util ==============================================================
export class Targeter {
  playerTargeter: number;
  laneTargeter: number;
  needsPlayerSelection: boolean;
  numberPlayerSelections: number;
  selectionPredicate: Function | null;
  targetType: number;

  constructor(
    playerTargeter: number,
    laneTargeter: number,
    needsPlayerSelection: boolean,
    numberPlayerSelections: number,
    selectionPredicate: Function | null,
    targetType: number,
  ) {
    this.playerTargeter = playerTargeter;
    this.laneTargeter = laneTargeter;
    this.needsPlayerSelection = needsPlayerSelection;
    this.numberPlayerSelections = numberPlayerSelections;
    this.selectionPredicate = selectionPredicate;
    this.targetType = targetType;
  }

  //Selection Predicates
  static ANY_PREDICATE = (_lane: BoardPos) => true; //Note that the lane should be a BoardPos instance, and the predicate should be checked for each valid BoardPos instance.

  //Targeters
  static PLAY_CREATURE_TARGETER = new Targeter(
    PlayerTargeter.Self,
    LaneTargeter.SingleLane,
    true,
    1,
    (lane: BoardPos) => {
      return lane.creature == Creature.NULL;
    },
    TargetType.BoardPos,
  );

  static PLAY_BUILDING_TARGETER = new Targeter(
    PlayerTargeter.Self,
    LaneTargeter.SingleLane,
    true,
    1,
    (lane: BoardPos) => {
      return lane.building == Building.NULL;
    },
    TargetType.BoardPos,
  );

  static PLAY_SPELL_TARGETER = new Targeter(
    PlayerTargeter.Self,
    LaneTargeter.None,
    true,
    1,
    Targeter.ANY_PREDICATE,
    TargetType.BoardPos,
  );

  static PLAY_LANDSCAPE_TARGETER = new Targeter(
    PlayerTargeter.Self,
    LaneTargeter.SingleLane,
    true,
    1,
    (lane: BoardPos) => {
      return lane.landscape == LandscapeType.NULL;
    },
    TargetType.BoardPos,
  );

  private getValidBoardPos(playerId: number): BoardPos[] | null {
    if (
      this.targetType == TargetType.DiscardPile ||
      this.targetType == TargetType.EffectHolder ||
      this.targetType == TargetType.Player
    ) {
      return null;
    }
    var player = playerId;
    if (this.playerTargeter == PlayerTargeter.Opponent) {
      player = playerId + 1 >= Game.getInstance().players.length ? 0 : playerId + 1;
    }

    switch (this.laneTargeter) {
      case LaneTargeter.AllLanes:
        var lanes: BoardPos[] | undefined =
          Game.getInstance().board.getSideByOwnerId(player);
        if (typeof lanes == "undefined") {
          return null;
        } else {
          for (var i = 0; i < lanes.length; i++) {
            var pos: BoardPos = lanes[i];
            var predicate: boolean = this.selectionPredicate?.call(null, pos);
            if (!predicate) {
              lanes.splice(i, 1);
            }
          }
          return lanes;
        }
      case LaneTargeter.AdjacentLanes:
        var lanes: BoardPos[] | undefined =
          Game.getInstance().board.getSideByOwnerId(player);
        if (typeof lanes == "undefined") {
          return null;
        } else {
          for (var i = 0; i < lanes.length; i++) {
            var pos: BoardPos = lanes[i];
            var predicate: boolean = this.selectionPredicate?.call(null, pos);
            if (!predicate) {
              lanes.splice(i, 1);
            }
          }
          return lanes;
        }
      case LaneTargeter.SingleLane:
        var lanes: BoardPos[] | undefined =
          Game.getInstance().board.getSideByOwnerId(player);
        if (typeof lanes == "undefined") {
          return null;
        } else {
          for (var i = 0; i < lanes.length; i++) {
            var pos: BoardPos = lanes[i];
            var predicate: boolean = this.selectionPredicate?.call(null, pos);
            if (!predicate) {
              lanes.splice(i, 1);
            }
          }
          return lanes;
        }
      default:
        return null;
    }
  }

  getValidTargets(playerId: number): BoardPos[] | null {
    var validPos: BoardPos[] | null = this.getValidBoardPos(playerId);
    if (validPos == null) {
      return null;
    } else if (this.targetType == TargetType.BoardPos) {
      return validPos;
    }

    for (var i = 0; i < validPos.length; i++) {
      var pos: BoardPos = validPos[i];
      switch (this.targetType) {
        case TargetType.Building:
          if (pos.building == Building.NULL) {
            validPos.splice(i, 1);
          }
          break;
        case TargetType.Creature:
          if (pos.creature == Creature.NULL) {
            validPos.splice(i, 1);
          }
          break;
        case TargetType.Landscape:
          if (pos.landscape == LandscapeType.NULL) {
            validPos.splice(i, 1);
          }
          break;
      }
    }
    return validPos;
  }

  getBoardPosUsingSelection(
    playerId: number,
    selection: BoardPos | null = null,
  ): BoardPos[] | null {
    var player = playerId;
    if (this.playerTargeter == PlayerTargeter.Opponent) {
      player = playerId + 1 >= Game.getInstance().players.length ? 0 : playerId + 1;
    }

    switch (this.laneTargeter) {
      case LaneTargeter.AllLanes:
        var lanes: BoardPos[] | undefined =
          Game.getInstance().board.getSideByOwnerId(player);
        return typeof lanes == "undefined" ? null : lanes;
      case LaneTargeter.AdjacentLanes:
        if (selection == null) {
          return null;
        }

        return Game.getInstance().board.getAllAdjacentBoardPos(player, selection);
      case LaneTargeter.SingleLane:
        if (selection != null) {
          return null;
        } else {
          return selection;
        }
      default:
        return null;
    }
  }
}

//============================================================== Events ==============================================================
export class GetTargetEvent extends Event {
  execute: Function;
  targeter: Targeter | null;
  executorId: number

  constructor(
    name: string,
    execute: Function,
    executorId: number,
    targeter: Targeter | null = null
  ) {
    super(name);
    this.execute = execute;
    this.targeter = targeter;
    this.executorId = executorId;
  }

  static NULL_EVENT = (_pos: BoardPos) => {
    return false;
  };
}

//============================================================== Player ==============================================================
export class Player {
  id: number;
  username: string;
  discardPile: Card[];
  deck: Card[];
  hand: Card[];
  hp: number;
  actions: number;
  cardDiscount: number;

  constructor(id: number) {
    this.id = id;
    this.username = "";
    this.discardPile = [];
    this.deck = [];
    this.hand = [];
    this.hp = 25;
    this.actions = 2;
    this.cardDiscount = 0;
  }

  discard(index: number = -1) {
    if (index == -1) {
      index = Math.floor(Math.random() * this.hand.length);
    }

    this.discardPile.push(this.hand[index]);
    this.hand.splice(index, 1);
  }

  drawCard(amount: number) {
    for (let i = 0; i < amount; i++) {
      if (this.deck.length >= 0) {
        const drawnCard = this.deck.pop();
        if (drawnCard) {
          drawnCard.returnToHand()
          this.hand.push(drawnCard);
        }
      }
    }
  }
}

//============================================================== Abilities and Effects ==============================================================
export class Effect {
  // Builder Class
  attackBonus: (_pos: BoardPos) => number;
  defenseBonus: (_pos: BoardPos) => number;
  healthBonus: (_pos: BoardPos) => number;
  actionBonus: (_pos: BoardPos) => number;
  cardDiscount: (_pos: BoardPos) => number;
  damage: (_pos: BoardPos) => number;
  playerDamage: (_pos: BoardPos) => number;
  conditionsApplied: (_pos: BoardPos) => Effect[];
  conditionsRemoved: (_pos: BoardPos) => Effect[];
  disables: boolean;
  readiesBeforeBattle: boolean;
  cardsDrawn: (_pos: BoardPos) => number;
  cardsRevealed: (_pos: BoardPos) => number;
  playablePredicate: Function | null;
  effectDuration: number;
  effectUpdateType: number;

  constructor() {
    this.attackBonus = (_pos: BoardPos) => {
      return 0;
    };
    this.defenseBonus = (_pos: BoardPos) => {
      return 0;
    };
    this.healthBonus = (_pos: BoardPos) => {
      return 0;
    };
    this.actionBonus = (_pos: BoardPos) => {
      return 0;
    };
    this.cardDiscount = (_pos: BoardPos) => {
      return 0;
    };
    this.damage = (_pos: BoardPos) => {
      return 0;
    };
    //playerDamage maybe should be replaced with the andAbility member in Ability
    this.playerDamage = (_pos: BoardPos) => {
      return 0;
    }; //Used for player hp in the case of things like "deal x damage to a creature, then heal for that amount" cases. used ONLY for damaging/healing players.
    this.conditionsApplied = (_pos: BoardPos) => {
      return [];
    };
    this.conditionsRemoved = (_pos: BoardPos) => {
      return [];
    };
    this.disables = false;
    this.readiesBeforeBattle = false;
    this.cardsDrawn = (_pos: BoardPos) => {
      return 0;
    };
    this.cardsRevealed = (_pos: BoardPos) => {
      return 0;
    };
    this.playablePredicate = null;
    this.effectDuration = EffectDuration.Instant;
    this.effectUpdateType = EffectUpdateType.EnterPlay;
  }

  setAttackBonus(bonus: (_pos: BoardPos) => number) {
    this.attackBonus = bonus;
    return this;
  }

  setDefenseBonus(bonus: (_pos: BoardPos) => number) {
    this.defenseBonus = bonus;
    return this;
  }

  setHealthBonus(bonus: (_pos: BoardPos) => number) {
    this.healthBonus = bonus;
    return this;
  }

  setActionBonus(bonus: (_pos: BoardPos) => number) {
    this.actionBonus = bonus;
    return this;
  }

  setCardDiscount(bonus: (_pos: BoardPos) => number) {
    this.cardDiscount = bonus;
    return this;
  }

  setDamage(damage: (_pos: BoardPos) => number) {
    this.damage = damage;
    return this;
  }

  setPlayerDamage(damage: (_pos: BoardPos) => number) {
    this.playerDamage = damage;
    return this;
  }

  setConditionsApplied(conditions: (_pos: BoardPos) => Effect[]) {
    this.conditionsApplied = conditions;
    return this;
  }

  setConditionsRemoved(conditions: (_pos: BoardPos) => Effect[]) {
    this.conditionsRemoved = conditions;
    return this;
  }

  setDisables() {
    this.disables = true;
    return this;
  }

  setReadiesBeforeBattle() {
    this.readiesBeforeBattle = true;
    return this;
  }

  setCardsDrawn(cards: (_pos: BoardPos) => number) {
    this.cardsDrawn = cards;
    return this;
  }

  setCardsRevealed(cards: (_pos: BoardPos) => number) {
    this.cardsRevealed = cards;
    return this;
  }

  setPlayablePredicate(predicate: Function | null) {
    this.playablePredicate = predicate;
    return this;
  }

  setEffectDuration(duration: number) {
    this.effectDuration = duration;
    return this;
  }

  setEffectUpdateType(updateType: number) {
    this.effectUpdateType = updateType;
    return this;
  }

  //Effect Constants
  static NULL: Effect = new Effect();
  static FROZEN: Effect = new Effect()
    .setDisables()
    .setPlayablePredicate(
      (lane: BoardPos) =>
        lane.activeEffects.length > 0 && lane.hasEffect(Effect.FROZEN),
    );
}

export class Ability {
  description: string;
  targeter: Targeter;
  effect: Effect;
  healthCost: number;
  orAbility: Ability | null;
  andAbility: Ability | null;
  targetEventFunc: Function | null;

  constructor(
    desc: string,
    targeter: Targeter,
    effect: Effect,
    healthCost: number,
    orAbility: Ability | null,
    andAbility: Ability | null,
    targetEventFunc: Function | null = null,
  ) {
    this.description = desc;
    this.targeter = targeter;
    this.effect = effect;
    this.healthCost = healthCost;
    this.targetEventFunc = targetEventFunc;

    //Just a check to make sure that no orAbility or andAbility is actually assigned null but uses the null ability instead
    if (orAbility == null) {
      this.orAbility = Ability.NULL;
    } else {
      this.orAbility = orAbility;
    }
    if (andAbility == null) {
      this.andAbility = Ability.NULL;
    } else {
      this.andAbility = andAbility;
    }

  }

  static addGetAbilityTargetEventListener(
    eventCallback: EventListenerOrEventListenerObject,
  ) {
    Game.getInstance().addEventListener("getTargetForAbility", eventCallback);
  }

  static addGetAbilityDiscardPileTargetEventListener(
    eventCallback: EventListenerOrEventListenerObject,
  ) {
    Game.getInstance().addEventListener("getTargetDiscardPileForAbility", eventCallback);
  }

  static addGetAbilityEffectHolderTargetEventListener(
    eventCallback: EventListenerOrEventListenerObject,
  ) {
    Game.getInstance().addEventListener("getTargetEffectHolderForAbility", eventCallback);
  }

  //Not sure about dispatching instanced events through a static event target, will this work?
  getAbilityTarget(playerId: number) {
    if(!this.targeter.needsPlayerSelection || this.targeter.numberPlayerSelections == 0 || this.targetEventFunc == null) {
      return false;
    }

    return Game.getInstance().dispatchEvent(new GetTargetEvent(
      "getTargetForAbility",
      this.targetEventFunc,
      playerId,
      this.targeter
    ));
    
  }

  activate(card: Card, playerId: number): boolean {
    if (this.targeter.needsPlayerSelection) {
      if(this.getAbilityTarget(playerId)) {
        card.setIsReady(false);
        card.displayCard(); //I feel like displayCards() should be in Game and should be static?
        return true;
      }
    } else {
      var targets: BoardPos[] | null = this.targeter.getValidTargets(playerId);
      if(targets != null) {
        for(var i = 0; i < targets?.length; i++) {
          if(this.targeter.targetType == TargetType.Creature) {
            targets[i].creature.addEffect(this.effect);
          }else if(this.targeter.targetType == TargetType.Building) {
            targets[i].building.addEffect(this.effect);
          }else if(this.targeter.targetType == TargetType.Landscape) {
            targets[i].addEffect(this.effect);
          }
        }
        if(this.healthCost > 0) {
          Game.getInstance().getPlayerById(playerId).hp -= this.healthCost;
        }
        return true;
      }
    }
    return false;
  }

  // const TargetType = {
  //  Creature: 0,
  //  Building: 1,
  //  Landscape: 2,
  //  Player: 3,
  //  DiscardPile: 4,
  //  EffectHolder: 5,
  //  BoardPos: 6
  // }
  // apply(target: any, playerId: number) {
  //   if (target instanceof Card) {
  //     this.applyCard(target, playerId);
  //   } else if (target instanceof Player) {
  //     // this.applyPlayer(target); //TODO
  //   }
  //   // else if(target instanceof DiscardPile) { //How to handle this case for TargetType?

  //   // }
  //   else if (target instanceof BoardPos) {
  //     // this.applyBoard(target); //TODO
  //   }
  // }

  // applyCard(target: Card, playerId: number) {
  //   target.addEffect(this.effect);
  //   if (this.healthCost != 0) {
  //     Game.getInstance().getPlayerById(playerId).hp -= this.healthCost;
  //   }
  // }

  // applyPlayer(target: Player, playerId: number) {
  //   target.addEffect(this.effect);
  //   if (this.healthCost != 0) {
  //     Game.getInstance().getPlayerById(playerId).hp -= this.healthCost;
  //   }
  // }

  //Ability Constants
  
  static NULL = new Ability(
        "Null",
        new Targeter(
          PlayerTargeter.Self,
          LaneTargeter.None,
          false,
          0,
          Targeter.ANY_PREDICATE,
          TargetType.Player,
        ),
        Effect.NULL,
        0,
        null,
        null,
      );
    
      //Note that the predicate here is useless and is here for syntax. This should be checked when looking at the targers for lane, player, and type.
      //A useful predicate would be something like (lane) => lane.creature.defense > 2 or (lane) => lane.creature.hasEffect == Effects.FROZEN
      static DAMAGE_ALL_1 = new Ability(
        "Deal 1 damage to every creature in every lane.",
        new Targeter(
          PlayerTargeter.Opponent,
          LaneTargeter.AllLanes,
          false,
          0,
          (lane: BoardPos) => lane.creature != Creature.NULL,
          TargetType.Creature,
        ),
        new Effect()
          .setDamage(() => {
            return 1;
          })
          .setEffectDuration(EffectDuration.Instant)
          .setEffectUpdateType(EffectUpdateType.EnterPlay),
        0,
        Ability.NULL,
        Ability.NULL
      );

      static DAMAGE_CREATURE_1 = new Ability(
        "Deal 1 damage to any creature in any lane.",
        new Targeter(
          PlayerTargeter.Opponent,
          LaneTargeter.SingleLane,
          true,
          1,
          (lane: BoardPos) => lane.creature != Creature.NULL,
          TargetType.Creature,
        ),
        new Effect()
          .setDamage(() => {
            return 1;
          })
          .setEffectDuration(EffectDuration.Instant)
          .setEffectUpdateType(EffectUpdateType.EnterPlay),
        0,
        Ability.NULL,
        Ability.NULL,
        (card: Creature, playerId: number) => {
          card.addEffect(this.DAMAGE_CREATURE_1.effect);
          if(this.DAMAGE_CREATURE_1.healthCost > 0) {
            Game.getInstance().getPlayerById(playerId).hp -= this.DAMAGE_CREATURE_1.healthCost;
          }
        },
      );
}

//============================================================== Board ==============================================================
export class BoardPos {
  static boardIdCounter = 0;
  posId: number;
  ownerId: number;
  creature: Creature;
  building: Building;
  landscape: string;
  activeEffects: Effect[];

  constructor(ownerId: number) {
    this.posId = BoardPos.boardIdCounter++;
    this.ownerId = ownerId;
    this.creature = Creature.NULL;
    this.building = Building.NULL;
    this.landscape = LandscapeType.NULL;
    this.activeEffects = []; // effectively used as active landscape effects
  }

  setCreature(card: Creature) {
    if (this.creature == Creature.NULL) {
      this.creature = card;
      return true;
    }
    return false;
  }

  removeCreature() {
    this.creature = Creature.NULL;
    return true;
  }

  setBuilding(card: Building) {
    if (this.building == Building.NULL) {
      this.building = card;
      return true;
    }
    return false;
  }

  removeBuilding() {
    this.building = Building.NULL;
    return true;
  }

  setLandscape(card: Landscape) {
    if (this.landscape == LandscapeType.NULL) {
      this.landscape = card.landscapeType;
      return true;
    }
    return false;
  }

  removeLandscape() {
    this.landscape = LandscapeType.NULL;
    return true;
  }

  addEffect(effect: Effect) {
    this.activeEffects.push(effect);
    if(this.creature != Creature.NULL) {
      this.creature.attack += effect.attackBonus.call(null, this);
      this.creature.defense -= effect.damage.call(null, this);
      this.creature.defense += effect.defenseBonus.call(null, this);
      this.creature.setIsReady(!effect.disables);
    }
    if(this.building != Building.NULL) {
      this.building.setIsReady(!effect.disables);
    }

    effect.conditionsApplied.call(null, this).map((effect: Effect) => {this.addEffect(effect)});
    effect.conditionsApplied.call(null, this).map((effect: Effect) => {this.removeEffect(effect)});
    
    //We have absolutely no way to reveal cards for effect.cardsRevealed at the moment, will probably be removed.
    Game.getInstance().getPlayerById(this.ownerId).actions += effect.actionBonus.call(null, this);
    Game.getInstance().getPlayerById(this.ownerId).cardDiscount += effect.cardDiscount.call(null, this);
    Game.getInstance().getPlayerById(this.ownerId).drawCard(effect.cardsDrawn.call(null, this));
  }

  removeEffect(effect: Effect) {
    if(effect == Effect.NULL) {
      return false;
    }

    if(this.hasEffect(effect)) {
      for(var i = 0; i < this.activeEffects.length; i++) {
        if(this.activeEffects[i] == effect) {
          this.activeEffects[i] == Effect.NULL;
        }
      }
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
}

export class SidedBoard {
  lanes: Map<number, BoardPos[]>;

  constructor() {
    this.lanes = new Map();
  }

  addPlayer(playerId: number) {
    this.lanes.set(playerId, [
      new BoardPos(playerId),
      new BoardPos(playerId),
      new BoardPos(playerId),
      new BoardPos(playerId),
    ]);
  }

  getSideByOwnerId(ownerId: number): BoardPos[] | undefined {
    return this.lanes.get(ownerId);
  }

  getBoardPosByOwnerId(ownerId: number, boardPos: number): BoardPos | null {
    var lane = this.getSideByOwnerId(ownerId);
    if (typeof lane != "undefined") {
      return lane[boardPos];
    } else {
      return null;
    }
  }

  getAllAdjacentBoardPos(
    ownerId: number,
    boardPos: BoardPos,
  ): BoardPos[] | null {
    var side: BoardPos[] | undefined = this.getSideByOwnerId(ownerId);
    var adjacent: BoardPos[] = [];
    if (side != undefined) {
      for (var i = 0; i < side.length; i++) {
        if (side[i].posId == boardPos.posId) {
          if (i + 1 < side.length && i + 1 > 0) {
            adjacent.push(side[i + 1]);
          }
          if (i - 1 < side.length && i - 0 > 0) {
            adjacent.push(side[i - 1]);
          }
          adjacent.push(side[i]);
          return adjacent;
        }
      }
    }
    return null;
  }
}

//============================================================== Cards ==============================================================
export class Card {
  name: string;
  flavorText: string;
  cardType: number;
  landscapeType: string;
  targetEventFunc: Function | null;
  turnPlayed: number;
  ability: Ability;
  ownerId: number | null = null;
  currentOwnerId: number | null = null;
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
    targetEventFunc: Function | null = null
  ) {
    this.name = name;
    this.flavorText = flavorText;
    this.cardType = cardType;
    this.cost = cost;
    this.landscapeType = landscapeType;
    this.turnPlayed = Game.getInstance().currentTurn;
    this.ability = ability;
    this.isReady = true;
    this.targetEventFunc = targetEventFunc;
  }
  //
  getCost(){
    return this.cost;
  }
  setCost(cost: number){
    this.cost = cost;
    this.displayCard();
  }

  getIsReady(){
    return this.isReady;
  }
  setIsReady(isReady: boolean){
    this.isReady = isReady;
    this.displayCard();
  }

  getLocation(){
    return this.location;
  }
  //
  static addCardChangedEventListener(
    eventCallback: EventListenerOrEventListenerObject,
  ) {
    Game.getInstance().addEventListener("displayCards", eventCallback);
  }

  setOwnerId(ownerId: number) {
    this.ownerId = ownerId;
  }

  wasPlayedThisTurn() {
    return Game.getInstance().currentTurn == this.turnPlayed;
  }

  play(_target: any, _id: number | null = null) {
    this.displayCard();
    return false;
  }

  death() {
    if (this.ownerId != null) {
      Game.getInstance().getPlayerById(this.ownerId).discardPile.push(this);
      // this.moveCard(CardLocations.Discard);
    }
  }

  activateAbility() {
    if(this.currentOwnerId != null) {
      this.ability.activate(this, this.currentOwnerId);
    }
  }

  addEffect(effect: Effect) {
    this.activeEffects.push(effect);
    this.displayCard();
  }

  removeEffect(effect: Effect) {
    if(effect == Effect.NULL) {
      return false;
    }

    if(this.hasEffect(effect)) {
      for(var i = 0; i < this.activeEffects.length; i++) {
        if(this.activeEffects[i] == effect) {
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
    targetEventFunc: Function | null = null
  ) {
    super(name, flavorText, CardType.Creature, cost, landscapeType, ability);
    this.attack = attack;
    this.defense = defense;
    this.maxDefense = defense; // Used when healing a creature so it doesn't overheal, and cards that say things like "if a creature has exactly x damage."
    this.targetEventFunc = targetEventFunc;
  }

  static addGetTargetEventListener(
    eventCallback: EventListenerOrEventListenerObject,
  ): void {
    Game.getInstance().addEventListener("getTargetForCreature", eventCallback);
  }

  override play(pos: BoardPos) {
    if (pos.creature == Creature.NULL) {
      return pos.setCreature(this);
    }
    return false;
  }

  override addEffect(effect: Effect) {
    super.addEffect(effect);
    var loc: string | BoardPos = this.getLocation();
    if(loc instanceof BoardPos) {
      this.attack += effect.attackBonus.call(null, loc);
      this.defense -= effect.damage.call(null, loc);
      this.defense += effect.defenseBonus.call(null, loc);
      this.setIsReady(effect.disables);

      effect.conditionsApplied.call(null, loc).map((effect: Effect) => {this.addEffect(effect)});
      effect.conditionsApplied.call(null, loc).map((effect: Effect) => {this.removeEffect(effect)});
    
      //We have absolutely no way to reveal cards for effect.cardsRevealed at the moment, will probably be removed.
      if(this.currentOwnerId != null) {
        Game.getInstance().getPlayerById(this.currentOwnerId).actions += effect.actionBonus.call(null, loc);
        Game.getInstance().getPlayerById(this.currentOwnerId).cardDiscount += effect.cardDiscount.call(null, loc);
        Game.getInstance().getPlayerById(this.currentOwnerId).drawCard(effect.cardsDrawn.call(null, loc));
      }
    }
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
    
  static DARK_ANGEL = new Creature(
    "Dark Angel",
    "",
    1,
    LandscapeType.Swamp,
    new Ability(
      "+1 Attack for every 5 cards in your discard pile.",
      new Targeter(
        PlayerTargeter.Self,
        LaneTargeter.None,
        false,
        0,
        null,
        TargetType.DiscardPile,
      ),
      new Effect()
        .setAttackBonus((pos: BoardPos) => {
          if (pos.creature != Creature.NULL && pos.creature.currentOwnerId != null) {
              return 1; //Game.getInstance().getPlayerById(pos.creature.currentOwnerId).discardPile.length / 5;
          } else {
            return 0;
          }
        })
        .setEffectDuration(EffectDuration.Round)
        .setEffectUpdateType(EffectUpdateType.Discard),
      0,
      Ability.NULL,
      Ability.NULL,
    ),
    0,
    5,
  );

  Attack(Target:Creature|Player){
    if(Target instanceof Creature){
      Target.defense-=this.attack;
      if(Target.defense<=0){
        Target.death();
      }
       this.defense-=Target.attack;
       if(this.defense<=0){
        this.death();
       }
    }
    else{
      Target.hp-=this.attack;
    }
  }
}

export class Building extends Card {
  constructor(
    name: string,
    flavorText: string,
    cost: number,
    landscapeType: string,
    ability: Ability,
    targetEventFunc: Function | null = null
  ) {
    super(name, flavorText, CardType.Building, cost, landscapeType, ability);
    this.targetEventFunc = targetEventFunc;
  }

  static addGetTargetEventListener(
    eventCallback: EventListenerOrEventListenerObject,
  ) {
    Game.getInstance().addEventListener("getTargetForBuilding", eventCallback);
  }

  override play(pos: BoardPos) {
    if (pos.building == Building.NULL) {
      return pos.setBuilding(this);
    }
    return false;
  }

  override addEffect(effect: Effect) {
    super.addEffect(effect);
    var loc: string | BoardPos = this.getLocation();
    if(loc instanceof BoardPos) {
      this.setIsReady(effect.disables);

      effect.conditionsApplied.call(null, loc).map((effect: Effect) => {this.addEffect(effect)});
      effect.conditionsApplied.call(null, loc).map((effect: Effect) => {this.removeEffect(effect)});
    
      //We have absolutely no way to reveal cards for effect.cardsRevealed at the moment, will probably be removed.
      if(this.currentOwnerId != null) {
        Game.getInstance().getPlayerById(this.currentOwnerId).actions += effect.actionBonus.call(null, loc);
        Game.getInstance().getPlayerById(this.currentOwnerId).cardDiscount += effect.cardDiscount.call(null, loc);
        Game.getInstance().getPlayerById(this.currentOwnerId).drawCard(effect.cardsDrawn.call(null, loc));
      }
    }
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
    targetEventFunc: Function | null = null
  ) {
    super(name, flavorText, CardType.Spell, cost, landscapeType, ability);
    this.targetEventFunc = targetEventFunc;
  }

  static addGetTargetEventListener(
    eventCallback: EventListenerOrEventListenerObject,
  ) {
    Game.getInstance().addEventListener("getTargetForSpell", eventCallback);
  }

  override play(pos: BoardPos) {
    //TODO
    return false;
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
  constructor(
    name: string, 
    flavorText: 
    string, 
    landscapeType: string,
    ) {
    super(name, flavorText, CardType.Landscape, 0, landscapeType, Ability.NULL);
    this.targetEventFunc = null;
  }

  static addGetTargetEventListener(
    eventCallback: EventListenerOrEventListenerObject,
  ) {
    Game.getInstance().addEventListener("getTargetForLandscape", eventCallback);
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
    if(loc instanceof BoardPos) {
      this.setIsReady(effect.disables);

      effect.conditionsApplied.call(null, loc).map((effect: Effect) => {this.addEffect(effect)});
      effect.conditionsApplied.call(null, loc).map((effect: Effect) => {this.removeEffect(effect)});
    
      //We have absolutely no way to reveal cards for effect.cardsRevealed at the moment, will probably be removed.
      if(this.currentOwnerId != null) {
        Game.getInstance().getPlayerById(this.currentOwnerId).actions += effect.actionBonus.call(null, loc);
        Game.getInstance().getPlayerById(this.currentOwnerId).cardDiscount += effect.cardDiscount.call(null, loc);
        Game.getInstance().getPlayerById(this.currentOwnerId).drawCard(effect.cardsDrawn.call(null, loc));
      }
    }
  }
}

//============================================================== Game ==============================================================
export class Game extends EventTarget {
  players: Player[];
  board: SidedBoard;
  currentTurn: number;
  turnTimer: number;
  currentPlayer: Player;
  turnPhase: number;

  constructor() {
    super();
    this.players = [new Player(0), new Player(1)];
    this.board = new SidedBoard();
    this.board.addPlayer(this.players[0].id);
    this.board.addPlayer(this.players[1].id);
    this.currentTurn = 0;
    this.currentPlayer = this.players[0];
    this.turnTimer = 90;
    this.turnPhase = TurnPhases.Play;
  }

  // static instance = new Game(); // This throws an error because the full Game class isn't parsed at the time of Game creation.

  // static getInstance(): Game {
  //   return Game.instance;
  // }

  addEventListener(
    event: string,
    eventCallback: EventListenerOrEventListenerObject,
  ) {
    this.addEventListener(event, eventCallback);
  }

  getPlayerById(playerId: number) {
    return this.players[playerId];
  }

  enterNextPhase() {
    this.turnPhase++;
    if (this.turnPhase > TurnPhases.Battle) {
      this.turnPhase = TurnPhases.Play;
      this.switchTurns(this.currentPlayer.id);
    }
  }

  switchTurns(currentPlayerId: number) {
    if (currentPlayerId + 1 > this.players.length) {
      this.currentPlayer = this.players[0];
    } else {
      this.currentPlayer = this.players[currentPlayerId + 1];
    }
    this.resetCards(this.currentPlayer.id);
  }

  resetCards(playerId: number) {
    this.board.getSideByOwnerId(playerId)?.map((boardPos) => {
      boardPos.creature.setIsReady(true);
      boardPos.building.setIsReady(true);
    });
  }

  playCard(card: Card) {
    if (this.turnPhase != TurnPhases.Play) {
      return;
    }
  }
}
