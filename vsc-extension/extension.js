const vscode = require('vscode');
const axios = require('axios');

function activate(context) {
	console.log('Extension BachTracking is active');

	let runCode = vscode.commands.registerCommand('extension.runCode', () => {
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

		vscode.workspace.onDidChangeTextDocument(function (TextDocumentChangeEvent) {
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

	let startBachTracking = vscode.commands.registerCommand('extension.startBachTracking', () => {
		const terminal = vscode.window.createTerminal();
		terminal.show()
		terminal.sendText("bach");
	});

	context.subscriptions.push(startBachTracking);
	context.subscriptions.push(runCode);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}