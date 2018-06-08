
'use strict';

import * as vscode from 'vscode';
import * as express from "express";
import { Logger } from './modules/logger';
import * as opn from "opn";
import { Webview } from './modules/webview';

// this method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
	const logger = new Logger("Main");

	logger.log("The Simple HTTP Server extension is now active!");

	const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("shs");

	let appHandler;
	const disposalCreateServer: vscode.Disposable = vscode.commands.registerCommand("shs.createServer", (): void => {
		const serverPort: number = config.get("serverPort");
		const serverHost: string = config.get("serverHost");
		const path: string = `${vscode.workspace.rootPath}`;
		const address: string = `${serverHost}:${serverPort}`

		const webview: Webview = new Webview(address);
		vscode.workspace.onDidSaveTextDocument((_): void => webview.refresh());

		if (appHandler)
			appHandler.close();

		const app = express();
		appHandler = app.listen(serverPort, serverHost, (): void => {
			logger.logSucess(`Server listening on '${address}'`);

			vscode.window.showInformationMessage(`Simple HTTP Server running on '${address}'`, "Open in Browser", "Open in Visual Studio")
			.then((option: string): void => {
				if (option) {
					if (option == "Open in Browser")
						opn("http://" + address);
					else if (option == "Open in Visual Studio")
						webview.show();
				}
			});
		});

		app.use("/", express.static(path + "/"));

		const indexPath: string = `${path}\\${config.get("mainFile")}`
		app.get("/", (_, res: express.Response): void => {
			res.sendFile(indexPath);
		});
	});

	context.subscriptions.push(disposalCreateServer);
}

// this method is called when your extension is deactivated
export function deactivate() { }
