import { commands, ExtensionContext, window } from 'vscode';
import RenderServicesProvider from './RenderServicesProvider';
import TokenStorage from './TokenStorage';

export function activate(context: ExtensionContext) {
  TokenStorage.init(context);

  const disposable = commands.registerCommand('render.setup', async () => {
    const tokenInput = await window.showInputBox();
    await TokenStorage.instance.storeToken(tokenInput);
  });

  window.registerTreeDataProvider('dashboard', new RenderServicesProvider());
  context.subscriptions.push(disposable);
}

export function deactivate() {}
