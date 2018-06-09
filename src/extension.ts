
'use strict';

import * as vscode from 'vscode';
import * as express from "express";
import * as opn from "opn";
import * as http from 'http';

import { Logger } from './modules/logger';
import { Webview, getRefreshHandler } from './modules/webview';
import { WebSocket } from './modules/websocket';

// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
	const logger = new Logger("Main");

	logger.log("The Simple HTTP Server extension is now active!");

	let server: http.Server;
	let websocket: WebSocket;
	const app = express();
	const disposalCreateServer: vscode.Disposable = vscode.commands.registerCommand("shs.createServer", (): void => {
		const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("shs");
		const serverPort: number = config.get("serverPort");
		const serverHost: string = config.get("serverHost");
		const address: string = `${serverHost}:${serverPort}`

		if (server) server.close();
		server = http.createServer(app);

		const webview: Webview = new Webview(address);
		vscode.workspace.onDidSaveTextDocument((_): void => websocket.notifyRefresh());

		if (websocket) websocket.close();

		websocket = new WebSocket(server);

		const mainFile: string = config.get("mainFile");
		const path: string = `${vscode.workspace.rootPath}`;
		app.use("/", (req, res: express.Response, next) => {
			let url: string = req.originalUrl;
			if (url == "/")
				return res.send(getRefreshHandler(address, mainFile));

			res.sendFile(path + url);
		});

		server.listen(serverPort, serverHost, (): void => {
			logger.logSucess(`Server listening on '${address}'`);

			vscode.window.showInformationMessage(`Simple HTTP Server running on '${address}'`, "Open in Browser", "Open in Visual Studio")
			.then((option: string): void => {
				if (option) {
					if (option == "Open in Browser")
						opn("http://" + address.replace("0.0.0.0", "127.0.0.1"));
					else if (option == "Open in Visual Studio")
						webview.show();
				}
			});
		});
	});

	context.subscriptions.push(disposalCreateServer);
}

// this method is called when your extension is deactivated
export function deactivate() { }
