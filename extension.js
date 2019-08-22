// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld-minimal-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello Waluigi!');
		const editor = vscode.window.activeTextEditor

    var firstLine = editor.document.lineAt(0)
    var lastLine = editor.document.lineAt(editor.document.lineCount - 1)
    var fullTextRange = new vscode.Range(0,
      firstLine.range.start.character,
      editor.document.lineCount - 1,
      lastLine.range.end.character);

    const selectedText = editor.selection.isEmpty ?
      editor.document.getText(fullTextRange) :
      editor.document.getText(editor.selection);

		vscode.workspace.onDidChangeTextDocument(function(TextDocumentChangeEvent) {
			console.log(TextDocumentChangeEvent.contentChanges);
		});

		axios.post('http://localhost:3000', { text: selectedText })
			.then(response => vscode.window.showInformationMessage('hi'))
			.catch(error => {
				vscode.window.showErrorMessage(error.response.data.message
					? error.response.data.message
					: error.toString())
			})
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}