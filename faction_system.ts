import { Player } from './base_classes';
import { getRandomInt } from './utils';

/**
 * Manages factions within the game, including creation, dissolution, and interactions between factions.
 */

interface Faction {
    id: number;
    name: string;
    members: Player[];
    reputation: number;
    alliances: Faction[];
    enemies: Faction[];
}

class FactionSystem {
    factions: Faction[];

    constructor() {
        this.factions = [];
    }

    /**
     * Creates a new faction with initial members and settings.
     * @param name - The name of the faction.
     * @param initialMembers - Array of players who are the initial members.
     * @returns The newly created faction.
     */
    createFaction(name: string, initialMembers: Player[]): Faction {
        const newFaction: Faction = {
            id: getRandomInt(1000, 9999),
            name,
            members: initialMembers,
            reputation: 0,
            alliances: [],
            enemies: []
        };
        this.factions.push(newFaction);
        return newFaction;
    }

    /**
     * Disbands a faction, removing it from the game.
     * @param factionId - The ID of the faction to disband.
     */
    disbandFaction(factionId: number) {
        this.factions = this.factions.filter(faction => faction.id !== factionId);
    }

    /**
     * Adds a player to a faction.
     * @param factionId - The ID of the faction.
     * @param player - The player to add.
     */
    addMemberToFaction(factionId: number, player: Player) {
        const faction = this.factions.find(faction => faction.id === factionId);
        if (faction) {
            faction.members.push(player);
        }
    }

    /**
     * Removes a player from a faction.
     * @param factionId - The ID of the faction.
     * @param playerId - The ID of the player to remove.
     */
    removeMemberFromFaction(factionId: number, playerId: number) {
        const faction = this.factions.find(faction => faction.id === factionId);
        if (faction) {
            faction.members = faction.members.filter(member => member.id !== playerId);
        }
    }

    /**
     * Forms an alliance between two factions.
     * @param factionId1 - The ID of the first faction.
     * @param factionId2 - The ID of the second faction.
     */
    formAlliance(factionId1: number, factionId2: number) {
        const faction1 = this.factions.find(faction => faction.id === factionId1);
        const faction2 = this.factions.find(faction => faction.id === factionId2);

        if (faction1 && faction2 && !faction1.alliances.includes(faction2)) {
            faction1.alliances.push(faction2);
            faction2.alliances.push(faction1);
        }
    }

    /**
     * Declares enmity between two factions.
     * @param factionId1 - The ID of the first faction.
     * @param factionId2 - The ID of the second faction.
     */
    declareEnmity(factionId1: number, factionId2: number) {
        const faction1 = this.factions.find(faction => faction.id === factionId1);
        const faction2 = this.factions.find(faction => faction.id === factionId2);

        if (faction1 && faction2 && !faction1.enemies.includes(faction2)) {
            faction1.enemies.push(faction2);
            faction2.enemies.push(faction1);
        }
    }

    /**
     * Updates the reputation of a faction.
     * @param factionId - The ID of the faction.
     * @param change - The amount to change the reputation by.
     */
    updateReputation(factionId: number, change: number) {
        const faction = this.factions.find(faction => faction.id === factionId);
        if (faction) {
            faction.reputation += change;
        }
    }
}

export { FactionSystem, Faction };
