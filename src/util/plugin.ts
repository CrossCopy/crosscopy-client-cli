import {plugin} from '@crosscopy/core';

const {PluginManager, corePlugins} = plugin;

// TODO: make this plugin manager generator a singleton class
export const generatePluginManager = async (passwordHash: string): Promise<plugin.PluginManager> => {
  const encryptionPlugin = new corePlugins.EncryptionPlugin({passwordHash});
  // const notionPlugin = new externalPlugins.NotionPlugin();
  const headPlugins: plugin.CorePlugin[] = [];
  const tailPlugins: plugin.CorePlugin[] = [encryptionPlugin];
  const _externalPlugins: plugin.ExternalPlugin[] = [];
  // const _externalPlugins: plugin.ExternalPlugin[] = [notionPlugin];
  const manager = new PluginManager(headPlugins, tailPlugins, _externalPlugins);
  // TODO: Try catch
  await manager.activate();
  return manager;
};
