
import * as vscode from 'vscode';
import { Notifyer } from './notifyer';

export class Logger {

	private readonly ExtensionName = "Simple HTTP Server";

	private prefix: string;

	constructor(name: string) {
		this.prefix = `[${this.ExtensionName} - ${name}]`;
	}
	
	private internalLog(message: string, type?: string, notifyUser?: boolean): void {
		let text = !!type
			? `${this.prefix} [${type}] ${message}`
			: `${this.prefix} ${message}`;

		console.log(text);

		if (notifyUser)
			Notifyer.addUserNotification(text, type);
	}

	public log(message: string, notifyUser?: boolean): void {
		this.internalLog(message, null, notifyUser);
	}
	
	public logError(error: string | Error, notifyUser?: boolean): void {
		const text = `${this.prefix} [ERROR] ${(error instanceof Error) ? error.message : error}`
		console.error(text);

		if (notifyUser)
			Notifyer.addUserNotification(text, "ERROR");
	}

	public logSucess(message: string, notifyUser?: boolean): void {
		this.internalLog(message, "SUCCESS", notifyUser);
	}

	public logInfo(message: string, notifyUser?: boolean): void {
		this.internalLog(message, "INFO", notifyUser);
	}

	public logDebug(message: string, notifyUser?: boolean): void {
		this.internalLog(message, "DEBUG", notifyUser);
	}

	public logWarn(message: string, notifyUser?: boolean): void {
		this.internalLog(message, "WARN", notifyUser);
	}
}
