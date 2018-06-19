
import * as express from "express";
import * as vscode from 'vscode';
import * as http from 'http';
import * as opn from "opn";

import { Webview, getRefreshHandler } from '../modules/webview';
import { WebSocket } from './websocket';
import { Logger } from "./logger";

const APP: express.Express = express();

let httpServer: http.Server;
export function createHTTPServer(app: express.Express): http.Server {
	if (httpServer)
		httpServer.close();
	
	httpServer = http.createServer(app);

	return httpServer;
}

let websocket: WebSocket
export function createWebSocket(server: http.Server): WebSocket {
	if (websocket)
		websocket.close();

	websocket = new WebSocket(server);

	return websocket;
}

export class HTTPServer {
	private logger: Logger = new Logger("HTTP-Server");

	private webview: Webview;
	private websocket: WebSocket;

	constructor(mainFile: string) {
		const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("shs");
		const serverPort: number = config.get("serverPort");
		const serverHost: string = config.get("serverHost");
		const address: string = `${serverHost}:${serverPort}`
		
		this.webview = new Webview(address);
		
		this.setupRefreshHandler();
		this.setupApp(mainFile);
		const server = this.setupServer(serverHost, serverPort, address);

		this.websocket = new WebSocket(server);
	}

	private setupApp(mainFile: string): void {
		const path: string = vscode.workspace.rootPath;
		APP.use("/", (req, res: express.Response, _) => {
			let url: string = req.originalUrl;
			if (url == "/")
				return res.send(getRefreshHandler(mainFile));

			res.sendFile(path + url)
		});
	}

	private setupServer(serverHost: string, serverPort: number, address: string): http.Server {
		const server: http.Server = createHTTPServer(APP);
		server.listen(serverPort, serverHost, (): void => {
			this.notifyUser(address);
		});

		return server;
	}

	private setupRefreshHandler(): void {
		vscode.workspace.onDidSaveTextDocument((_): void => this.websocket.notifyRefresh());
	}

	private notifyUser(address: string): void {
		this.logger.logSucess(`Server listening on '${address}'`);

		vscode.window.showInformationMessage(`Simple HTTP Server running on '${address}'`, "Open in Browser", "Open in Visual Studio")
		.then((option: string): void => {
			if (option) {
				if (option == "Open in Browser")
					opn("http://" + address.replace("0.0.0.0", "127.0.0.1"));
				else if (option == "Open in Visual Studio")
					this.webview.show();
			}
		});
	}
}
