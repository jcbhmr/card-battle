import {
  Card,
  Creature,
  Landscape,
  Spell,
  Building,
  GetCardTargetEvent,
} from "./engine/card.ts";
import {
  GetBoardPosTargetEvent,
  GetPlayerTargetEvent,
  PlayCardEvent,
  SwitchTurnsEvent,
  SwitchTurnPhaseEvent,
  DrawCardEvent,
  DiscardCardEvent,
  CardDeathEvent
} from "./engine/event.ts";

//============================================================== Enums ==============================================================
export const TurnPhases = {
  Play: 0,
  Action: 1,
  Battle: 2,
};

export const LandscapeType = {
  // Landscape type: associated hex color code for front to render
  NULL: "#94949c",
  Swamp: "#38541b",
  Desert: "#b3b179",
  Hills: "#468546",
  Candylands: "#d192cc",
};

export const CardType = {
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
  selectionPredicate: (_lane: BoardPos) => boolean;
  targetType: number;

  constructor(
    playerTargeter: number,
    laneTargeter: number,
    needsPlayerSelection: boolean,
    numberPlayerSelections: number,
    selectionPredicate: (_lane: BoardPos) => boolean,
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

  private getValidBoardPos(card: Card, playerId: number): BoardPos[] | null {
    if (
      this.targetType == TargetType.DiscardPile ||
      this.targetType == TargetType.Player
    ) {
      return null;
    }

    if(this.targetType == TargetType.EffectHolder) {
      var loc: BoardPos | string = card.getLocation();
      if(loc instanceof BoardPos) {
        var effectHolderLocation: BoardPos[] = [loc];
        return effectHolderLocation;
      }else {
        return null;
      }
    }

    var player = playerId;
    if (this.playerTargeter == PlayerTargeter.Opponent) {
      player =
        playerId + 1 >= Game.getInstance().players.length ? 0 : playerId + 1;
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

  getValidTargets(card: Card, playerId: number): BoardPos[] | null {
    var validPos: BoardPos[] | null = this.getValidBoardPos(card, playerId);
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
      player =
        playerId + 1 >= Game.getInstance().players.length ? 0 : playerId + 1;
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

        return Game.getInstance().board.getAllAdjacentBoardPos(
          player,
          selection,
        );
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

    var discardIndex: number = this.discardPile.push(this.hand[index]);
    this.hand.splice(index, 1);

    Game.getInstance().dispatchEvent(new DiscardCardEvent(this.discardPile[discardIndex], this.id));
  }

  drawCard(amount: number, useAction: boolean) {
    for (let i = 0; i < amount; i++) {
      if (this.deck.length >= 0) {
        const drawnCard = this.deck.pop();
        if (typeof drawnCard != "undefined") {
          this.hand.push(drawnCard);
          if(useAction) {
            this.actions -= amount;
          }
          Game.getInstance().dispatchEvent(new DrawCardEvent(drawnCard, this.id));
        }
      }
    }
  }
}

//============================================================== Board ==============================================================
export class BoardPos {
  static boardIdCounter = 0;
  posId: number;
  ownerId: number;
  creature: Creature;
  building: Building;
  landscape: string;

  constructor(ownerId: number) {
    this.posId = BoardPos.boardIdCounter++;
    this.ownerId = ownerId;
    this.creature = Creature.NULL;
    this.building = Building.NULL;
    this.landscape = LandscapeType.NULL;
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
}

export class SidedBoard {
  lanes: Map<number, BoardPos[]>;

  constructor() {
    this.lanes = new Map<number, BoardPos[]>();
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
    if (typeof side != "undefined") {
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

//============================================================== Game ==============================================================
export class AbstractGame extends EventTarget {
  currentTurn: number = 0;
  turnTimer: number = 0;
  currentPlayer: Player = new Player(0);
  turnPhase: number = 0;
  players: Player[] = [];
  board: SidedBoard = new SidedBoard();

  constructor() {
    super();
  }

  addEventListener(
    _event: string,
    _eventCallback: EventListenerOrEventListenerObject,
  ) {}

  getPlayerById(_playerId: number) {
    return new Player(0);
  }

  getOtherPlayer(_playerId: number) {
    return new Player(0);
  }

  enterNextPhase() {}

  switchTurns(_currentPlayerId: number) {}

  resetCards(_playerId: number) {}

  playCard(_card: Card, _playerId: number) {}
}

export class Game extends AbstractGame {
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

  static GameInstance: AbstractGame = new AbstractGame();

  static getInstance(): AbstractGame {
    return Game.GameInstance;
  }

  static startNewGame() {
    Game.GameInstance = new Game();
  }

  getBoard() {
    return this.board;
  }

  addEventListener(
    event: string,
    eventCallback: EventListenerOrEventListenerObject,
  ) {
    this.addEventListener(event, eventCallback);
  }

  getPlayerById(playerId: number) {
    return this.players[playerId];
  }

  getOtherPlayer(playerId: number) {
    return this.players[(playerId + 1)%this.players.length];
  }

  enterNextPhase() {
    this.turnPhase++;
    if (this.turnPhase > TurnPhases.Battle) {
      this.turnPhase = TurnPhases.Play;
      this.switchTurns();
    }
    this.dispatchEvent(new SwitchTurnPhaseEvent(this.turnPhase));
  }

  switchTurns() {
    this.currentTurn++;
    this.currentPlayer = this.players[this.currentTurn%this.players.length]
    this.resetCards(this.currentPlayer.id);
    this.dispatchEvent(new SwitchTurnsEvent(this.currentTurn));
  }

  resetCards(playerId: number) {
    this.board.getSideByOwnerId(playerId)?.map((boardPos) => {
      boardPos.creature.setIsReady(true);
      boardPos.building.setIsReady(true);
    });
  }

  playCard(card: Card, playerId: number): boolean {
    if (this.turnPhase != TurnPhases.Play || 
      (Game.getInstance().getPlayerById(playerId) != null && Game.getInstance().getPlayerById(playerId).actions >= card.getCost())) {
      return false;
    }

    switch (card.cardType) {
      case CardType.Creature:
        return this.dispatchEvent(
          new GetBoardPosTargetEvent(
            GetCardTargetEvent,
            (pos: BoardPos) => {
              if (pos.creature != Creature.NULL) {
                return false;
              } else {
                if (card.play(pos, playerId)) {
                  return Game.getInstance().dispatchEvent(
                    new PlayCardEvent(
                      card,
                      playerId,
                    ),
                  );
                }
                return false;
              }
            },
            playerId,
            Targeter.PLAY_CREATURE_TARGETER,
          ),
        );
      case CardType.Landscape:
        return this.dispatchEvent(
          new GetBoardPosTargetEvent(
            GetCardTargetEvent,
            (pos: BoardPos) => {
              if (pos.landscape != LandscapeType.NULL) {
                return false;
              } else {
                if (card.play(pos, playerId)) {
                  return Game.getInstance().dispatchEvent(
                    new PlayCardEvent(
                      card,
                      playerId,
                    ),
                  );
                }
                return false;
              }
            },
            playerId,
            Targeter.PLAY_LANDSCAPE_TARGETER,
          ),
        );
    }
    return false;
  }
}
