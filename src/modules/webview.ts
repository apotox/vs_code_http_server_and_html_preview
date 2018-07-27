
import * as vscode from 'vscode';

export class Webview {
	private static code: string = `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8">
			<title>Simple HTTP Server</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<style>
				body, html, iframe {
					height: calc(100% - 2px);
					width: 100%;
					margin: 0;
					padding: 0;
				}
			</style>
		</head>
		<body style="background-color: white;">
			<iframe src="http://{address}" allowTransparency="false" frameborder="0"></iframe>
		</body>
	</html>`;

	public static showWebsite(address: string): void {
		const webview: vscode.WebviewPanel = vscode.window.createWebviewPanel("shs_webview", "Webview", vscode.ViewColumn.Two, {
			enableScripts: true,
			retainContextWhenHidden: true
		});

		webview.webview.html = this.code.replace("{address}", address);
	}
}
