import { Player } from './base_classes';
import { WorldGenerator } from './world_generator';
import { Faction } from './faction_system';
import { getRandomInt } from './utils';

/**
 * Module responsible for handling space exploration mechanics.
 */

interface Spacecraft {
    id: number;
    name: string;
    factionId: number;
    position: { x: number; y: number; z: number };
    fuelLevel: number;
    resourceCapacity: number;
}

class SpaceExploration {
    private static instance: SpaceExploration;
    private spacecrafts: Spacecraft[] = [];

    private constructor() {}

    /**
     * Singleton pattern to ensure only one instance of SpaceExploration.
     */
    public static getInstance(): SpaceExploration {
        if (!SpaceExploration.instance) {
            SpaceExploration.instance = new SpaceExploration();
        }
        return SpaceExploration.instance;
    }

    /**
     * Launches a new spacecraft for a faction.
     * @param faction The faction launching the spacecraft.
     * @param spacecraftName The name of the new spacecraft.
     */
    launchSpacecraft(faction: Faction, spacecraftName: string) {
        const newSpacecraft: Spacecraft = {
            id: getRandomInt(1000, 9999),
            name: spacecraftName,
            factionId: faction.id,
            position: { x: 0, y: 0, z: 0 }, // Starting at the faction's home planet
            fuelLevel: 100,
            resourceCapacity: 500
        };
        this.spacecrafts.push(newSpacecraft);
        console.log(`Spacecraft ${spacecraftName} launched by Faction ${faction.name}`);
    }

    /**
     * Moves a spacecraft to a new position in space.
     * @param spacecraft The spacecraft to move.
     * @param x The x-coordinate of the destination.
     * @param y The y-coordinate of the destination.
     * @param z The z-coordinate of the destination.
     */
    moveSpacecraft(spacecraft: Spacecraft, x: number, y: number, z: number) {
        if (spacecraft.fuelLevel > 0) {
            spacecraft.position = { x, y, z };
            spacecraft.fuelLevel -= 10; // Fuel consumption for the move
            console.log(`Spacecraft ${spacecraft.name} moved to new position (${x}, ${y}, ${z}). Remaining fuel: ${spacecraft.fuelLevel}`);
        } else {
            console.log(`Spacecraft ${spacecraft.name} cannot move due to insufficient fuel.`);
        }
    }

    /**
     * Explores a planet for resources.
     * @param spacecraft The spacecraft performing the exploration.
     * @param planet The planet being explored.
     */
    explorePlanet(spacecraft: Spacecraft, planet: { name: string; resources: string[] }) {
        if (spacecraft.resourceCapacity > 0) {
            const resourcesFound = planet.resources.slice(0, spacecraft.resourceCapacity);
            console.log(`Spacecraft ${spacecraft.name} found resources on planet ${planet.name}: ${resourcesFound.join(', ')}`);
            spacecraft.resourceCapacity -= resourcesFound.length;
        } else {
            console.log(`Spacecraft ${spacecraft.name} has no capacity to gather more resources.`);
        }
    }
}

export { SpaceExploration, Spacecraft };
