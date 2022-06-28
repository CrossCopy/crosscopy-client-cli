import {plugin} from '@crosscopy/core';

const {PluginManager, corePlugins, externalPlugins} = plugin;

export const generatePluginManager = async (passwordHash: string) => {
  const encryptionPlugin = new corePlugins.EncryptionPlugin({
    passwordHash: passwordHash,
  });
  const notionPlugin = new externalPlugins.NotionPlugin();
  const headPlugins: plugin.CorePlugin[] = [];
  const tailPlugins: plugin.CorePlugin[] = [encryptionPlugin];
  const _externalPlugins: plugin.ExternalPlugin[] = [notionPlugin];
  const manager = new PluginManager(headPlugins, tailPlugins, _externalPlugins);
  // TODO: Try catch
  await manager.activate();
  return manager;
};
