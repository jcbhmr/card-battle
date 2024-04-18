import { BoardPos, Targeter, Game, Player, TargetType, PlayerTargeter, LaneTargeter } from "../model.ts";
import { Card, Creature } from "./card.ts";
import { GetTargetEvent } from "./event.ts";

export const EffectUpdateType = {
    EnterPlay: 0,
    StartOfTurn: 1,
    Active: 2,
    Discard: 3,
    LeaveBoard: 4
  };
  
  export const EffectDuration = {
    Instant: 0,
    Turn: 1,
    Round: 2,
    Infinite: 3
  };

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
    cardsDiscarded: (_pos: BoardPos) => number;
    cardsRevealed: (_pos: BoardPos) => number;
    playablePredicate: (_pos: BoardPos) => boolean;
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
      this.cardsDiscarded = (_pos: BoardPos) => {
        return 0;
      };
      this.cardsRevealed = (_pos: BoardPos) => {
        return 0;
      };
      this.playablePredicate = (_pos: BoardPos) => {return true};
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
  
    setCardsDiscarded(cards: (_pos: BoardPos) => number) {
      this.cardsDiscarded = cards;
      return this;
    }
  
    setCardsRevealed(cards: (_pos: BoardPos) => number) {
      this.cardsRevealed = cards;
      return this;
    }
  
    setPlayablePredicate(predicate: (_pos: BoardPos) => boolean) {
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
    init: (caller: Card) => boolean;
  
    constructor(
      desc: string,
      targeter: Targeter,
      effect: Effect,
      healthCost: number,
      orAbility: Ability | null,
      andAbility: Ability | null,
      init: (caller: Card) => boolean = Ability.NULL_EVENT_FUNC
    ) {
      this.description = desc;
      this.targeter = targeter;
      this.effect = effect;
      this.healthCost = healthCost;
      this.init = init;
  
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
      Game.getInstance().addEventListener(
        "getTargetDiscardPileForAbility",
        eventCallback,
      );
    }
  
    static addGetAbilityEffectHolderTargetEventListener(
      eventCallback: EventListenerOrEventListenerObject,
    ) {
      Game.getInstance().addEventListener(
        "getTargetEffectHolderForAbility",
        eventCallback,
      );
    }
  
    getAbilityTarget(playerId: number, targetEventFunc: (targets: BoardPos[] | Player, caller: Card) => boolean) {
      if (
        !this.targeter.needsPlayerSelection ||
        this.targeter.numberPlayerSelections == 0 ||
        targetEventFunc == null
      ) {
        return false;
      }
  
      return Game.getInstance().dispatchEvent(
        new GetTargetEvent(
          "getTargetForAbility",
          targetEventFunc,
          playerId,
          this.targeter,
        ),
      );
    }
  
    activate(card: Card): boolean {
        if(card.currentOwnerId != null) {
            if (this.targeter.needsPlayerSelection) {
                if (this.getAbilityTarget(card.currentOwnerId, (targets: BoardPos[] | Player, caller: Card) => {return caller.ability.activateWithTargets(targets, caller);})) {
                    card.setIsReady(false);
                    card.displayCard(); //I feel like displayCards() should be in Game and should be static?
                    return true;
                }
            }else {
                if(this.targeter.targetType == TargetType.EffectHolder) {
                    card.addEffect(this.effect);
                    card.displayCard();
                    return true;
                }else {
                    var targets: BoardPos[] | Player | null = this.targeter.getValidTargets(card.currentOwnerId);
                    if (targets != null) {
                        if(targets instanceof Player) {
                            //I don't think TargetType.DiscardPile should ever be used, effects can't be on a discard pile?
                            if(this.targeter.targetType == TargetType.DiscardPile) {
                                return true;
                            }else if(this.targeter.targetType == TargetType.Player) {
                                targets.addEffect(this.effect);
                            }
                        }else { // Targets is BoardPos[]
                            if (this.targeter.targetType == TargetType.Creature) {
                                targets.map((pos: BoardPos) => {pos.creature.addEffect(this.effect);})
                            } else if (this.targeter.targetType == TargetType.Building) {
                                targets.map((pos: BoardPos) => {pos.building.addEffect(this.effect);})
                            } else if (this.targeter.targetType == TargetType.Landscape) {
                                targets.map((pos: BoardPos) => {pos.addEffect(this.effect);})
                            }
                        }
                        
                        if (this.healthCost > 0) {
                            Game.getInstance().getPlayerById(card.currentOwnerId).hp -= this.healthCost;
                        }
                        card.displayCard();
                        return true;
                    }
                }
            }
        }
        return false;
    }

    activateWithTargets(targets: BoardPos[] | Player, card: Card) {
        if(this.targeter.targetType == TargetType.EffectHolder) {
            card.addEffect(this.effect);
            card.displayCard();
            return true;
        }else {
            if (targets != null) {
                if(targets instanceof Player) {
                    //I don't think TargetType.DiscardPile should ever be used, effects can't be on a discard pile?
                    if(this.targeter.targetType == TargetType.DiscardPile) {
                        return true;
                    }else if(this.targeter.targetType == TargetType.Player) {
                        targets.addEffect(this.effect);
                    }
                }else { // Targets is BoardPos[]
                    if (this.targeter.targetType == TargetType.Creature) {
                        //targets.map((pos: BoardPos) => {pos.creature.addEffect(this.effect);})
                    } else if (this.targeter.targetType == TargetType.Building) {
                        //targets.map((pos: BoardPos) => {pos.building.addEffect(this.effect);})
                    } else if (this.targeter.targetType == TargetType.Landscape) {
                        //targets.map((pos: BoardPos) => {pos.addEffect(this.effect);})
                    }
                }
                
                if (this.healthCost > 0 && card.currentOwnerId != null) {
                    Game.getInstance().getPlayerById(card.currentOwnerId).hp -= this.healthCost;
                }
                card.displayCard();
                return true;
            }
        }
        return false;
    }
  
    static NULL_EVENT_FUNC: (_caller: Card) => boolean = (_caller: Card) => {return true;};
  
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
      Ability.NULL,
    );
  
    static ON_PLAY_DAMAGE_CREATURE_1 = new Ability(
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
      (caller: Card) => {
        caller.ability.activate(caller);
        return true;
      }
    );
  }