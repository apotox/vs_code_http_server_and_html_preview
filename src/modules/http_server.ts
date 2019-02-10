
import * as express from "express";
import * as vscode from 'vscode';
import * as http from 'http';
import * as opn from "opn";
import * as isRoot from "is-root";

import { Webview } from '../modules/webview';
import { WebSocket } from './websocket';
import { Logger } from "./logger";
import { Refresher } from "./refresher";

const app = express();

export class HTTPServer {

	private readonly logger = new Logger("HTTP-Server");

	private httpServer: http.Server;
	private websocket: WebSocket;
	private mainFile: string;

	constructor() {
		const path = vscode.workspace.rootPath;
		app.use("/", (request, response) => {
			let url: string = decodeURI(request.originalUrl);
			if (url == "/") {
				response.send(Refresher.getRefreshHandler(this.mainFile));

				return;
			}

			response.sendFile(path + url);
		});
	}

	public setup(mainFile: string): void {
		this.mainFile = mainFile;

		this.setupServer();

		if (this.httpServer)
			this.websocket = new WebSocket(this.httpServer);
	}

	private setupServer(): void {
		const config = vscode.workspace.getConfiguration("shs");
		const port: number = config.get("serverPort");
		const host: string = config.get("serverHost");

		if (process.platform !== "win32" && port < 1024 && !isRoot()) {
			this.logger.logWarn("You need sudo permissions to run ports below '1024'", true);

			return;
		}

		if (this.httpServer)
			this.httpServer.close();

		this.httpServer = http.createServer(app);

		this.httpServer.listen(port, host, () => this.onHTTPServerListening(`${host}:${port}`));
	}

	public refresh(): void {
		this.websocket.notifyRefresh();
	}

	private onHTTPServerListening(address: string): void {
		address = address === "0.0.0.0" ? "127.0.0.1" : address

		this.logger.logSucess(`Server listening on '${address}'`);

		vscode.window.showInformationMessage(`Simple HTTP Server running on '${address}'`, "Open in Browser", "Open in Visual Studio")
			.then(option => {
				if (!option) return;

				if (option == "Open in Browser")
					opn("http://" + address);
				else if (option == "Open in Visual Studio")
					Webview.showWebsite(address);
		});
	}

}
