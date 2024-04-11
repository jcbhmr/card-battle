//============================================================== Enums ==============================================================
const TurnPhases = {
	Play: 0,
	Action: 1,
	Battle: 2
 }


 const CardLocations = {
	Deck: "deck",
	Hand: "hand",
	Discard: "discardPile"
 }
 
 
 const LandscapeType = { // Landscape type: associated hex color code for front to render
	NULL: '#94949c',
	Swamp: '#38541b',
	Desert: '#b3b179',
	Hills: '#468546',
	Candylands: '#d192cc'
 }
 
 
 const EffectUpdateType = {
	EnterPlay: 0,
	StartOfTurn: 1,
	Active: 2,
	Discard: 3
 }
 
 
 const EffectDuration = {
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
   
	static instance = new Game();

	static addEventListener(event: string, eventCallback: EventListenerOrEventListenerObject) {
		Game.instance.addEventListener(event, eventCallback);
	}
 
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
 
	playCard(card: Card) {
		if (this.turnPhase != TurnPhases.Play){
			return;
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
 export class BoardPos {
	static boardIdCounter = 0;
	posId: number
	ownerId: number;
	creature: Creature;
	building: Building;
	landscape: string;
	activeEffects: Effect[];
 
 
	constructor(ownerId: number) {
		this.posId = BoardPos.boardIdCounter++;
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
 
 
 export class SidedBoard {
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
 
	getBoardPosByOwnerId(ownerId: number, boardPos: number): BoardPos | null {
		var lane = this.getSideByOwnerId(ownerId);
		if(typeof(lane) != "undefined") {
			return lane[boardPos];
		}else {
			return null;
		}
	}

	getAllAdjacentBoardPos(ownerId: number, boardPos: BoardPos): BoardPos[] | null {
		var side: BoardPos[] | undefined = this.getSideByOwnerId(ownerId);
		var adjacent: BoardPos[] = [];
		if(side != undefined) {
			for(var i = 0; i < side.length; i++) {
				if(side[i].posId == boardPos.posId) {
					if(i+1 < side.length && i+1 > 0) {
						adjacent.push(side[i+1]);
					}
					if(i-1 < side.length && i-0 > 0) {
						adjacent.push(side[i-1]);
					}
					adjacent.push(side[i]);
					return adjacent;
				}
			}
		}
		return null;
	}
 }
 
 
 //============================================================== Events ==============================================================
 export class GetTargetEvent extends Event {
	execute: Function;
	targeter: Targeter | null;
 
	constructor(name: string, execute: Function, targeter: Targeter | null = null) {
		super(name);
		this.execute = execute;
		this.targeter = targeter;
	}
 
	static NULL_EVENT = (pos: BoardPos) => {return false;};
 }
 
 
 //============================================================== Cards ==============================================================
 export class Card {
	name: string;
	flavorText: string;
	cardType: number;
	cost: number;
	landscapeType: string;
	turnPlayed: number
	ability: Ability;
	isReady: boolean;
	ownerId: number | null = null;
	location: BoardPos | String = CardLocations.Deck;
	getTargetEvent: GetTargetEvent | null = null;
	activeEffects: Effect[] = [];

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

	static addCardChangedEventListener(eventCallback: EventListenerOrEventListenerObject) {
		Game.instance.addEventListener("displayCards", eventCallback);
	}
 
	//Not sure about dispatching instanced events through a static event target, will this work?
	getTarget() {
		if(this.getTargetEvent != null) {
			return Game.instance.dispatchEvent(this.getTargetEvent);
		}else {
			return false;
		}
	}
 
	setOwnerId(ownerId: number) {
		this.ownerId = ownerId;
	}
 
	wasPlayedThisTurn() {
		return Game.instance.currentTurn == this.turnPlayed;
	}
 
	play(target: any, id: number | null = null) {
		return false;
	}
 
	death(){
		if(this.ownerId != null){
			Game.instance.getPlayerById(this.ownerId).discardPile.push(this);
			this.removeCardFromBoard(CardLocations.Discard)
		}
	}

	addEffect(effect: Effect) {
		this.activeEffects.push(effect);
	}
 
	returnToHand(){
		if(this.ownerId != null){
			Game.instance.getPlayerById(this.ownerId).hand.push(this);
			this.removeCardFromBoard(CardLocations.Hand)
		}
	}

	removeCardFromBoard(newLocation: String = CardLocations.Discard){ // Whole screen is redrawn on cardChanged, so not sure if we need this
		Game.instance.dispatchEvent(new CustomEvent("removeCard", { detail: this }));
		if(typeof this.location == "string"){
			console.log("Card is not on board")
			return;
		}
		
		if(this.location instanceof BoardPos) { //Type safe check for removeCreature()
			this.location.removeCreature();
			this.location = newLocation;
		}
	}

	displayCards(){ //Was drawCard, name changed for clarity
		Game.instance.dispatchEvent(new CustomEvent("displayCards", { detail: this }));
	}
 }
 
 
 export class Creature extends Card {
	attack: number;
	defense: number;
	maxDefense: number;
 
 
	constructor(name: string, flavorText: string, cost: number, landscapeType: string, ability: Ability, attack: number, defense: number) {
		super(name, flavorText, CardType.Creature, cost, landscapeType, ability);
		this.attack = attack;
		this.defense = defense;
		this.maxDefense = defense; // Used when healing a creature so it doesn't overheal, and cards that say things like "if a creature has exactly x damage."
		this.getTargetEvent = new GetTargetEvent("getTargetForCreature", (pos: BoardPos) => {
			this.play(pos);
		});
	}
 
	static addGetTargetEventListener(eventCallback: EventListenerOrEventListenerObject): void {
		Game.instance.addEventListener("getTargetForCreature", eventCallback);
	}
 
	override play(pos: BoardPos): boolean {
		if(pos.creature == Creatures.NULL) {
			return pos.setCreature(this);
		}
		return false;
	}

	override addEffect(effect: Effect): void {
		super.addEffect(effect);
		this.attack += effect.attackBonus.call(null, Game.instance);
		
		//We have absolutely no way to reveal cards for effect.cardsRevealed at the moment, will probably be removed.
		if(this.ownerId != null) {
			Game.instance.getPlayerById(this.ownerId).actions += effect.actionBonus.call(null, Game.instance);
			Game.instance.getPlayerById(this.ownerId).cardDiscount += effect.cardDiscount.call(null, Game.instance);
			Game.instance.getPlayerById(this.ownerId).drawCard(effect.cardsDrawn.call(null, Game.instance));
		}
		
	}

	hasEffect(effect: Effect): boolean {
		for(var i = 0; i < this.activeEffects.length; i++) {
			if(this.activeEffects[i] == effect) {
				return true;
			}
		}
		return false;
	}
 }
 
 
 export class Building extends Card {
	constructor(name: string, flavorText: string, cost: number, landscapeType: string, ability: Ability) {
		super(name, flavorText, CardType.Building, cost, landscapeType, ability);
		this.getTargetEvent = new GetTargetEvent("getTargetForBuilding", (pos: BoardPos) => {
			this.play(pos);
		});
	}
 
	static addGetTargetEventListener(eventCallback: EventListenerOrEventListenerObject) {
		Game.instance.addEventListener("getTargetForBuilding", eventCallback);
	}
 
	override play(pos: BoardPos) {
		if(pos.building == Buildings.NULL) {
			return pos.setBuilding(this);
		}
		return false;
	}
 }
 
 
 export class Spell extends Card {
	constructor(name: string, flavorText: string, cost: number, landscapeType: string, ability: Ability) {
		super(name, flavorText, CardType.Spell, cost, landscapeType, ability);
		this.getTargetEvent = new GetTargetEvent("getTargetForSpell", (pos: BoardPos) => {
			this.play(pos);
		});
	}
 
	static addGetTargetEventListener(eventCallback: EventListenerOrEventListenerObject) {
		Game.instance.addEventListener("getTargetForSpell", eventCallback);
	}
 
	override play(pos: BoardPos) { //TODO
		return false;
	}
 }
 
 
 // By having this class, the front end can render these like they're in your hand when the game starts so you can choose where your landscapes belong
 export class Landscape extends Card {
	constructor(name: string, flavorText: string, landscapeType: string) {
		super(name, flavorText, CardType.Landscape, 0, landscapeType, Abilities.NULL);
		this.getTargetEvent = new GetTargetEvent("getTargetForLandscape", (pos: BoardPos) => {
			this.play(pos);
		});
	}
 
	static addGetTargetEventListener(eventCallback: EventListenerOrEventListenerObject) {
		Game.instance.addEventListener("getTargetForLandscape", eventCallback);
	}
 
	override play(pos: BoardPos) {
		if(pos.landscape == LandscapeType.NULL) {
			return pos.setLandscape(this);
		}
		return false;
	}
 }
 
 
 //============================================================== Abilities and Effects ==============================================================
 export class Ability {
	description: string;
	targeter: Targeter;
	effect: Effect;
	healthCost: number;
	orAbility: Ability | null;
	andAbility: Ability | null;
	getTargetEvent: GetTargetEvent;
 
 
	constructor(desc: string, targeter: Targeter, effect: Effect, healthCost: number, orAbility: Ability | null, andAbility: Ability | null,
			targetEventFunc: Function | null = null) {
		this.description = desc;
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
		if(targetEventFunc == null || targeter.needsPlayerSelection == false) {
			this.getTargetEvent = new GetTargetEvent("getTargetForAbility", GetTargetEvent.NULL_EVENT, targeter);
		}else {
			this.getTargetEvent = new GetTargetEvent("getTargetForAbility", targetEventFunc, targeter);
		}
	}
 
	static addGetAbilityTargetEventListener(eventCallback: EventListenerOrEventListenerObject) {
		Game.instance.addEventListener("getTargetForAbility", eventCallback);
	}

	static addGetAbilityDiscardPileTargetEventListener(eventCallback: EventListenerOrEventListenerObject) {
		Game.instance.addEventListener("getTargetDiscardPileForAbility", eventCallback);
	}

	static addGetAbilityEffectHolderTargetEventListener(eventCallback: EventListenerOrEventListenerObject) {
		Game.instance.addEventListener("getTargetEffectHolderForAbility", eventCallback);
	}
 
	//Not sure about dispatching instanced events through a static event target, will this work?
	getAbilityTarget() {
		return Game.instance.dispatchEvent(this.getTargetEvent);
	}
 
	activate(playerId: number) {
		if(this.targeter.needsPlayerSelection) {
			this.getAbilityTarget();
		}else {
			
		}
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
	apply(target: any) {
		if(target instanceof Card) {
			this.applyCard(target);
		}else if(target instanceof Player) {
			// this.applyPlayer(target); //TODO
		}
		// else if(target instanceof DiscardPile) { //How to handle this case for TargetType?
 
 
		// }
		else if(target instanceof BoardPos) {
			// this.applyBoard(target); //TODO
		}
	}
 
	applyCard(target: Card) {
		target.activeEffects.push(this.effect);
		if(this.healthCost != 0) {
			//How do we want to handle health cost when we don't know who "activated" this ability?
		}
	}
 }

 export class Effect { // Builder Class
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
	effectDuration: number;
	effectUpdateType: number;
 
 
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
		this.effectDuration = EffectDuration.Instant;
		this.effectUpdateType = EffectUpdateType.EnterPlay;
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
 
 
	setEffectDuration(duration: number) {
		this.effectDuration = duration;
		return this;
	}
 
 
	setEffectUpdateType(updateType: number) {
		this.effectUpdateType = updateType;
		return this;
	}
 }
 
 
 //============================================================== Util ==============================================================
 export class Targeter {
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
	static PLAY_CREATURE_TARGETER = new Targeter(PlayerTargeter.Self, LaneTargeter.SingleLane, true, 1,  (lane: BoardPos) => {return lane.creature == Creatures.NULL;},
		TargetType.BoardPos);
 
 
	static PLAY_BUILDING_TARGETER = new Targeter(PlayerTargeter.Self, LaneTargeter.SingleLane, true, 1, (lane: BoardPos) => {return lane.building == Buildings.NULL;},
		TargetType.BoardPos);
 
 
	static PLAY_SPELL_TARGETER = new Targeter(PlayerTargeter.Self, LaneTargeter.None, true, 1, Targeter.ANY_PREDICATE,
		TargetType.BoardPos);
 
 
	static PLAY_LANDSCAPE_TARGETER = new Targeter(PlayerTargeter.Self, LaneTargeter.SingleLane, true, 1, (lane: BoardPos) => {return lane.landscape == LandscapeType.NULL;},
		TargetType.BoardPos);

	getValidBoardPos(playerId: number): BoardPos[] | null {
		if(this.targetType == TargetType.DiscardPile || this.targetType == TargetType.EffectHolder || this.targetType == TargetType.Player) {
			return null;
		}
		var player = playerId;
		if(this.playerTargeter == PlayerTargeter.Opponent) {
			player = playerId+1 >= Game.instance.players.length ? 0 : playerId + 1
		}

		switch(this.laneTargeter) {
			case LaneTargeter.AllLanes:
				var lanes: BoardPos[] | undefined = Game.instance.board.getSideByOwnerId(player);
				if(typeof(lanes) == "undefined") {
					return null;
				}else {
					for(var i = 0; i < lanes.length; i++) {
						var pos: BoardPos = lanes[i];
						var predicate: boolean = this.selectionPredicate?.call(null, pos);
						if(!predicate) {
							lanes.splice(i, 1);
						}
					}
					return lanes;
				}
			case LaneTargeter.AdjacentLanes:
				var lanes: BoardPos[] | undefined = Game.instance.board.getSideByOwnerId(player);
				if(typeof(lanes) == "undefined") {
					return null;
				}else {
					for(var i = 0; i < lanes.length; i++) {
						var pos: BoardPos = lanes[i];
						var predicate: boolean = this.selectionPredicate?.call(null, pos);
						if(!predicate) {
							lanes.splice(i, 1);
						}
					}
					return lanes;
				}
				case LaneTargeter.SingleLane:
					var lanes: BoardPos[] | undefined = Game.instance.board.getSideByOwnerId(player);
					if(typeof(lanes) == "undefined") {
						return null;
					}else {
						for(var i = 0; i < lanes.length; i++) {
							var pos: BoardPos = lanes[i];
							var predicate: boolean = this.selectionPredicate?.call(null, pos);
							if(!predicate) {
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
		if(validPos == null) {
			return null;
		}else if(this.targetType == TargetType.BoardPos) {
			return validPos;
		}

		for(var i = 0; i < validPos.length; i++) {
			var pos: BoardPos = validPos[i];
			switch(this.targetType) {
				case TargetType.Building:
					if(pos.building == Buildings.NULL) {
						validPos.splice(i, 1);
					}
					break;
				case TargetType.Creature:
					if(pos.creature == Creatures.NULL) {
						validPos.splice(i, 1);
					}
					break;
				case TargetType.Landscape:
					if(pos.landscape == LandscapeType.NULL) {
						validPos.splice(i, 1);
					}
					break;
			}
		}
		return validPos;
	}

	getBoardPosUsingSelection(playerId: number, selection: BoardPos | null = null): BoardPos[] | null {
		var player = playerId;
		if(this.playerTargeter == PlayerTargeter.Opponent) {
			player = playerId+1 >= Game.instance.players.length ? 0 : playerId + 1
		}

		switch(this.laneTargeter) {
			case LaneTargeter.AllLanes:
				var lanes: BoardPos[] | undefined = Game.instance.board.getSideByOwnerId(player);
				return typeof(lanes) == "undefined" ? null : lanes;
			case LaneTargeter.AdjacentLanes:
				if(selection == null) {
					return null;
				}
				
				return Game.instance.board.getAllAdjacentBoardPos(player, selection);
			case LaneTargeter.SingleLane:
				if(selection != null) {
					return null;
				}else {
					return selection;
				}
			default:
				return null;
		}
	}
 }
 
 
 //============================================================== Singletons ==============================================================
 export class Effects {
	constructor() {}
   
	static NULL = new Effect();
	static FROZEN = new Effect().setDisables().setPlayablePredicate((lane: BoardPos) => lane.activeEffects.length > 0 && lane.hasEffect(Effects.FROZEN));
 
 
 }
 
 
 class Abilities {
	constructor() {}
   
	static NULL = new Ability("Null", new Targeter(PlayerTargeter.Self, LaneTargeter.None, false, 0, Targeter.ANY_PREDICATE, TargetType.Player),
		Effects.NULL, 0, null, null);
	   
	//Note that the predicate here is useless and is here for syntax. This should be checked when looking at the targers for lane, player, and type.
	//A useful predicate would be something like (lane) => lane.creature.defense > 2 or (lane) => lane.creature.hasEffect == Effects.FROZEN
	static DAMAGE_ALL_1 = new Ability("Deal 1 damage to every creature in every lane.",
		new Targeter(PlayerTargeter.Opponent, LaneTargeter.AllLanes, false, 0, (lane: BoardPos) => lane.creature != Creatures.NULL, TargetType.Creature),
		new Effect().damage((game: Game, lane: BoardPos) => {return 1;}).setEffectDuration(EffectDuration.Instant).setEffectUpdateType(EffectUpdateType.EnterPlay),
		0, Abilities.NULL, Abilities.NULL);
 
 
	static DAMAGE_CREATURE_1 = new Ability("Deal 1 damage to any creature in any lane.",
		new Targeter(PlayerTargeter.Opponent, LaneTargeter.SingleLane, true, 1, (lane: BoardPos) => lane.creature != Creatures.NULL, TargetType.Creature),
		new Effect().damage((game: Game, lane: BoardPos) => {return 1;}).setEffectDuration(EffectDuration.Instant).setEffectUpdateType(EffectUpdateType.EnterPlay),
		0, Abilities.NULL, Abilities.NULL, (card: Creature) => {this.apply(card)});
 }
 
 
 class Creatures {
	constructor() {}
   
	static NULL = new Creature("Null", "You shouldn't be seeing this!", 0, LandscapeType.NULL, Abilities.NULL, 0, 0);
	static DARK_ANGEL = new Creature("Dark Angel", "", 1, LandscapeType.Swamp, new Ability("+1 Attack for every 5 cards in your discard pile.",
	new Targeter(PlayerTargeter.Self, LaneTargeter.None, false, 0, null, TargetType.DiscardPile),
	new Effect().attackBonus((game: Game, lane: BoardPos) => {
		if(lane.creature.ownerId != null) {
			return game.getPlayerById(lane.creature.ownerId).discardPile.length/5
		} else {
			return 0
		}
	}).setEffectDuration(EffectDuration.Round).setEffectUpdateType(EffectUpdateType.Discard),0, Abilities.NULL, Abilities.NULL), 0, 5);
 }
 
 
 class Buildings {
	constructor() {}
   
	static NULL = new Building("Null", "You shouldn't be seeing this!", 0, LandscapeType.NULL, Abilities.NULL);
 }
 
 
 class Spells {
	constructor() {}
   
	static NULL = new Spell("Null", "You shouldn't be seeing this!", 0, LandscapeType.NULL, Abilities.NULL);
 
 
 }