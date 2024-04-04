
//============================================================== Enums ==============================================================
const TurnPhases = {
	Play: 0,
	Action: 1,
	Battle: 2
}

const LandscapeType = { // Landscape type: associated hex color code for front to render
	NULL: '#94949c',
	Swamp: '#38541b',
	Desert: '#b3b179',
	Hills: '#468546',
	Candylands: '#d192cc'
}

const AbilityUpdateType = {
	EnterPlay: 0,
	StartOfTurn: 1,
	Active: 2,
	Discard: 3
}

const AbilityDuration = {
	Instant: 0,
	Turn: 1,
	Round: 2
}

const CardType = {
	Creature: 0,
	Building: 1,
	Spell: 2,
	Landscape: 3
}

const LaneTargeter = {
	None: 0,
	SingleLane: 1,
	AdjacentLanes: 2,
	AllLanes: 3
}

const PlayerTargeter = {
	Self: 0,
	Opponent: 1
}

const TargetType = {
	Creature: 0,
	Building: 1,
	Landscape: 2,
	Player: 3,
	DiscardPile: 4,
	EffectHolder: 5,
	BoardPos: 6
}

//============================================================== Game ==============================================================
export class Game {
    players: Player[];
    board: SidedBoard;
    currentTurn: number;
    turnTimer: number;
    currentPlayer: Player
    turnPhase: number

	constructor() {
		this.players = [new Player(0), new Player(1)];
		this.board = new SidedBoard();
		this.board.addPlayer(this.players[0].id);
		this.board.addPlayer(this.players[1].id);
		this.currentTurn = 0;
		this.currentPlayer = this.players[0];
		this.turnTimer = 90;
		this.turnPhase = TurnPhases.Play;
	}
	
	static instance = new Game();

	getPlayerById(playerId: number) {
		return this.players[playerId];
	}

	enterNextPhase() {
		this.turnPhase++;
		if(this.turnPhase > TurnPhases.Battle) {
			this.turnPhase = TurnPhases.Play;
			this.switchTurns(this.currentPlayer.id);
		}
	}

	switchTurns(currentPlayerId: number) {
		if(currentPlayerId + 1 > this.players.length) {
			this.currentPlayer = this.players[0];
		}else {
			this.currentPlayer = this.players[currentPlayerId+1];
		}
		this.resetCards(this.currentPlayer.id);
	}

	resetCards(playerId: number) {
		this.board.getSideByOwnerId(playerId)?.map((boardPos) => {
			boardPos.creature.isReady = true;
			boardPos.building.isReady = true;
		});
	}
}

//============================================================== Player ==============================================================
class Player {
    id: number;
    username: string;
    discardPile: Card[];
    deck: Card[];
    hand: Card[];
    hp: number;
    actions: number;

	constructor(id: number) {
		this.id = id;
		this.username = "";
		this.discardPile = [];
		this.deck = [];
		this.hand = [];
		this.hp = 25;
		this.actions = 2;
	}

	discard(index: number = -1) {
		if(index == -1){
			index = Math.floor(Math.random()*this.hand.length)
		}

		this.discardPile.push(this.hand[index])
		this.hand.splice(index,1)
	}

	drawCard(amount:number){
        for(let i=0;i<amount;i++){
        if(this.deck.length>=0){
            const drawnCard=this.deck.pop();
            if(drawnCard){
                this.hand.push(drawnCard);
            }
        }
    }
        
    }
}

//============================================================== Board ==============================================================
class BoardPos {
    ownerId: number;
    creature: Creature;
    building: Building;
    landscape: string;
    activeEffects: Effect[];

	constructor(ownerId: number) {
		this.ownerId = ownerId;
		this.creature = Creatures.NULL;
		this.building = Buildings.NULL;
		this.landscape = LandscapeType.NULL;
		this.activeEffects = []; // effectively used as active landscape effects
	}

