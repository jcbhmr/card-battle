// import { Game, BoardPos, Targeter, Effect, Ability, Creature, Building, Spell, PlayerTargeter, LaneTargeter, TargetType, EffectDuration, EffectUpdateType, LandscapeType } from "./model";

// //============================================================== Singletons ==============================================================
// export class Effects {
//   constructor() {}

//   static NULL: Effect = new Effect();
//   static FROZEN: Effect = new Effect()
//     .setDisables()
//     .setPlayablePredicate(
//       (lane: BoardPos) =>
//         lane.activeEffects.length > 0 && lane.hasEffect(Effects.FROZEN),
//     );
// }

// export class Abilities {
//   constructor() {}

//   static NULL = new Ability(
//     "Null",
//     new Targeter(
//       PlayerTargeter.Self,
//       LaneTargeter.None,
//       false,
//       0,
//       Targeter.ANY_PREDICATE,
//       TargetType.Player,
//     ),
//     Effects.NULL,
//     0,
//     null,
//     null,
//   );

//   //Note that the predicate here is useless and is here for syntax. This should be checked when looking at the targers for lane, player, and type.
//   //A useful predicate would be something like (lane) => lane.creature.defense > 2 or (lane) => lane.creature.hasEffect == Effects.FROZEN
//   static DAMAGE_ALL_1 = new Ability(
//     "Deal 1 damage to every creature in every lane.",
//     new Targeter(
//       PlayerTargeter.Opponent,
//       LaneTargeter.AllLanes,
//       false,
//       0,
//       (lane: BoardPos) => lane.creature != Creatures.NULL,
//       TargetType.Creature,
//     ),
//     new Effect()
//       .setDamage(() => {
//         return 1;
//       })
//       .setEffectDuration(EffectDuration.Instant)
//       .setEffectUpdateType(EffectUpdateType.EnterPlay),
//     0,
//     Abilities.NULL,
//     Abilities.NULL
//   );
//   static DAMAGE_CREATURE_1 = new Ability(
//     "Deal 1 damage to any creature in any lane.",
//     new Targeter(
//       PlayerTargeter.Opponent,
//       LaneTargeter.SingleLane,
//       true,
//       1,
//       (lane: BoardPos) => lane.creature != Creatures.NULL,
//       TargetType.Creature,
//     ),
//     new Effect()
//       .setDamage(() => {
//         return 1;
//       })
//       .setEffectDuration(EffectDuration.Instant)
//       .setEffectUpdateType(EffectUpdateType.EnterPlay),
//     0,
//     Abilities.NULL,
//     Abilities.NULL,
//     (card: Creature, playerId: number) => {
//       card.addEffect(this.DAMAGE_CREATURE_1.effect);
//       if(this.DAMAGE_CREATURE_1.healthCost > 0) {
//         Game.instance.getPlayerById(playerId).hp -= this.DAMAGE_CREATURE_1.healthCost;
//       }
//     },
//   );
// }

// export class Creatures {
//   constructor() {}

//   static NULL = new Creature(
//     "Null",
//     "You shouldn't be seeing this!",
//     0,
//     LandscapeType.NULL,
//     Abilities.NULL,
//     0,
//     0,
//   );

//   static DARK_ANGEL = new Creature(
//     "Dark Angel",
//     "",
//     1,
//     LandscapeType.Swamp,
//     new Ability(
//       "+1 Attack for every 5 cards in your discard pile.",
//       new Targeter(
//         PlayerTargeter.Self,
//         LaneTargeter.None,
//         false,
//         0,
//         null,
//         TargetType.DiscardPile,
//       ),
//       new Effect()
//         .setAttackBonus(() => {
//           if (Creatures.DARK_ANGEL.currentOwnerId != null) {
//             return Game.instance.getPlayerById(this.DARK_ANGEL.currentOwnerId).discardPile.length / 5;
//           } else {
//             return 0;
//           }
//         })
//         .setEffectDuration(EffectDuration.Round)
//         .setEffectUpdateType(EffectUpdateType.Discard),
//       0,
//       Abilities.NULL,
//       Abilities.NULL,
//     ),
//     0,
//     5,
//   );
// }

// export class Buildings {
//   constructor() {}

//   static NULL = new Building(
//     "Null",
//     "You shouldn't be seeing this!",
//     0,
//     LandscapeType.NULL,
//     Abilities.NULL,
//   );
// }

// export class Spells {
//   constructor() {}

//   static NULL = new Spell(
//     "Null",
//     "You shouldn't be seeing this!",
//     0,
//     LandscapeType.NULL,
//     Abilities.NULL,
//   );
// }