import WebSocket from 'ws';
import { Player } from './base_classes';
import { GameServer } from './server';

/**
 * ClientManager module to handle client connections, disconnections, and communication.
 */

class ClientManager {
    private server: GameServer;
    private clients: Map<string, WebSocket>;

    constructor() {
        this.server = GameServer.getInstance();
        this.clients = new Map();
        this.setupClientHandlers();
    }

    /**
     * Setup handlers for client events.
     */
    private setupClientHandlers(): void {
        this.server.getServer().on('connection', (ws: WebSocket, req: any) => {
            const clientId = this.getClientId(req);
            this.clients.set(clientId, ws);

            ws.on('message', (message: string) => this.handleClientMessage(clientId, message));
            ws.on('close', () => this.handleClientDisconnect(clientId));

            console.log(`Client connected: ${clientId}`);
        });
    }

    /**
     * Extracts client ID from the request.
     * @param req - The request object from the WebSocket connection.
     * @returns The client ID as a string.
     */
    private getClientId(req: any): string {
        // Assuming client ID is passed as a query parameter in the request
        const url = new URL(req.url, `http://${req.headers.host}`);
        return url.searchParams.get('clientId') || 'unknown';
    }

    /**
     * Handles messages received from clients.
     * @param clientId - The ID of the client sending the message.
     * @param message - The message received from the client.
     */
    private handleClientMessage(clientId: string, message: string): void {
        console.log(`Message from ${clientId}: ${message}`);
        // Process message and possibly relay to other clients or handle game logic
    }

    /**
     * Handles client disconnections.
     * @param clientId - The ID of the client that disconnected.
     */
    private handleClientDisconnect(clientId: string): void {
        this.clients.delete(clientId);
        console.log(`Client disconnected: ${clientId}`);
    }

    /**
     * Sends a message to a specific client.
     * @param clientId - The ID of the client to send the message to.
     * @param message - The message to be sent.
     */
    public sendMessageToClient(clientId: string, message: string): void {
        const client = this.clients.get(clientId);
        if (client && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    }

    /**
     * Broadcasts a message to all connected clients.
     * @param message - The message to be broadcasted.
     */
    public broadcastMessage(message: string): void {
        this.clients.forEach((client, clientId) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}

export { ClientManager };
