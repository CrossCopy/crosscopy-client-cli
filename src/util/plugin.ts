// import {plugin} from '@crosscopy/core';
import {
  PluginManager,
  CorePlugin,
  ExternalPlugin,
  EncryptionPlugin,
} from '@crosscopy/core/plugin';
// const {PluginManager, corePlugins} = plugin;

// TODO: make this plugin manager generator a singleton class
export const generatePluginManager = async (
  passwordHash: string,
): Promise<PluginManager> => {
  const encryptionPlugin = new EncryptionPlugin('main-encryption-plugin', {
    passwordHash,
  });
  // const notionPlugin = new externalPlugins.NotionPlugin();
  const headPlugins: CorePlugin[] = [];
  // const tailPlugins: CorePlugin[] = [];
  const tailPlugins: CorePlugin[] = [encryptionPlugin];
  // const tailPlugins: CorePlugin[] = [];
  const _externalPlugins: ExternalPlugin[] = [];
  // const _externalPlugins: plugin.ExternalPlugin[] = [notionPlugin];
  const manager = new PluginManager(headPlugins, tailPlugins, _externalPlugins);
  // TODO: Try catch
  await manager.activate();
  return manager;
};
