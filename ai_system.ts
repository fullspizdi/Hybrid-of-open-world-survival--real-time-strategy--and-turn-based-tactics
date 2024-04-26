import { Entity, Player } from './base_classes';
import { Faction } from './faction_system';
import { getRandomInt } from './utils';

/**
 * AI system to manage non-player characters and autonomous behaviors within the game.
 */

interface AIEntity extends Entity {
    decisionMakingProcess: () => void;
}

class GhostAI implements AIEntity {
    id: number;
    name: string;
    position: { x: number; y: number; z: number };
    behaviorType: string;

    constructor(id: number, name: string, position: { x: number; y: number; z: number }, behaviorType: string) {
        super(id, name, position);
        this.behaviorType = behaviorType;
    }

    decisionMakingProcess() {
        switch (this.behaviorType) {
            case 'hostile':
                this.performHostileActions();
                break;
            case 'neutral':
                this.performNeutralActions();
                break;
            case 'friendly':
                this.performFriendlyActions();
                break;
            default:
                console.log("No behavior defined");
        }
    }

    performHostileActions() {
        console.log(`${this.name} is performing hostile actions.`);
        // Implementation of hostile actions like attacking players or sabotaging structures
    }

    performNeutralActions() {
        console.log(`${this.name} is performing neutral actions.`);
        // Implementation of neutral actions like wandering or observing
    }

    performFriendlyActions() {
        console.log(`${this.name} is performing friendly actions.`);
        // Implementation of friendly actions like assisting players or repairing structures
    }
}

class AISystem {
    aiEntities: AIEntity[];

    constructor() {
        this.aiEntities = [];
    }

    addAIEntity(aiEntity: AIEntity) {
        this.aiEntities.push(aiEntity);
    }

    updateAIEntities() {
        this.aiEntities.forEach(aiEntity => {
            aiEntity.decisionMakingProcess();
        });
    }
}

export { AISystem, GhostAI };
