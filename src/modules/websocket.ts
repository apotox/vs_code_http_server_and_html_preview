
import * as ws from "ws";
import * as http from 'http';

import { Logger } from "./logger";

export class WebSocket {
	private websocket: ws.Server;
	private sockets: ws[] = [];

	private logger: Logger = new Logger("WebSocket");

	constructor(server: http.Server) {
		this.websocket = new ws.Server({ server });

		this.init();

		this.logger.log("Created WebSocket, listing");
	}

	private init(): void {
		this.websocket.on("connection", (socket: ws, _, __): void => {
			this.logger.log("Socket Connected");

			this.sockets.push(socket);

			socket.onclose = (): void => {
				this.logger.log("Socket Disconnected");

				this.sockets.splice(this.sockets.indexOf(socket), 1);
			}
		});
	}

	public notifyRefresh(): void {
		this.logger.log("Notifying Refresh");

		this.sockets.forEach((socket: ws): void => {
			socket.send("refresh", (err: Error) => {
				if (!err) return;

				this.logger.logError(err.message);
			});
		});
	}

	public close(): void {
		this.logger.log("Closting WebSocket");

		this.websocket.close();
	}
}
