

# HTTP Server / Review

## With this extension you can create a simple http server and preview your html.

Create a HTTP server and edit your website while your Website will reload, either in your Browser or in Visual Studio Code, both works too!
Other people can join you aswell, when your TCP port is forwarded, and you give your friends your external IP address.

***

## How To Use

# Commands

Press F1 and run the commands

------

``"Simple HTTP Server: Create HTTP Server"`
After a HTTP Server has been created, and you can open the Website in Visual Studio Code or in your Browser, both works too!
When editing the files they will refresh when you save the file, if other people are on your website too, it'll refresh for them aswell!

When starting a HTTP Server without a single file make sure you are in the current directory with the main file, by default it is the "index.html" file.
If this file is in the root directory of your current project you can start the HTTP Server without any problems.

------

``"Simple HTTP Server: Create HTTP Server With Current File"`
This will be always the same function as the normal create HTTP Server. The difference is that you do not have to navigate into a folder.
You can launch a single file with this command with no futher requrements.

When starting a HTTP server with a single file make sure that the current file is saved on your computer, it can't be a Untitled file in Visual Studio Code.
So just save it on your computer and it'll work!

***

# Settings

`"shs.serverPort"` This is the port that the HTTP server will be running on, and the port you need to use to access your website.

------

`"shs.serverHost"` This is the host that the HTTP server will be running on, it'll be like "0.0.0.0", "127.0.0.0" and so on, if set to "0.0.0.0" other people can view your website too, given that they know your external IP address and your TCP port is forwarded.

------

`"shs.mainFile"` This is the main file for the HTTP server, for example the "index.html" if is differently the HTTP server will serve that as the main file.

***

# Showcase

This is a example of the Visual Studio Code HTML Preview.

![Visual Studio Code Webview](https://i.imgur.com/63Z7gkn.gif)

This is a example of the Browser HTML Preview.

![Browser Webview](https://i.imgur.com/dKUWYI8.gif)

***

## License

See Repository
