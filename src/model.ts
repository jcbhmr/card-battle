const TurnPhases = {
	Play: 0,
	Action: 1,
	Battle: 2
}

const LandscapeType = { // Landscape type: associated hex color code for front to render
	Null: '#94949c',
	Swamp: '#38541b',
	Desert: '#b3b179',
	Hills: '#468546',
	Candylands: '#d192cc'
}

const AbilityType = {
	EnterPlay: 0,
	StartOfTurn: 1,
	Active: 2
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
	DiscardPile: 4
}

export class Game {
    players: Player[];
    board: SidedBoard;
    currentTurn: number;
    turnTimer: number;
    currentPlayer: Player
    turnPhase: number

	constructor() {
		this.players = [new Player(0), new Player(1)];
		this.board = new SidedBoard(this.players[0].id, this.players[1].id);
		this.currentTurn = 0;
		this.currentPlayer = this.players[0];
		this.turnTimer = 90;
		this.turnPhase = TurnPhases.Play;
	}
	
	static instance = new Game();
}

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
}

class BoardPos {
    ownerId: number;
    creature: Creature;
    building: Building;
    landscape: string;
    activeEffects: Effect[];

	constructor(ownerId: number) {
		this.ownerId = ownerId;
		this.creature = Creatures.Null;
		this.building = Buildings.Null;
		this.landscape = LandscapeType.Null;
		this.activeEffects = []; // effectively used as active landscape effects
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
    lanes: BoardPos[][];

	constructor(sideOnePlayerId: number, sideTwoPlayerId: number) {
		this.lanes = [
			[new BoardPos(sideOnePlayerId), new BoardPos(sideTwoPlayerId)], 
			[new BoardPos(sideOnePlayerId), new BoardPos(sideTwoPlayerId)], 
			[new BoardPos(sideOnePlayerId), new BoardPos(sideTwoPlayerId)], 
			[new BoardPos(sideOnePlayerId), new BoardPos(sideTwoPlayerId)]
			];
	}
}

class Card {
    name: string;
    flavorText: string;
    cardType: number;
    cost: number;
    landscapeType: string;
    ability: Ability;

	constructor(name: string, flavorText: string, cardType: number, cost: number, landscapeType: string, ability: Ability) {
		this.name = name;
		this.flavorText = flavorText;
		this.cardType = cardType;
		this.cost = cost;
		this.landscapeType = landscapeType;
		this.ability = ability;
	}
}

class Creature extends Card {
    attack: number;
    defense: number;
    maxDefense: number;
    activeEffects: Effect[];

	constructor(name: string, flavorText: string, cost:number, landscapeType: string, ability: Ability, attack: number, defense: number) {
		super(name, flavorText, CardType.Creature, cost, landscapeType, ability);
		this.attack = attack;
		this.defense = defense;
		this.maxDefense = defense; // Used when healing a creature so it doesn't overheal, and cards that say things like "if a creature has exactly x damage."
		this.activeEffects = [];
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
	constructor(name: string, flavorText: string, cost:number, landscapeType: string, ability: Ability) {
		super(name, flavorText, CardType.Building, cost, landscapeType, ability);
	}
}

class Spell extends Card {
	constructor(name: string, flavorText: string, cost:number, landscapeType: string, ability: Ability) {
		super(name, flavorText, CardType.Spell, cost, landscapeType, ability);
	}
}

class Landscape extends Card { // By having this class, the front end can render these like they're in your hand when the game starts so you can choose where your landscapes belong
	constructor(name: string, flavorText: string, landscapeType: string) {
		super(name, flavorText, CardType.Landscape, 0, landscapeType, Abilities.NULL);
	}
}

class Ability {
	constructor(name, desc, abilityType, abilityDuration, targeter, effect, healthCost, orAbility, andAbility) {
		this.name = name;
		this.description = desc;
		this.abilityType = abilityType;
		this.abilityDuration = abilityDuration;
		this.targeter = targeter;
		this.effect = effect;
		this.healthCost = healthCost;
		this.orAbility = orAbility;
		this.andAbility = andAbility;
	}
}

class Targeter {
	constructor(playerTargeter, laneTargeter, needsPlayerSelection, numberPlayerSelections, selectionPredicate, targetType) {
		this.playerTargeter = playerTargeter;
		this.laneTargeter = laneTargeter;
		this.needsPlayerSelection = needsPlayerSelection;
		this.numberPlayerSelections = numberPlayerSelections;
		this.selectionPredicate = selectionPredicate;
		this.targetType = targetType;
	}
	
