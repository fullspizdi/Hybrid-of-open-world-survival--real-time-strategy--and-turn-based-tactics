import { Faction } from './faction_system';
import { CombatSystem, Combatant } from './combat_system';
import { Spacecraft } from './space_exploration';
import { getRandomInt } from './utils';

/**
 * Module responsible for managing fleet combat within the game.
 */

interface Fleet {
    id: number;
    name: string;
    factionId: number;
    ships: Spacecraft[];
    combatPower: number;
}

class FleetCombatSystem {
    /**
     * Simulates a fleet combat between two fleets.
     * @param attackingFleet - The attacking fleet.
     * @param defendingFleet - The defending fleet.
     * @returns The result of the fleet combat, indicating the winner and any changes in fleet status.
     */
    static simulateFleetCombat(attackingFleet: Fleet, defendingFleet: Fleet): { winner: Fleet, loser: Fleet, detail: string } {
        const attackPower = attackingFleet.combatPower + getRandomInt(1, 20);
        const defensePower = defendingFleet.combatPower + getRandomInt(1, 20);

        if (attackPower > defensePower) {
            const damage = attackPower - defensePower;
            defendingFleet.ships = defendingFleet.ships.slice(0, Math.max(defendingFleet.ships.length - damage, 0)); // Remove ships based on damage
            if (defendingFleet.ships.length === 0) {
                return { winner: attackingFleet, loser: defendingFleet, detail: `${attackingFleet.name} destroys ${defendingFleet.name} completely!` };
            }
            return { winner: attackingFleet, loser: defendingFleet, detail: `${attackingFleet.name} damages ${defendingFleet.name}, destroying ${damage} ships.` };
        } else {
            return { winner: defendingFleet, loser: attackingFleet, detail: `${defendingFleet.name} successfully defends against ${attackingFleet.name}.` };
        }
    }

    /**
     * Calculates the total combat power of a fleet based on the ships it contains.
     * @param fleet - The fleet to calculate power for.
     * @returns The total combat power of the fleet.
     */
    static calculateFleetPower(fleet: Fleet): number {
        return fleet.ships.reduce((total, ship) => total + ship.fuelLevel, 0); // Example calculation, assumes fuel level contributes to combat power
    }

    /**
     * Updates the combat power of the fleet.
     * @param fleet - The fleet to update.
     */
    static updateFleetCombatPower(fleet: Fleet): void {
        fleet.combatPower = this.calculateFleetPower(fleet);
    }
}

export { Fleet, FleetCombatSystem };