	setCreature(card: Creature) {
		if(this.creature == Creatures.NULL) {
			this.creature = card;
			return true;
		}
		return false;
	}

	removeCreature() {
		this.creature = Creatures.NULL;
		return true;
	}

	setBuilding(card: Building) {
		if(this.building == Buildings.NULL) {
			this.building = card;
			return true;
		}
		return false;
	}

	removeBuilding() {
		this.building = Buildings.NULL;
		return true;
	}

	setLandscape(card: Landscape) {
		if(this.landscape == LandscapeType.NULL) {
			this.landscape = card.landscapeType;
			return true;
		}
		return false;
	}

	removeLandscape() {
		this.landscape = LandscapeType.NULL;
		return true;
	}
	
	hasEffect(effect: Effect) {
		for(var i = 0; i < this.activeEffects.length; i++) {
			if(this.activeEffects[i] == effect) {
				return true;
			}
		}
		return false;
	}
}

class SidedBoard {
    lanes: Map<number, BoardPos[]>;

	constructor() {
		this.lanes = new Map();
	}

	addPlayer(playerId: number) {
		this.lanes.set(playerId, [new BoardPos(playerId), new BoardPos(playerId), new BoardPos(playerId), new BoardPos(playerId)]);
	}

	getSideByOwnerId(ownerId: number): BoardPos[] | undefined {
		return this.lanes.get(ownerId);
	}

	getBoardPosByOwnerId(ownerId: number, boardPos: number): BoardPos | undefined {
		var lane = this.getSideByOwnerId(ownerId);
		if(typeof(lane) != "undefined") {
			return lane[boardPos];
		}else {
			return lane;
		}
	}
}

//============================================================== Events ==============================================================
class GetTargetEvent extends Event {

	execute: Function;

	constructor(name: string, execute: Function) {
		super(name);
		this.execute = execute;
	}
}

class GetTargetForAbilityEvent extends GetTargetEvent {

	static defaultEventName: string = "getTargetForAbility";
	targeter: Targeter;

	constructor(execute: Function, target: Targeter) {
		super(GetTargetForAbilityEvent.defaultEventName, execute);
		this.targeter = target;
	}

	static NULL_EVENT = (pos: BoardPos) => {return false;};
}

//============================================================== Cards ==============================================================
class Card {
    name: string;
    flavorText: string;
    cardType: number;
    cost: number;
    landscapeType: string;
	turnPlayed: number
    ability: Ability;
	isReady: boolean;
	ownerId: number | null = null;

	constructor(name: string, flavorText: string, cardType: number, cost: number, landscapeType: string, ability: Ability) {
		this.name = name;
		this.flavorText = flavorText;
		this.cardType = cardType;
		this.cost = cost;
		this.landscapeType = landscapeType;
		this.turnPlayed = Game.instance.currentTurn;
		this.ability = ability;
		this.isReady = true;
	}

	setOwnerId(ownerId: number) {
		this.ownerId = ownerId;
	}

	wasPlayedThisTurn() {
		return Game.instance.currentTurn == this.turnPlayed;
	}

	play(target: any) {
		return false;
	}
}

class Creature extends Card {
    attack: number;
    defense: number;
    maxDefense: number;
    activeEffects: Effect[];

	constructor(name: string, flavorText: string, cost: number, landscapeType: string, ability: Ability, attack: number, defense: number) {
		super(name, flavorText, CardType.Creature, cost, landscapeType, ability);
		this.attack = attack;
		this.defense = defense;
		this.maxDefense = defense; // Used when healing a creature so it doesn't overheal, and cards that say things like "if a creature has exactly x damage."
		this.activeEffects = [];
	}

	override play(pos: BoardPos) {
		if(pos.creature == Creatures.NULL) {
			return pos.setCreature(this);
		}
		return false;
	}
	
	hasEffect(effect: Effect) {
		for(var i = 0; i < this.activeEffects.length; i++) {
			if(this.activeEffects[i] == effect) {
				return true;
			}
		}
		return false;
	}
}

