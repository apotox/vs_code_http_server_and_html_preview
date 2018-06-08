
import * as vscode from 'vscode';

export class Webview {
	private webview: vscode.WebviewPanel;
	private code: string = `<!DOCTYPE html>
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
			<iframe src="http://{address}" name="shs_webview" allowTransparency="false" frameborder="0"></iframe>
		</body>
	</html>`;

	constructor(address: string) {
		this.code = this.code.replace("{address}", address);
	}

	public refresh(): void {
		this.webview.webview.html = "";
		this.webview.webview.html = this.code;
	}

	public show(): void {
		this.webview = vscode.window.createWebviewPanel("shs_webview", "Simple HTTP Server", vscode.ViewColumn.One, {
			enableScripts: true,
			retainContextWhenHidden: true
		});

		this.webview.webview.html = this.code;
	}
}
