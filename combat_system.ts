import { Player } from './base_classes';
import { getRandomInt, clamp } from './utils';

/**
 * Combat system handling both RTS-style and turn-based tactical combat.
 */

interface Combatant extends Player {
    attackPower: number;
    defense: number;
}

class CombatSystem {
    /**
     * Simulates a combat encounter between two players.
     * @param attacker - The attacking player.
     * @param defender - The defending player.
     * @returns The result of the combat, indicating the winner and any changes in health.
     */
    static simulateCombat(attacker: Combatant, defender: Combatant): { winner: Combatant, loser: Combatant, detail: string } {
        const attackRoll = getRandomInt(1, 20) + attacker.attackPower;
        const defenseRoll = getRandomInt(1, 20) + defender.defense;

        if (attackRoll > defenseRoll) {
            const damage = clamp(attackRoll - defenseRoll, 1, defender.health);
            defender.health -= damage;
            if (defender.health <= 0) {
                return { winner: attacker, loser: defender, detail: `${attacker.name} defeats ${defender.name} with a final blow of ${damage} damage!` };
            }
            return { winner: attacker, loser: defender, detail: `${attacker.name} hits ${defender.name} for ${damage} damage.` };
        } else {
            return { winner: defender, loser: attacker, detail: `${defender.name} defends successfully against ${attacker.name}.` };
        }
    }

    /**
     * Manages a large-scale RTS-style battle between two armies.
     * @param attackingArmy - Array of attacking players.
     * @param defendingArmy - Array of defending players.
     * @returns Summary of the battle outcome.
     */
    static simulateBattle(attackingArmy: Combatant[], defendingArmy: Combatant[]): { attackersLosses: number, defendersLosses: number, battleLog: string[] } {
        let attackersLosses = 0;
        let defendersLosses = 0;
        let battleLog: string[] = [];

        while (attackingArmy.length > 0 && defendingArmy.length > 0) {
            const attackerIndex = getRandomInt(0, attackingArmy.length);
            const defenderIndex = getRandomInt(0, defendingArmy.length);
            const result = this.simulateCombat(attackingArmy[attackerIndex], defendingArmy[defenderIndex]);

            battleLog.push(result.detail);

            if (result.loser.health <= 0) {
                if (result.loser === attackingArmy[attackerIndex]) {
                    attackingArmy.splice(attackerIndex, 1);
                    attackersLosses++;
                } else {
                    defendingArmy.splice(defenderIndex, 1);
                    defendersLosses++;
                }
            }
        }

        return {
            attackersLosses,
            defendersLosses,
            battleLog
        };
    }
}

export { CombatSystem };
