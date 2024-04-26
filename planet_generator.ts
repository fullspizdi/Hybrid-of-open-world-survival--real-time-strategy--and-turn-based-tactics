import { getRandomInt, shuffleArray } from './utils';
import { config } from './config.json';

/**
 * Module responsible for generating planets with unique characteristics.
 */

interface Planet {
    name: string;
    type: string;
    resources: string[];
    hazards: string[];
    position: { x: number; y: number; z: number };
}

class PlanetGenerator {
    private static instance: PlanetGenerator;
    private planetNames: string[] = [
        "Aterra", "Borealis", "Cryon", "Dusara", "Ecliptor", "Fornax",
        "Gelara", "Hydrus", "Icarus", "Jovion", "Kryptos", "Luminar",
        "Mystara", "Nebulon", "Orionis", "Polarix", "Quasar", "Ragnarok",
        "Stellaris", "Triton", "Umbra", "Vortex", "Wraith", "Xanadu",
        "Ymir", "Zephyr"
    ];

    private constructor() {}

    /**
     * Singleton pattern to ensure only one instance of PlanetGenerator.
     */
    public static getInstance(): PlanetGenerator {
        if (!PlanetGenerator.instance) {
            PlanetGenerator.instance = new PlanetGenerator();
        }
        return PlanetGenerator.instance;
    }

    /**
     * Generates a new planet with random characteristics based on game settings.
     * @returns {Planet} The newly created planet.
     */
    public generatePlanet(): Planet {
        const name = this.planetNames[getRandomInt(0, this.planetNames.length)];
        const type = this.getRandomPlanetType();
        const resources = this.getRandomResources();
        const hazards = this.getRandomHazards();
        const position = this.getRandomPosition();

        return { name, type, resources, hazards, position };
    }

    private getRandomPlanetType(): string {
        const types = ["Earth-like", "Gas giant", "Frozen", "Desert", "Oceanic", "Volcanic"];
        return types[getRandomInt(0, types.length)];
    }

    private getRandomResources(): string[] {
        const resources = ["water", "minerals", "rare metals", "organic compounds", "energy sources"];
        return shuffleArray(resources).slice(0, getRandomInt(1, resources.length + 1));
    }

    private getRandomHazards(): string[] {
        const hazards = ["radiation storms", "meteor showers", "toxic atmospheres", "extreme temperatures", "seismic activity"];
        return shuffleArray(hazards).slice(0, getRandomInt(1, hazards.length + 1));
    }

    private getRandomPosition(): { x: number; y: number; z: number } {
        return {
            x: getRandomInt(-10000, 10001),
            y: getRandomInt(-10000, 10001),
            z: getRandomInt(-10000, 10001)
        };
    }
}

export { PlanetGenerator, Planet };