class Building extends Card {
	constructor(name: string, flavorText: string, cost: number, landscapeType: string, ability: Ability) {
		super(name, flavorText, CardType.Building, cost, landscapeType, ability);
	}

	override play(pos: BoardPos) {
		if(pos.building == Buildings.NULL) {
			return pos.setBuilding(this);
		}
		return false;
	}
}

class Spell extends Card {
	constructor(name: string, flavorText: string, cost: number, landscapeType: string, ability: Ability) {
		super(name, flavorText, CardType.Spell, cost, landscapeType, ability);
	}

	override play(pos: BoardPos) { //TODO
		return false;
	}
}

// By having this class, the front end can render these like they're in your hand when the game starts so you can choose where your landscapes belong
class Landscape extends Card { 
	constructor(name: string, flavorText: string, landscapeType: string) {
		super(name, flavorText, CardType.Landscape, 0, landscapeType, Abilities.NULL);
	}

	override play(pos: BoardPos) {
		if(pos.landscape == LandscapeType.NULL) {
			return pos.setLandscape(this);
		}
		return false;
	}
}

//============================================================== Abilities and Effects ==============================================================
class Ability {
	description: string;
	abilityType: number;
	abilityDuration: number;
	targeter: Targeter;
	effect: Effect;
	healthCost: number;
	orAbility: Ability | null;
	andAbility: Ability | null;
	getTargetEvent: GetTargetForAbilityEvent;
	private static getTargetEventTarget: EventTarget = new EventTarget();

	constructor(desc: string, abilityType: number, abilityDuration: number, targeter: 
			Targeter, effect: Effect, healthCost: number, orAbility: Ability | null, andAbility: Ability | null, targetEventFunc: Function | null) {
		this.description = desc;
		this.abilityType = abilityType;
		this.abilityDuration = abilityDuration;
		this.targeter = targeter;
		this.effect = effect;
		this.healthCost = healthCost;

		//Just a check to make sure that no orAbility or andAbility is actually assigned null but uses the null ability instead
		if(orAbility == null) {
			this.orAbility = Abilities.NULL;
		}else {
			this.orAbility = orAbility;
		}
		if(andAbility == null) {
			this.andAbility = Abilities.NULL;
		}else {
			this.andAbility = andAbility;
		}
		if(targetEventFunc == null) {
			this.getTargetEvent = new GetTargetForAbilityEvent(GetTargetForAbilityEvent.NULL_EVENT, targeter);
		}else {
			this.getTargetEvent = new GetTargetForAbilityEvent(targetEventFunc, targeter);
		}
	}

	static addGetAbilityTargetEventListener(eventCallback: EventListenerOrEventListenerObject) {
		Ability.getTargetEventTarget.addEventListener(GetTargetForAbilityEvent.defaultEventName, eventCallback);
	}

	//Not sure about dispatching instanced events through a static event target, will this work?
	getAbilityTarget() {
		return Ability.getTargetEventTarget.dispatchEvent(this.getTargetEvent);
	}
}

class Effect { // Builder Class
	attackBonus: Function;
	defenseBonus: Function;
	healthBonus: Function;
	actionBonus: Function;
	cardDiscount: Function;
	damage: Function;
	playerDamage: Function;
	conditionsApplied: Function;
	conditionsRemoved: Function;
	disables: boolean;
	readiesBeforeBattle: boolean;
	cardsDrawn: Function;
	cardsRevealed: Function;
	playablePredicate: Function | null;

