import { Planet } from './planet_generator';
import { getRandomInt } from './utils';

/**
 * Module responsible for managing environmental challenges on planets.
 */

interface EnvironmentalHazard {
    type: string;
    description: string;
    severity: number; // Severity scale from 1 to 5
    duration: number; // Duration in game ticks
}

class EnvironmentalChallenges {
    private static instance: EnvironmentalChallenges;
    private activeHazards: Map<string, EnvironmentalHazard[]>;

    private constructor() {
        this.activeHazards = new Map();
    }

    /**
     * Singleton pattern to ensure only one instance of EnvironmentalChallenges.
     */
    public static getInstance(): EnvironmentalChallenges {
        if (!EnvironmentalChallenges.instance) {
            EnvironmentalChallenges.instance = new EnvironmentalChallenges();
        }
        return EnvironmentalChallenges.instance;
    }

    /**
     * Generates random environmental hazards for a given planet based on its type.
     * @param planet - The planet for which to generate hazards.
     */
    public generateHazardsForPlanet(planet: Planet): EnvironmentalHazard[] {
        const hazards = [];
        planet.hazards.forEach(hazardType => {
            const severity = getRandomInt(1, 6);
            const duration = getRandomInt(10, 101);
            const description = this.getHazardDescription(hazardType, severity);
            hazards.push({ type: hazardType, description, severity, duration });
        });
        this.activeHazards.set(planet.name, hazards);
        return hazards;
    }

    /**
     * Provides a description for a hazard based on its type and severity.
     * @param type - The type of hazard.
     * @param severity - The severity of the hazard.
     */
    private getHazardDescription(type: string, severity: number): string {
        const baseDescription = {
            'radiation storms': 'Causes damage to unprotected electronics and health.',
            'toxic atmospheres': 'Can cause severe respiratory issues without proper gear.',
            'extreme biomes': 'Extreme temperatures requiring specialized equipment for survival.',
            'meteor showers': 'Potential damage to structures and vehicles from high-speed impacts.',
            'tectonic instability': 'Risk of earthquakes and volcanic activity that can alter terrain.'
        };

        return `${baseDescription[type]} Severity level: ${severity}`;
    }

    /**
     * Updates the status of environmental hazards over time.
     */
    public updateHazards(): void {
        this.activeHazards.forEach((hazards, planetName) => {
            hazards.forEach(hazard => {
                hazard.duration -= 1;
                if (hazard.duration <= 0) {
                    const index = hazards.indexOf(hazard);
                    hazards.splice(index, 1);
                }
            });
            if (hazards.length === 0) {
                this.activeHazards.delete(planetName);
            }
        });
    }
}

export { EnvironmentalChallenges, EnvironmentalHazard };
