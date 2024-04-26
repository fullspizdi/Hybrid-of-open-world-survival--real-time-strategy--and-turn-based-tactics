import { Faction } from './faction_system';

/**
 * Technology tree system for managing technological advancements and research.
 */

interface Technology {
    id: number;
    name: string;
    description: string;
    requiredTechnologies: number[];
    cost: number;
    duration: number; // Time required to research in game ticks
    benefits: any; // This could be more specific based on the game design
}

class TechnologyTree {
    private technologies: Technology[];
    private researchQueue: { factionId: number; technologyId: number; progress: number }[];

    constructor() {
        this.technologies = this.loadTechnologies();
        this.researchQueue = [];
    }

    /**
     * Loads all available technologies from a data source or hardcoded.
     * @returns An array of Technology objects.
     */
    private loadTechnologies(): Technology[] {
        return [
            {
                id: 1,
                name: 'Advanced Agriculture',
                description: 'Enhances food production efficiency.',
                requiredTechnologies: [],
                cost: 500,
                duration: 120,
                benefits: { foodProduction: 20 }
            },
            {
                id: 2,
                name: 'Renewable Energy Systems',
                description: 'Develops sustainable energy sources reducing dependency on fossil fuels.',
                requiredTechnologies: [1],
                cost: 800,
                duration: 150,
                benefits: { energyEfficiency: 25 }
            },
            {
                id: 3,
                name: 'Space Exploration',
                description: 'Enables interplanetary travel and colonization.',
                requiredTechnologies: [2],
                cost: 1200,
                duration: 300,
                benefits: { newPlanets: true }
            },
            // Additional technologies can be added here
        ];
    }

    /**
     * Starts or continues research on a technology for a given faction.
     * @param faction - The faction conducting the research.
     * @param technologyId - The ID of the technology to research.
     */
    startResearch(faction: Faction, technologyId: number) {
        const technology = this.technologies.find(t => t.id === technologyId);
        if (!technology) {
            throw new Error('Technology not found');
        }

        // Check if required technologies are researched
        const hasRequiredTech = technology.requiredTechnologies.every(
            id => faction.researchedTechnologies.includes(id)
        );

        if (!hasRequiredTech) {
            throw new Error('Required technologies not researched');
        }

        // Check if already in queue
        const existingResearch = this.researchQueue.find(r => r.factionId === faction.id && r.technologyId === technologyId);
        if (existingResearch) {
            throw new Error('Research already in progress');
        }

        this.researchQueue.push({ factionId: faction.id, technologyId: technologyId, progress: 0 });
    }

    /**
     * Updates the progress of all ongoing research.
     */
    updateResearchProgress() {
        this.researchQueue.forEach(research => {
            research.progress++;
            const technology = this.technologies.find(t => t.id === research.technologyId);
            if (research.progress >= technology.duration) {
                const faction = Faction.getFactionById(research.factionId);
                faction.researchedTechnologies.push(technology.id);
                this.researchQueue = this.researchQueue.filter(r => r !== research);
            }
        });
    }
}

export { TechnologyTree };
