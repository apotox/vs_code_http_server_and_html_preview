
import * as ws from "ws";
import * as http from 'http';

import { Logger } from "./logger";

export class WebSocket {
	private websocket: ws.Server;
	private sockets: ws[] = [];

	private logger: Logger = new Logger("WebSocket");

	constructor(server: http.Server) {
		this.websocket = new ws.Server({ server });

		this.setupConnectionHandler();

		this.logger.log("Created websocket, listing");
	}

	private setupConnectionHandler(): void {
		this.websocket.on("connection", (socket: ws, _, __): void => {
			this.logger.log("Socket connected");

			this.sockets.push(socket);

			socket.onclose = (): void => {
				this.logger.log("Socket disconnected");

				this.sockets.splice(this.sockets.indexOf(socket), 1);
			}
		});
	}

	public notifyRefresh(): void {
		this.logger.log("Notifying clients about refresh");

		this.sockets.forEach((socket: ws): void => {
			socket.send("refresh", (err: Error) => {
				if (!err) return;

				this.logger.logError(err.message);
			});
		});
	}

	public close(): void {
		this.logger.log("Closing websocket");

		this.websocket.close();
	}
}