	constructor() {
		this.attackBonus = (game: Game) => {return 0};
		this.defenseBonus = (game: Game) => {return 0};
		this.healthBonus = (game: Game) => {return 0};
		this.actionBonus = (game: Game) => {return 0};
		this.cardDiscount = (game: Game) => {return 0};
		this.damage = (game: Game) => {return 0};
		//playerDamage maybe should be replaced with the andAbility member in Ability
		this.playerDamage = (game: Game) => {return 0}; //Used for player hp in the case of things like "deal x damage to a creature, then heal for that amount" cases. used ONLY for damaging/healing players.
		this.conditionsApplied = (game: Game) => {return []};
		this.conditionsRemoved = (game: Game) => {return []};
		this.disables = false;
		this.readiesBeforeBattle = false;
		this.cardsDrawn = (game: Game) => {return 0};
		this.cardsRevealed = (game: Game) => {return 0};
		this.playablePredicate = null;
	}
	
	setAttackBonus(bonus: Function) {
		this.attackBonus = bonus;
		return this;
	}
	
	setDefenseBonus(bonus: Function) {
		this.defenseBonus = bonus;
		return this;
	}
	
	setHealthBonus(bonus: Function) {
		this.healthBonus = bonus;
		return this;
	}
	
	setActionBonus(bonus: Function) {
		this.actionBonus = bonus;
		return this;
	}

	setCardDiscount(bonus: Function) {
		this.cardDiscount = bonus;
		return this;
	}
	
	setDamage(damage: Function) {
		this.damage = damage;
		return this;
	}
	
	setPlayerDamage(damage: Function) {
		this.playerDamage = damage;
		return this;
	}
	
	setConditionsApplied(conditions: Function) {
		this.conditionsApplied = conditions;
		return this;
	}
	
	setConditionsRemoved(conditions: Function) {
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
	
	setCardsDrawn(cards: Function) {
		this.cardsDrawn = cards;
		return this;
	}
	
	setCardsRevealed(cards: Function) {
		this.cardsRevealed = cards;
		return this;
	}
	
	setPlayablePredicate(predicate: Function | null) {
		this.playablePredicate = predicate;
		return this;
	}
}

//============================================================== Util ==============================================================
class Targeter {
	playerTargeter: number;
	laneTargeter: number;
	needsPlayerSelection: boolean;
	numberPlayerSelections: number;
	selectionPredicate: Function | null;
	targetType: number;

	constructor(playerTargeter: number, laneTargeter: number, needsPlayerSelection: boolean, numberPlayerSelections: number, 
			selectionPredicate: Function | null, targetType: number) {
		this.playerTargeter = playerTargeter;
		this.laneTargeter = laneTargeter;
		this.needsPlayerSelection = needsPlayerSelection;
		this.numberPlayerSelections = numberPlayerSelections;
		this.selectionPredicate = selectionPredicate;
		this.targetType = targetType;
	}
	
	//Selection Predicates
	static ANY_PREDICATE = (lane: BoardPos) => true; //Note that the lane should be a BoardPos instance, and the predicate should be checked for each valid BoardPos instance.
	
	//Targeters
	static CREATURE_TARGETER = new Targeter(PlayerTargeter.Self, LaneTargeter.SingleLane, true, 1,  (lane: BoardPos) => {return lane.creature == Creatures.NULL;},
		TargetType.BoardPos);

	static BUILDING_TARGETER = new Targeter(PlayerTargeter.Self, LaneTargeter.SingleLane, true, 1, (lane: BoardPos) => {return lane.building == Buildings.NULL;},
		TargetType.BoardPos);

	static SPELL_TARGETER = new Targeter(PlayerTargeter.Self, LaneTargeter.None, true, 1, Targeter.ANY_PREDICATE,
		TargetType.BoardPos);

	static LANDSCAPE_TARGETER = new Targeter(PlayerTargeter.Self, LaneTargeter.SingleLane, true, 1, (lane: BoardPos) => {return lane.landscape == LandscapeType.NULL;},
		TargetType.BoardPos);

	static GET_TARGET_FOR_CREATURE = new GetTargetEvent("getTargetForCreatureCard", (card: Creature, pos: BoardPos) => {
		card.play(pos);
	});

