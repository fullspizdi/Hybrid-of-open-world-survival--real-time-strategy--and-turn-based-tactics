import { Server } from './server';
import { ClientManager } from './client_manager';
import { gameLoop } from './game_loop';
import { config } from './config.json';

/**
 * Main entry point for the game server.
 */
class Main {
    private server: Server;
    private clientManager: ClientManager;

    constructor() {
        this.initializeServer();
        this.initializeClientManager();
        this.startGameLoop();
    }

    /**
     * Initializes the game server with the configuration settings.
     */
    private initializeServer(): void {
        this.server = new Server(config.gameSettings.serverCapacity);
        console.log('Server initialized with capacity:', config.gameSettings.serverCapacity);
    }

    /**
     * Initializes the client manager to handle incoming and existing connections.
     */
    private initializeClientManager(): void {
        this.clientManager = new ClientManager(this.server);
        console.log('Client Manager initialized and ready to handle connections.');
    }

    /**
     * Starts the main game loop.
     */
    private startGameLoop(): void {
        console.log('Starting the game loop...');
        setInterval(() => {
            gameLoop();
        }, 1000 / 30); // Run the game loop at approximately 30 FPS
    }
}

// Start the game
new Main();
