import { Card, Creature, Building, Spell, Landscape, LandscapeType, Ability, Targeter, PlayerTargeter, LaneTargeter, TargetType, Effect, BoardPos, Game, EffectDuration, EffectUpdateType } from "./model";

var cardMap: Map<string, Card> = new Map<string, Card>();

function put(name: string, card: Card): void {
    cardMap.set(name, card);
}

export function addUrl(name: string, Url: string): void {
    var card: Card | undefined = cardMap.get(name);
    if(typeof(card) == "undefined") {
        return;
    }else {
        put(name, card.setImageUrl(Url));
    }
}

export function get(name: string): Card | null {
    var card: Card | undefined = cardMap.get(name);
    if(typeof(card) == "undefined") {
        return null;
    }else {
        return card.clone();
    }
}

//WRITE CARDS BELOW

//=====================================================================================================================================================
//                                                                  CREATURES
//=====================================================================================================================================================
put("Dark Angel", new Creature(
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
          if (
            pos.creature != Creature.NULL &&
            pos.creature.currentOwnerId != null
          ) {
            return Game.getInstance().getPlayerById(pos.creature.currentOwnerId).discardPile.length / 5;
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
  ));

//=====================================================================================================================================================
//                                                                BUILDINGS
//=====================================================================================================================================================


//=====================================================================================================================================================
//                                                                  SPELLS
//=====================================================================================================================================================


//=====================================================================================================================================================
//                                                                LANDSCAPES
//=====================================================================================================================================================