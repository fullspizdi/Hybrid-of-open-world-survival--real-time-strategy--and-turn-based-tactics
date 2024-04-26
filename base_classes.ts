import { getRandomInt } from './utils';

/**
 * Base classes for the game entities and mechanics.
 */

/**
 * Class representing a generic game entity.
 */
class Entity {
    id: number;
    name: string;
    position: { x: number; y: number; z: number };

    constructor(id: number, name: string, position: { x: number; y: number; z: number }) {
        this.id = id;
        this.name = name;
        this.position = position;
    }

    /**
     * Moves the entity to a new position.
     * @param x - The x-coordinate of the new position.
     * @param y - The y-coordinate of the new position.
     * @param z - The z-coordinate of the new position.
     */
    move(x: number, y: number, z: number) {
        this.position = { x, y, z };
    }
}

/**
 * Class representing a player in the game.
 */
class Player extends Entity {
    health: number;
    inventory: Item[];

    constructor(id: number, name: string, position: { x: number; y: number; z: number }, health: number) {
        super(id, name, position);
        this.health = health;
        this.inventory = [];
    }

    /**
     * Adds an item to the player's inventory.
     * @param item - The item to add.
     */
    addItem(item: Item) {
        this.inventory.push(item);
    }

    /**
     * Removes an item from the player's inventory.
     * @param item - The item to remove.
     */
    removeItem(item: Item) {
        this.inventory = this.inventory.filter(i => i !== item);
    }
}

/**
 * Class representing an item in the game.
 */
class Item {
    id: number;
    name: string;
    quantity: number;

    constructor(id: number, name: string, quantity: number = 1) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }
}

/**
 * Class representing a faction in the game.
 */
class Faction {
    id: number;
    name: string;
    members: Player[];
    reputation: number;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.members = [];
        this.reputation = 0;
    }

    /**
     * Adds a player to the faction.
     * @param player - The player to add.
     */
    addMember(player: Player) {
        this.members.push(player);
    }

    /**
     * Removes a player from the faction.
     * @param player - The player to remove.
     */
    removeMember(player: Player) {
        this.members = this.members.filter(m => m !== player);
    }
}

/**
 * Class representing a building or structure.
 */
class Structure extends Entity {
    durability: number;

    constructor(id: number, name: string, position: { x: number; y: number; z: number }, durability: number) {
        super(id, name, position);
        this.durability = durability;
    }

    /**
     * Damages the structure, reducing its durability.
     * @param amount - The amount of damage to inflict.
     */
    damage(amount: number) {
        this.durability = Math.max(0, this.durability - amount);
    }
}

export { Entity, Player, Item, Faction, Structure };
