
import * as vscode from 'vscode';

export class Notifyer {

	public static addUserNotification(text: string, type?: string): void {
		const window = vscode.window;

		switch (type) {
			case "WARN":
				window.showWarningMessage(text);
				break;
			case "ERROR":
				window.showErrorMessage(text);
				break;
			default:
				window.showInformationMessage(text);
		}
	}

}