	static ANY_PREDICATE = (lane) => true; //Note that the lane should be a BoardPos instance, and the predicate should be checked for each valid BoardPos instance.
}

class Effect { // Builder Class
	constructor() {
		this.attackBonus = 0;
		this.defenseBonus = 0;
		this.healthBonus = 0;
		this.actionBonus = 0;
		this.damage = 0;
		this.playerDamage = 0; //Used for player character health in the case of things like "deal x damage to a creature, then heal for that amount" cases. used ONLY for damaging/healing players.
		this.conditionsApplied = [];
		this.conditionsRemoved = [];
		this.disables = false;
		this.readiesBeforeBattle = false;
		this.cardsDrawn = 0;
		this.cardsRevealed = 0;
		this.playablePredicate = null;
	}
	
	setAttackBonus(bonus) {
		this.attackBonus = bonus;
		return this;
	}
	
	setDefenseBonus(bonus) {
		this.defenseBonus = bonus;
		return this;
	}
	
	setHealthBonus(bonus) {
		this.healthBonus = bonus;
		return this;
	}
	
	setActionBonus(bonus) {
		this.actionBonus = bonus;
		return this;
	}
	
	setDamage(damage) {
		this.damage = damage;
		return this;
	}
	
	setPlayerDamage(damage) {
		this.playerDamage = damage;
		return this;
	}
	
	setConditionsApplied(conditions) {
		this.conditionsApplied = conditions;
		return this;
	}
	
	setConditionsRemoved(conditions) {
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
	
	setCardsDrawn(cards) {
		this.cardsDrawn = cards;
		return this;
	}
	
	setCardsRevealed(cards) {
		this.cardsRevealed = cards;
		return this;
	}
	
	setPlayablePredicate(predicate) {
		this.playablePredicate = predicate;
		return this;
	}
}

class Abilities {
	constructor() {}
	
	static NULL = new Ability("Null", "You shouldn't be seeing this!", AbilityType.EnterPlay, AbilityDuration.Instant,
		new Targeter(PlayerTargeter.Self, LaneTargeter.None, false, 0, Targeter.ANY_PREDICATE, TargetType.Player));
		
	//Note that the predicate here is useless and is here for syntax. This should be checked when looking at the targers for lane, player, and type.
	//A useful predicate would be something like (lane) => lane.creature.defense > 2 or (lane) => lane.creature.hasEffect == Effects.FROZEN
	static DAMAGE_ALL_1 = new Ability("Damage All Lanes", "Deal 1 damage to any creature in any lane.", AbilityType.EnterPlay, AbilityDuration.Instant, 
		new Targeter(PlayerTargeter.Opponent, LaneTargeter.AllLanes, false, 0, (lane) => lane.creature != null, TargetType.Creature), Effects.NULL, 0);
}

class Effects {
	constructor() {}
	
	static NULL = new Effect();
	static FROZEN = new Effect().setDisables().setPlayablePredicate((lane) => lane.activeEffects.length > 0 && lane.hasEffect(Effects.FROZEN));
}

class Creatures {
	constructor() {}
	
	static NULL = new Creature("Null", "You shouldn't be seeing this!", 0, LandscapeType.Null, Abilities.NULL, 0, 0);
}

class Buildings {
	constructor() {}
	
	static NULL = new Building("Null", "You shouldn't be seeing this!", 0, LandscapeType.Null, Abilities.NULL);
}

class Spells {
	constructor() {}
	
	static NULL = new Spell("Null", "You shouldn't be seeing this!", 0, LandscapeType.Null, Abilities.NULL);
}
