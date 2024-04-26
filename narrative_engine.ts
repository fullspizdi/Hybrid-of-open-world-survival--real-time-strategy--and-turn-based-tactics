import { Faction } from './faction_system';
import { Player } from './base_classes';
import { getRandomInt } from './utils';

/**
 * Narrative engine for dynamically generating and evolving the game's story based on player actions and world events.
 */

interface Event {
    id: number;
    description: string;
    impact: () => void;
}

class NarrativeEngine {
    events: Event[];
    historicalEvents: Event[];

    constructor() {
        this.events = [];
        this.historicalEvents = [];
    }

    /**
     * Generates initial narrative events based on the world state at game start.
     */
    generateInitialEvents() {
        this.events.push({
            id: 1,
            description: "A mysterious artifact is discovered by a player, sparking interest and conflict.",
            impact: () => {
                console.log("Artifact discovered! Factions are now competing to claim it.");
            }
        });
    }

    /**
     * Evolves the narrative based on player actions and world changes.
     * @param players - Array of all players in the game.
     * @param factions - Array of all factions in the game.
     */
    evolveNarrative(players: Player[], factions: Faction[]) {
        players.forEach(player => {
            if (getRandomInt(1, 100) > 95) {
                const event = {
                    id: this.events.length + 1,
                    description: "A player has made a significant technological breakthrough.",
                    impact: () => {
                        console.log(`${player.name} has advanced their faction's technology.`);
                    }
                };
                this.registerEvent(event);
            }
        });

        factions.forEach(faction => {
            if (getRandomInt(1, 100) > 98) {
                const event = {
                    id: this.events.length + 1,
                    description: "A faction declares war on another faction.",
                    impact: () => {
                        console.log(`${faction.name} has declared war!`);
                    }
                };
                this.registerEvent(event);
            }
        });
    }

    /**
     * Registers an event into the narrative system.
     * @param event - The event to register.
     */
    registerEvent(event: Event) {
        this.events.push(event);
        event.impact();
        this.historicalEvents.push(event);
    }

    /**
     * Retrieves the historical events for review or analysis.
     * @returns Array of historical events.
     */
    getHistoricalEvents(): Event[] {
        return this.historicalEvents;
    }
}

export { NarrativeEngine };
