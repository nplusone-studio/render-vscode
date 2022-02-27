/* eslint-disable no-underscore-dangle */
import { ExtensionContext, SecretStorage } from 'vscode';

export default class TokenStorage {
  private static _instance: TokenStorage;

  constructor(private secretStorage: SecretStorage) {}

  static init(context: ExtensionContext): void {
    TokenStorage._instance = new TokenStorage(context.secrets);
  }

  static get instance(): TokenStorage {
    return TokenStorage._instance;
  }

  storeToken(token?: string): Thenable<void> | undefined {
    return token ? this.secretStorage.store('render_api_token', token) : undefined;
  }

  getToken(): Thenable<string | undefined> {
    return this.secretStorage.get('render_api_token');
  }
}
