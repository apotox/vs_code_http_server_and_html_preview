
import * as vscode from 'vscode';

export class Logger {
	private ExtensionName: string = "Simple HTTP Server";
	private prefix: string;

	constructor(name: string) {
		this.prefix = `[${this.ExtensionName} - ${name}]`;
	}
	
	private _log(msg: string, postfix?: string, notifyUser?: boolean): void {
		let txt: string;
		if (!postfix)
			txt = `${this.prefix} ${msg}`;
		else
			txt = `${this.prefix} [${postfix}] ${msg}`;

		console.log(txt);

		if (notifyUser) {
			if (postfix == "WARN")
				vscode.window.showWarningMessage(txt);
			else
				vscode.window.showInformationMessage(txt);
		}
	}

	public log(msg: string, notifyUser?: boolean): void {
		this._log(msg, null, notifyUser);
	}
	
	public logError(err: string, notifyUser?: boolean): void {
		const txt: string = `${this.prefix} [ERROR] ${err}`;
		console.error(txt);

		if (notifyUser)
			vscode.window.showErrorMessage(txt);
	}

	public logSucess(msg: string, notifyUser?: boolean): void {
		this._log(msg, "SUCCESS", notifyUser);
	}

	public logInfo(msg: string, notifyUser?: boolean): void {
		this._log(msg, "INFO", notifyUser);
	}

	public logDebug(msg: string, notifyUser?: boolean): void {
		this._log(msg, "DEBUG", notifyUser);
	}

	public logWarn(msg: string, notifyUser?: boolean): void {
		this._log(msg, "WARN", notifyUser);
	}
}
