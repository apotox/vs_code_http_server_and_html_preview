

# HTTP Server / Review

## With this extension you can create a simple http server and preview your html.

Create a HTTP server and edit your website while your Website will reload, either in your Browser or in Visual Studio Code, both works too!
Other people can join you aswell, when your TCP port is forwarded, and you give your friends your external IP address.

## How To Use

# Commands
Press F1 and run the command ``"Simple HTTP Server: Create Simple HTTP Server"`.
After a HTTP Server has been created, and you can open the Website in Visual Studio Code or in your Browser, both works too!
When editing the files they will refresh when you save the file, if other people are on your website too, it'll refresh for them aswell!

# Settings

`"shs.serverPort"` This is the port that the HTTP server will be running on, and the port you need to use to access your website.
`"shs.serverHost"` This is the host that the HTTP server will be running on, it'll be like "0.0.0.0", "127.0.0.0" and so on, if set to "0.0.0.0" other people can view your website too, given that they know your external IP address and your TCP port is forwarded.
`"shs.mainFile"` This is the main file for the HTTP server, for example the "index.html" if is differently the HTTP server will serve that as the main file.

# Showcase

This is a example of the Visual Studio Code HTML Preview.

![Visual Studio Code Webview](https://i.imgur.com/63Z7gkn.gifv)

This is a example of the Browser HTML Preview.

![Browser Webview](https://i.imgur.com/dKUWYI8.gifv)
