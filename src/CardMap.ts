import {
  Card,
  Creature,
  Building,
  Spell,
  Landscape,
  LandscapeType,
  Ability,
  Targeter,
  PlayerTargeter,
  LaneTargeter,
  TargetType,
  Effect,
  BoardPos,
  Game,
  EffectDuration,
  EffectUpdateType,
} from "./model";

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

export function get(name: string): Card | null {
  var card: Card | undefined = cardMap.get(name);
  if (typeof card == "undefined") {
    return null;
  } else {
    return card.clone();
  }
}

//WRITE CARDS BELOW

//=====================================================================================================================================================
//                                                                  CREATURES
//=====================================================================================================================================================
put(
  "Dark Angel",
  new Creature(
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
        (_lane: BoardPos) => {
          return true;
        },
        TargetType.DiscardPile,
      ),
      new Effect()
        .setAttackBonus((pos: BoardPos) => {
          if (
            pos.creature != Creature.NULL &&
            pos.creature.currentOwnerId != null
          ) {
            return (
              Game.getInstance().getPlayerById(pos.creature.currentOwnerId)
                .discardPile.length / 5
            );
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
  ),
);

put(
  "Bog Bum",
  new Creature("Bog Bum", "", 1, LandscapeType.Swamp, Ability.NULL, 2, 6, null),
);
put(
  "Music Mallard",
  new Creature(
    "Music Mallard",
    "",
    1,
    LandscapeType.Candylands,
    new Ability(
      "Activate >>> Draw a card. If Music Mallard has 5 or more damage on it, draw another card.",
      new Targeter(
        PlayerTargeter.Self,
        LaneTargeter.None,
        false,
        0,
        Targeter.ANY_PREDICATE,
        TargetType.EffectHolder,
      ),
      new Effect()
        .setCardsDrawn((pos: BoardPos) => {
          if (pos.creature == Creature.NULL) {
            return 0;
          } else {
            if (pos.creature.defense <= pos.creature.maxDefense - 5) {
              return 2;
            } else {
              return 1;
            }
          }
        })
        .setEffectDuration(EffectDuration.Instant)
        .setEffectUpdateType(EffectUpdateType.Active),
      0,
      null,
      null,
      null,
    ),
    0,
    9,
    null,
  ),
);

// Not sure about this one. This card's ability is not really functional right now.
put(
  "Fly Swatter",
  new Creature(
    "Fly Swatter",
    "",
    1,
    LandscapeType.Swamp,
    new Ability(
      "Activate >>> Each opponent discards a card with a cost 0.",
      new Targeter(
        PlayerTargeter.Opponent,
        LaneTargeter.None,
        false,
        0,
        Targeter.ANY_PREDICATE,
        TargetType.Player,
      ),
      new Effect()
        .setCardsDiscarded((_pos: BoardPos) => {
          return 1;
        })
        .setEffectDuration(EffectDuration.Instant)
        .setEffectUpdateType(EffectUpdateType.Active),
      0,
      null,
      null,
      null,
    ),
    1,
    6,
    null,
  ),
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
