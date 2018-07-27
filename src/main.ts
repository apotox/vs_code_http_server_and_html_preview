
import * as vscode from 'vscode';

import { existsSync } from "fs";
import { Logger } from "./modules/logger";
import { HTTPServer } from "./modules/http_server";

export class Main {
	private static logger: Logger = new Logger("Main");
	private static httpServer: HTTPServer = new HTTPServer();

	public static main(context: vscode.ExtensionContext): void {
		this.logger.log("The 'HTTP Server / Review' extension is now active!");

		this.registerCommands(context);

		this.setupRefreshHandler();
	}

	private static registerCommands(context: vscode.ExtensionContext): void {
		const disposalCreateServer: vscode.Disposable = vscode.commands.registerCommand("shs.createServer", (): void => {
			const mainFile: string = vscode.workspace.getConfiguration("shs").get("mainFile");

			if (!existsSync(`${vscode.workspace.rootPath}\\${mainFile}`))
				return this.logger.logWarn(`Cannot find main file '${mainFile}', please make sure that you are in the correct directory!`, true);
	
			this.httpServer.setup(mainFile);
		});

		const disposalCreateServerWithSingleFile: vscode.Disposable = vscode.commands.registerCommand("shs.createServerWithSingleFile", (): void => {
			let mainFile: string = vscode.window.activeTextEditor.document.fileName;
			if (mainFile.startsWith("Untitled"))
				return this.logger.logWarn("The current file has to be saved on your computer in order to be launched with a HTTP server!", true);
	
			this.httpServer.setup(mainFile.substring(vscode.workspace.rootPath.length));
		});

		context.subscriptions.push(disposalCreateServerWithSingleFile, disposalCreateServer);
	}

	private static setupRefreshHandler(): void {
		vscode.workspace.onDidSaveTextDocument((_): void => this.httpServer.refresh());
	}
}