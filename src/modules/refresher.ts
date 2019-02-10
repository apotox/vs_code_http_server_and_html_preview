
export class Refresher {

	public static getRefreshHandler(mainFile: string): string {
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

}