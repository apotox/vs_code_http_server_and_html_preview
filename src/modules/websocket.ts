
import * as ws from "ws";
import * as http from 'http';

import { Logger } from "./logger";

export class WebSocket {

	private readonly logger = new Logger("WebSocket");

	private websocket: ws.Server;
	private sockets: ws[] = [];

	constructor(server: http.Server) {
		this.websocket = new ws.Server({ server });

		this.setupConnectionHandler();

		this.logger.log("Created websocket, listing");
	}

	private setupConnectionHandler(): void {
		this.websocket.on("connection", socket => {
			this.logger.log("Socket connected");

			this.sockets.push(socket);

			socket.onclose = () => {
				this.logger.log("Socket disconnected");

				this.sockets.splice(this.sockets.indexOf(socket), 1);
			}
		});
	}

	public notifyRefresh(): void {
		this.logger.log("Notifying clients about refresh");

		this.sockets.forEach(socket => {
			socket.send("refresh", error => {
				if (!error) return;

				this.logger.logError(error);
			});
		});
	}

	public close(): void {
		this.logger.log("Closing websocket");

		this.websocket.close();
	}
}
