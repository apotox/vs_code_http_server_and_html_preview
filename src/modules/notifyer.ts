
import * as vscode from 'vscode';

export class Notifyer {
	public static addUserNotification(txt: string, type?: string): void {
		const window = vscode.window;
		switch (type) {
			case "WARN":
				window.showWarningMessage(txt);
				break;
			case "ERROR":
				window.showErrorMessage(txt);
				break;
			default:
				window.showInformationMessage(txt);
		}
	}
}