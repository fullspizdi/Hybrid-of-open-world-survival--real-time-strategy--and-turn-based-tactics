import { Entity } from './base_classes';
import { getRandomInt } from './utils';

/**
 * Manages the resources within the game, including tracking, updating, and distributing resources among players and factions.
 */

interface Resource {
    name: string;
    quantity: number;
    maxCapacity: number;
}

class ResourceManager {
    private resources: Map<string, Resource>;

    constructor() {
        this.resources = new Map();
    }

    /**
     * Initializes resources with default settings from the game configuration.
     * @param initialResources - Array of resources with their initial settings.
     */
    initializeResources(initialResources: Resource[]) {
        initialResources.forEach(resource => {
            this.resources.set(resource.name, {
                name: resource.name,
                quantity: resource.quantity,
                maxCapacity: resource.maxCapacity
            });
        });
    }

    /**
     * Updates the quantity of a specific resource.
     * @param resourceName - The name of the resource to update.
     * @param amount - The amount to add or subtract from the resource's quantity.
     */
    updateResource(resourceName: string, amount: number) {
        const resource = this.resources.get(resourceName);
        if (resource) {
            resource.quantity += amount;
            // Ensure the resource quantity does not exceed its maximum capacity or fall below zero.
            resource.quantity = Math.max(0, Math.min(resource.quantity, resource.maxCapacity));
        }
    }

    /**
     * Retrieves the current status of a resource.
     * @param resourceName - The name of the resource to retrieve.
     * @returns The resource object or undefined if not found.
     */
    getResource(resourceName: string): Resource | undefined {
        return this.resources.get(resourceName);
    }

    /**
     * Processes resource consumption and production for all entities.
     * @param entities - Array of game entities that might produce or consume resources.
     */
    processResourceTick(entities: Entity[]) {
        entities.forEach(entity => {
            // Example logic for resource consumption or production
            if (entity instanceof Producer) {
                this.updateResource('food', entity.productionRate.food);
                this.updateResource('water', entity.productionRate.water);
            } else if (entity instanceof Consumer) {
                this.updateResource('food', -entity.consumptionRate.food);
                this.updateResource('water', -entity.consumptionRate.water);
            }
        });
    }
}

// Example classes for entities that might interact with resources
class Producer extends Entity {
    productionRate: { [key: string]: number };

    constructor(id: number, name: string, position: { x: number; y: number; z: number }, productionRate: { [key: string]: number }) {
        super(id, name, position);
        this.productionRate = productionRate;
    }
}

class Consumer extends Entity {
    consumptionRate: { [key: string]: number };

    constructor(id: number, name: string, position: { x: number; y: number; z: number }, consumptionRate: { [key: string]: number }) {
        super(id, name, position);
        this.consumptionRate = consumptionRate;
    }
}

export { ResourceManager, Resource, Producer, Consumer };
