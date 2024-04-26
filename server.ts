import { createServer } from 'http';
import WebSocket from 'ws';
import { Player } from './base_classes';
import { GameLoop } from './game_loop';

/**
 * Server module to handle multiplayer connections and manage game sessions.
 */

class GameServer {
    private static instance: GameServer;
    private server: WebSocket.Server;
    private players: Map<string, Player>;
    private gameLoop: GameLoop;

    private constructor() {
        this.players = new Map();
        this.server = new WebSocket.Server({ noServer: true });
        this.setupConnectionHandlers();
    }

    /**
     * Singleton pattern to ensure only one instance of the server.
     */
    public static getInstance(): GameServer {
        if (!GameServer.instance) {
            GameServer.instance = new GameServer();
        }
        return GameServer.instance;
    }

    /**
     * Setup WebSocket connection handlers.
     */
    private setupConnectionHandlers(): void {
        this.server.on('connection', (ws: WebSocket) => {
            ws.on('message', (message: string) => this.handleMessage(ws, message));
            ws.on('close', () => this.handleDisconnect(ws));
        });
    }

    /**
     * Handle incoming messages from clients.
     */
    private handleMessage(ws: WebSocket, message: string): void {
        const data = JSON.parse(message);
        switch (data.type) {
            case 'login':
                this.handleLogin(ws, data);
                break;
            case 'action':
                this.handleAction(ws, data);
                break;
            default:
                console.error('Unknown message type:', data.type);
        }
    }

    /**
     * Handle player login.
     */
    private handleLogin(ws: WebSocket, data: any): void {
        const player = new Player(data.username);
        this.players.set(ws, player);
        ws.send(JSON.stringify({ type: 'login-success', message: 'Login successful' }));
        console.log(`Player ${data.username} logged in.`);
    }

    /**
     * Handle player actions.
     */
    private handleAction(ws: WebSocket, data: any): void {
        const player = this.players.get(ws);
        if (player) {
            // Process player action here
            console.log(`Action received from ${player.username}:`, data.action);
        }
    }

    /**
     * Handle player disconnect.
     */
    private handleDisconnect(ws: WebSocket): void {
        this.players.delete(ws);
        console.log('Player disconnected.');
    }

    /**
     * Start the game server.
     */
    public start(port: number): void {
        const httpServer = createServer();
        httpServer.on('upgrade', (request, socket, head) => {
            this.server.handleUpgrade(request, socket, head, (ws) => {
                this.server.emit('connection', ws, request);
            });
        });

        httpServer.listen(port, () => {
            console.log(`Server listening on port ${port}`);
            this.gameLoop = new GameLoop(Array.from(this.players.values()));
            this.gameLoop.start();
        });
    }
}

// Start the server on port 8080
const gameServer = GameServer.getInstance();
gameServer.start(8080);
