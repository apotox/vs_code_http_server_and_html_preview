
import * as express from "express";
import * as vscode from 'vscode';
import * as http from 'http';
import * as opn from "opn";

import { Webview } from '../modules/webview';
import { WebSocket } from './websocket';
import { Logger } from "./logger";
import { Refresher } from "./refresher";

const APP: express.Express = express();

export class HTTPServer {
	private logger: Logger = new Logger("HTTP-Server");
	private httpServer: http.Server;
	private websocket: WebSocket;
	private mainFile: string;

	constructor() {
		this.setupApp();
	}

	private setupApp(): void {
		const path: string = vscode.workspace.rootPath;
		APP.use("/", (req, res: express.Response, _) => {
			let url: string = decodeURI(req.originalUrl);
			if (url == "/")
				return res.send(Refresher.getRefreshHandler(this.mainFile));

			res.sendFile(path + url)
		});
	}

	public setup(mainFile: string): void {
		this.mainFile = mainFile;

		this.setupServer();

		this.websocket = new WebSocket(this.httpServer);
	}

	private setupServer(): void {
		if (this.httpServer)
			this.httpServer.close();

		this.httpServer = http.createServer(APP);

		const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("shs");
		const serverPort: number = config.get("serverPort");
		const serverHost: string = config.get("serverHost");
		this.httpServer.listen(serverPort, serverHost, (): void => {
			this.onHTTPServerListening(`${serverHost}:${serverPort}`);
		});
	}

	public refresh(): void {
		this.websocket.notifyRefresh();
	}

	private onHTTPServerListening(address: string): void {
		address = address == "0.0.0.0" ? "127.0.0.1" : address

		this.logger.logSucess(`Server listening on '${address}'`);

		vscode.window.showInformationMessage(`Simple HTTP Server running on '${address}'`, "Open in Browser", "Open in Visual Studio")
		.then((option: string): void => {
			if (option) {
				if (option == "Open in Browser")
					opn("http://" + address);
				else if (option == "Open in Visual Studio")
					Webview.showWebsite(address);
			}
		});
	}
}
