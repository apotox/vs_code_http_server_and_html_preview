
import * as vscode from 'vscode';
import * as path from "path";

import { existsSync } from "fs";
import { Logger } from "./modules/logger";
import { HTTPServer } from "./modules/http_server";

export class Main {

	private static readonly logger = new Logger("Main");
	private static readonly httpServer = new HTTPServer();

	public static main(context: vscode.ExtensionContext): void {
		this.logger.log("The 'HTTP Server / HTML Preview' extension is now active!");

		this.registerCommands(context);
		this.setupRefreshHandler();
	}

	private static registerCommands(context: vscode.ExtensionContext): void {
		const createServer = vscode.commands.registerCommand("shs.createServer", () => {
			const file: string = vscode.workspace.getConfiguration("shs").get("mainFile");

			if (!existsSync(path.join(vscode.workspace.rootPath, file))) {
				this.logger.logWarn(`Cannot find main file '${file}', please make sure that you are in the correct directory!`, true);

				return;
			}

			this.httpServer.setup(file);
		});

		const createServerWithSingleFile = vscode.commands.registerCommand("shs.createServerWithSingleFile", () => {
			let file = vscode.window.activeTextEditor.document.fileName;
			if (file.startsWith("Untitled")) {
				this.logger.logWarn("The current file has to be saved on your computer in order to be launched with a HTTP server!", true);

				return;
			}
	
			this.httpServer.setup(file.substring(vscode.workspace.rootPath.length));
		});

		context.subscriptions.push(createServerWithSingleFile, createServer);
	}

	private static setupRefreshHandler(): void {
		vscode.workspace.onDidSaveTextDocument(() => this.httpServer.refresh());
	}

}
