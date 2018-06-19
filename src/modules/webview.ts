
import * as vscode from 'vscode';

export function getRefreshHandler(mainFile: string): string {
	return `
	<iframe src="${mainFile}" id="shs_website" allowTransparency="false" frameborder="0"></iframe>
	<script>
		const websocket = new WebSocket("ws://" + document.location.host);

		websocket.onmessage = (event) => {
			if (event.data == "refresh") {
				const iframe = document.getElementById("shs_website");

				const currScroll = iframe.contentWindow.document.scrollingElement.scrollTop;
				
				iframe.src = iframe.contentWindow.location.href;
				
				iframe.onload = _ => {
					iframe.contentWindow.document.scrollingElement.scrollTop = currScroll;
				}
			}
		}
	</script>
	<style>
		body, iframe {
			height: 100%;
			width: 100%;
			margin: 0;
			padding: 0;
		}
	</style>
	`;
}

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
			<iframe src="http://{address}" allowTransparency="false" frameborder="0"></iframe>
		</body>
	</html>`;

	constructor(address: string) {
		this.code = this.code.replace("{address}", address.replace("0.0.0.0", "127.0.0.1"));
	}

	public show(): void {
		this.webview = vscode.window.createWebviewPanel("shs_webview", "Webview", vscode.ViewColumn.Two, {
			enableScripts: true,
			retainContextWhenHidden: true
		});

		this.webview.webview.html = this.code;
	}
}
