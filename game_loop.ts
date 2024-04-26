import { Player } from './base_classes';
import { getRandomInt, shuffleArray } from './utils';
import { updateResourceLevels, processCrafting, handleCombat } from './resource_management';
import { generateWorld, updateWorld } from './world_generator';
import { manageFactions } from './faction_system';
import { advanceTechnology } from './technology_tree';
import { exploreSpace } from './space_exploration';
import { conductFleetOperations } from './combat_fleet';
import { runAI } from './ai_system';
import { evolveNarrative } from './narrative_engine';
import { simulateEconomy } from './economy_system';
import { handleEnvironmentalChallenges } from './environmental_challenges';

/**
 * Main game loop managing the flow of the game.
 */
class GameLoop {
    players: Player[];
    isGameActive: boolean;

    constructor(players: Player[]) {
        this.players = players;
        this.isGameActive = true;
        generateWorld();
    }

    /**
     * Starts the game loop, iterating through phases and handling player actions.
     */
    start() {
        while (this.isGameActive) {
            this.phaseOne(); // Scavenging & Survival
            this.phaseTwo(); // Community Building
            this.phaseThree(); // Technological Advancement
            this.phaseFour(); // Stellar Exploration
            this.phaseFive(); // Interstellar Conflict
        }
    }

    /**
     * Phase 1: Scavenging & Survival
     */
    phaseOne() {
        this.players.forEach(player => {
            updateResourceLevels(player);
            processCrafting(player);
        });
        handleEnvironmentalChallenges();
    }

    /**
     * Phase 2: Community Building
     */
    phaseTwo() {
        manageFactions(this.players);
        this.players.forEach(player => {
            updateResourceLevels(player);
        });
    }

    /**
     * Phase 3: Technological Advancement
     */
    phaseThree() {
        this.players.forEach(player => {
            advanceTechnology(player);
        });
        updateWorld();
    }

    /**
     * Phase 4: Stellar Exploration
     */
    phaseFour() {
        this.players.forEach(player => {
            exploreSpace(player);
        });
    }

    /**
     * Phase 5: Interstellar Conflict
     */
    phaseFive() {
        conductFleetOperations(this.players);
        this.players.forEach(player => {
            handleCombat(player);
        });
        runAI();
        evolveNarrative();
        simulateEconomy();
    }

    /**
     * Ends the game loop.
     */
    end() {
        this.isGameActive = false;
    }
}

export default GameLoop;
