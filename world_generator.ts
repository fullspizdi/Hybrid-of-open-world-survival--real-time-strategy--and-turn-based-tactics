import { getRandomInt, shuffleArray } from './utils';
import { Entity } from './base_classes';

/**
 * Module responsible for generating and managing the game world.
 */

interface Planet {
    name: string;
    type: string;
    resources: string[];
    hazards: string[];
    position: { x: number; y: number; z: number };
}

class WorldGenerator {
    private static instance: WorldGenerator;
    private planets: Planet[] = [];

    private constructor() {}

    /**
     * Singleton pattern to ensure only one instance of WorldGenerator.
     */
    public static getInstance(): WorldGenerator {
        if (!WorldGenerator.instance) {
            WorldGenerator.instance = new WorldGenerator();
        }
        return WorldGenerator.instance;
    }

    /**
     * Generates a new planet with random characteristics.
     */
    public generatePlanet(): Planet {
        const planetTypes = ['Earth-like', 'Gas Giant', 'Frozen', 'Desert', 'Oceanic'];
        const planetHazards = ['radiation storms', 'toxic atmospheres', 'extreme biomes', 'meteor showers', 'tectonic instability'];

        const name = `Planet-${getRandomInt(1000, 9999)}`;
        const type = shuffleArray(planetTypes)[0];
        const resources = this.generateResources(type);
        const hazards = shuffleArray(planetHazards).slice(0, getRandomInt(1, 4));
        const position = {
            x: getRandomInt(-5000, 5001),
            y: getRandomInt(-5000, 5001),
            z: getRandomInt(-5000, 5001)
        };

        const newPlanet: Planet = { name, type, resources, hazards, position };
        this.planets.push(newPlanet);
        return newPlanet;
    }

    /**
     * Generates resources based on the planet type.
     * @param type - The type of the planet.
     */
    private generateResources(type: string): string[] {
        switch (type) {
            case 'Earth-like':
                return ['water', 'food', 'basic minerals'];
            case 'Gas Giant':
                return ['hydrogen', 'helium'];
            case 'Frozen':
                return ['ice', 'rare minerals'];
            case 'Desert':
                return ['silicon', 'precious metals'];
            case 'Oceanic':
                return ['water', 'organic compounds'];
            default:
                return ['unknown'];
        }
    }

    /**
     * Returns all planets currently in the game world.
     */
    public getPlanets(): Planet[] {
        return this.planets;
    }
}

export default WorldGenerator;
