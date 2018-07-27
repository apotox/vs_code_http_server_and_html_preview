
'use strict';

import * as vscode from 'vscode';

import { Main } from './main';

export function activate(context: vscode.ExtensionContext) {
	Main.main(context);
}

export function deactivate() { }
