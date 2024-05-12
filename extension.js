const vscode = require('vscode');
let labelLookup = {};
const localizedStringsFileName = vscode.workspace.getConfiguration('lookerlabelviewer').get('localizedStringsFileName');

function watchHover() {
	vscode.languages.registerHoverProvider('lookml', {
		provideHover(document, position) {
			const lineText = document.lineAt(position.line).b;
			const splitText = lineText.split(':');
			const key = splitText[0].trim();
			const val = splitText.slice(1).join(':').trim().replace(/['"]+/g, '');
			
			if (['label', 'view_label', 'group_label', 'group_item_label', 'description'].indexOf(key) > -1) {
				const result = labelLookup[val];
				return {
					contents: [result]
				};
			}
		}
	  });
}

function updateLabelLookup() {
	if (vscode.workspace.workspaceFolders) {
		vscode.workspace.workspaceFolders.forEach((folder) => {
			vscode.workspace.findFiles(new vscode.RelativePattern(folder, '**/' + localizedStringsFileName), '', 1)
			.then((uris) => {
				const uri = uris[0];
				vscode.workspace.fs.readFile(uri).then((result) => {
					const decoder = new TextDecoder('utf-8');
					const fileText = decoder.decode(result);
					const jsonObject = JSON.parse(fileText);
					labelLookup = jsonObject;
				})
			});
		});
	}
}

function activate() {
	vscode.window.showInformationMessage('Looker Label Viewer is now active!');
	updateLabelLookup();
	watchHover();
}

vscode.workspace.onDidChangeTextDocument(event => {
	if (event.document.uri.path.endsWith(localizedStringsFileName)) {
		updateLabelLookup()
	}
});

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
