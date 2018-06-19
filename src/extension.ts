
'use strict';

import * as vscode from 'vscode';

import { existsSync } from "fs";
import { Logger } from './modules/logger';
import { HTTPServer } from './modules/http_server';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
	const logger = new Logger("Main");

	logger.log("The Simple HTTP Server extension is now active!");

	const disposalCreateServer: vscode.Disposable = vscode.commands.registerCommand("shs.createServer", (): void => {
		const mainFile: string = vscode.workspace.getConfiguration("shs").get("mainFile");

		if (!existsSync(vscode.workspace.rootPath + mainFile))
			return logger.logWarn(`Cannot find main file '${mainFile}', please make sure that you are in the correct directory!`, true);

		new HTTPServer(mainFile);
	});

	const disposalCreateServerWithSingleFile: vscode.Disposable = vscode.commands.registerCommand("shs.createServerWithSingleFile", (): void => {
		let mainFile: string = vscode.window.activeTextEditor.document.fileName;
		if (mainFile.startsWith("Untitled"))
			return logger.logWarn("The current file has to be saved on your computer in order to be launched with a HTTP Server!", true);

		const fileNameRegex: RegExpMatchArray | null = mainFile.match(/[^\/\\]+$/);
		if (fileNameRegex)
			mainFile = fileNameRegex[0];

		new HTTPServer(mainFile);
	});

	context.subscriptions.push(disposalCreateServerWithSingleFile, disposalCreateServer);
}

// This method is called when your extension is deactivated
export function deactivate() { }
