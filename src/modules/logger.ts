
import * as vscode from 'vscode';
import { Notifyer } from './notifyer';

export class Logger {
	private ExtensionName: string = "Simple HTTP Server";
	private prefix: string;

	constructor(name: string) {
		this.prefix = `[${this.ExtensionName} - ${name}]`;
	}
	
	private internalLog(msg: string, type?: string, notifyUser?: boolean): void {
		let txt: string;
		if (!type)
			txt = `${this.prefix} ${msg}`;
		else
			txt = `${this.prefix} [${type}] ${msg}`;

		console.log(txt);

		if (notifyUser)
			Notifyer.addUserNotification(txt, type);
	}

	public log(msg: string, notifyUser?: boolean): void {
		this.internalLog(msg, null, notifyUser);
	}
	
	public logError(err: string, notifyUser?: boolean): void {
		const txt: string = `${this.prefix} [ERROR] ${err}`;
		console.error(txt);

		if (notifyUser)
			Notifyer.addUserNotification(txt, "ERROR");
	}

	public logSucess(msg: string, notifyUser?: boolean): void {
		this.internalLog(msg, "SUCCESS", notifyUser);
	}

	public logInfo(msg: string, notifyUser?: boolean): void {
		this.internalLog(msg, "INFO", notifyUser);
	}

	public logDebug(msg: string, notifyUser?: boolean): void {
		this.internalLog(msg, "DEBUG", notifyUser);
	}

	public logWarn(msg: string, notifyUser?: boolean): void {
		this.internalLog(msg, "WARN", notifyUser);
	}
}