	static GET_TARGET_FOR_BUILDING = new GetTargetEvent("getTargetForBuildingCard", (card: Building, pos: BoardPos) => {
		card.play(pos);
	});

	static GET_TARGET_FOR_LANDSCAPE = new GetTargetEvent("getTargetForLandscapeCard", (card: Landscape, pos: BoardPos) => {
		card.play(pos);
	});

	static GET_TARGET_FOR_SPELL = new GetTargetEvent("getTargetForSpellCard", (card: Spell, pos: BoardPos) => {
		card.play(pos);
	});

}

//============================================================== Singletons ==============================================================
class Effects {
	constructor() {}
	
	static NULL = new Effect();
	static FROZEN = new Effect().setDisables().setPlayablePredicate((lane: BoardPos) => lane.activeEffects.length > 0 && lane.hasEffect(Effects.FROZEN));

}

class Abilities {
	constructor() {}
	
	static NULL = new Ability("Null", AbilityUpdateType.EnterPlay, AbilityDuration.Instant,
		new Targeter(PlayerTargeter.Self, LaneTargeter.None, false, 0, Targeter.ANY_PREDICATE, TargetType.Player), 
		Effects.NULL, 0, null, null, GetTargetForAbilityEvent.NULL_EVENT);
		
	//Note that the predicate here is useless and is here for syntax. This should be checked when looking at the targers for lane, player, and type.
	//A useful predicate would be something like (lane) => lane.creature.defense > 2 or (lane) => lane.creature.hasEffect == Effects.FROZEN
	static DAMAGE_ALL_1 = new Ability("Deal 1 damage to every creature in every lane.", AbilityUpdateType.EnterPlay, AbilityDuration.Instant, 
		new Targeter(PlayerTargeter.Opponent, LaneTargeter.AllLanes, false, 0, (lane: BoardPos) => lane.creature != Creatures.NULL, TargetType.Creature), 
		new Effect().damage((game: Game, lane: BoardPos) => {return 1;}), 0, Abilities.NULL, Abilities.NULL, GetTargetForAbilityEvent.NULL_EVENT);

	// static DAMAGE_CREATURE_1 = new Ability("Deal 1 damage to any creature in any lane.", AbilityUpdateType.EnterPlay, AbilityDuration.Instant, 
	// 	new Targeter(PlayerTargeter.Opponent, LaneTargeter.SingleLane, true, 1, (lane: BoardPos) => lane.creature != Creatures.NULL, TargetType.Creature), 
	// 	new Effect().damage((game: Game, lane: BoardPos) => {return 1;}), 0, Abilities.NULL, Abilities.NULL, (lane: BoardPos, card: Creature) => {});
}

class Creatures {
	constructor() {}
	
	static NULL = new Creature("Null", "You shouldn't be seeing this!", 0, LandscapeType.NULL, Abilities.NULL, 0, 0);
	static DARK_ANGEL = new Creature("Dark Angel", "", 1, LandscapeType.Swamp, new Ability("+1 Attack for every 5 cards in your discard pile.", 
	AbilityUpdateType.Discard, AbilityDuration.Round, new Targeter(PlayerTargeter.Self, LaneTargeter.None, false, 0, null, TargetType.DiscardPile), 
	new Effect().attackBonus((game: Game, lane: BoardPos) => {
		if(lane.creature.ownerId != null) {
			return game.getPlayerById(lane.creature.ownerId).discardPile.length/5
		} else {
			return 0
		}
	}),0, Abilities.NULL, Abilities.NULL, GetTargetForAbilityEvent.NULL_EVENT), 0, 5);
}

class Buildings {
	constructor() {}
	
	static NULL = new Building("Null", "You shouldn't be seeing this!", 0, LandscapeType.NULL, Abilities.NULL);
}

class Spells {
	constructor() {}
	
	static NULL = new Spell("Null", "You shouldn't be seeing this!", 0, LandscapeType.NULL, Abilities.NULL);

}
