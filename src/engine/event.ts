import { Card } from "./card.ts";
import { Targeter, BoardPos, Player } from "../model.ts";

//Event name constants
export const PlayCardEventName: string = "playCard";
export const DiscardCardEventName: string = "discardCard";
export const DrawCardEventName: string = "drawCard";
export const CardDeathEventName: string = "cardDeath";
export const SwitchPhaseEventName: string = "switchGamePhase";
export const SwitchTurnEventName: string = "switchGameTurn";

//============================================================== Events ==============================================================
export class GetTargetEvent extends Event {
  execute: Function;
  targeter: Targeter | null;
  executorId: number;

  constructor(
    name: string,
    execute: Function,
    executorId: number,
    targeter: Targeter | null = null,
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

export class GetBoardPosTargetEvent extends GetTargetEvent {
  execute: (_pos: BoardPos) => boolean;
  targeter: Targeter | null;
  executorId: number;

  constructor(
    name: string,
    execute: (_pos: BoardPos) => boolean,
    executorId: number,
    targeter: Targeter | null = null,
  ) {
    super(name, execute, executorId, targeter);
    this.execute = execute;
    this.targeter = targeter;
    this.executorId = executorId;
  }
}

export class GetPlayerTargetEvent extends GetTargetEvent {
  execute: (_pos: Player) => boolean;
  targeter: Targeter | null;
  executorId: number;

  constructor(
    name: string,
    execute: (_pos: Player) => boolean,
    executorId: number,
    targeter: Targeter | null = null,
  ) {
    super(name, execute, executorId, targeter);
    this.execute = execute;
    this.targeter = targeter;
    this.executorId = executorId;
  }
}

export class PlayCardEvent extends Event {
  card: Card;
  executorId: number;

  constructor(card: Card, executorId: number) {
    super(PlayCardEventName);
    this.card = card;
    this.executorId = executorId;
  }
}

export class SwitchTurnsEvent extends Event {
  newTurn: number;

  constructor(newTurn: number) {
    super(SwitchTurnEventName);
    this.newTurn = newTurn;
  }
}

export class SwitchTurnPhaseEvent extends Event {
  newTurnPhase: number;

  constructor(newTurnPhase: number) {
    super(SwitchPhaseEventName);
    this.newTurnPhase = newTurnPhase;
  }
}

export class DiscardCardEvent extends Event {
  card: Card;
  executorId: number;

  constructor(card: Card, executorId: number) {
    super(DiscardCardEventName);
    this.card = card;
    this.executorId = executorId;
  }
}

export class DrawCardEvent extends Event {
  card: Card;
  executorId: number;

  constructor(card: Card, executorId: number) {
    super(DrawCardEventName);
    this.card = card;
    this.executorId = executorId;
  }
}

export class CardDeathEvent extends Event {
  card: Card;
  executorId: number;

  constructor(card: Card, executorId: number) {
    super(CardDeathEventName);
    this.card = card;
    this.executorId = executorId;
  }
}