crosscopy cli
=================

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
![npm](https://img.shields.io/npm/v/crosscopy)
![npm](https://img.shields.io/npm/dt/crosscopy)
![NPM](https://img.shields.io/npm/l/crosscopy)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g crosscopy
$ xc COMMAND
running command...
$ xc (--version)
crosscopy/0.0.11 darwin-arm64 node-v18.12.1
$ xc --help [COMMAND]
USAGE
  $ xc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`xc autocomplete [SHELL]`](#xc-autocomplete-shell)
* [`xc clear`](#xc-clear)
* [`xc copy [FILE]`](#xc-copy-file)
* [`xc delete [FILE]`](#xc-delete-file)
* [`xc exp`](#xc-exp)
* [`xc help [COMMANDS]`](#xc-help-commands)
* [`xc listen`](#xc-listen)
* [`xc login`](#xc-login)
* [`xc paste [FILE]`](#xc-paste-file)
* [`xc plugins`](#xc-plugins)
* [`xc plugins:install PLUGIN...`](#xc-pluginsinstall-plugin)
* [`xc plugins:inspect PLUGIN...`](#xc-pluginsinspect-plugin)
* [`xc plugins:install PLUGIN...`](#xc-pluginsinstall-plugin-1)
* [`xc plugins:link PLUGIN`](#xc-pluginslink-plugin)
* [`xc plugins:uninstall PLUGIN...`](#xc-pluginsuninstall-plugin)
* [`xc plugins:uninstall PLUGIN...`](#xc-pluginsuninstall-plugin-1)
* [`xc plugins:uninstall PLUGIN...`](#xc-pluginsuninstall-plugin-2)
* [`xc plugins update`](#xc-plugins-update)
* [`xc profile add [FILE]`](#xc-profile-add-file)
* [`xc profile delete [FILE]`](#xc-profile-delete-file)
* [`xc profile ls [FILE]`](#xc-profile-ls-file)
* [`xc profile rename [FILE]`](#xc-profile-rename-file)
* [`xc register`](#xc-register)
* [`xc root`](#xc-root)
* [`xc setting`](#xc-setting)
* [`xc setting set`](#xc-setting-set)
* [`xc sync [LISTEN]`](#xc-sync-listen)
* [`xc update [CHANNEL]`](#xc-update-channel)
* [`xc view`](#xc-view)

## `xc autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ xc autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ xc autocomplete

  $ xc autocomplete bash

  $ xc autocomplete zsh

  $ xc autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.4.2/src/commands/autocomplete/index.ts)_

## `xc clear`

Clear config and data

```
USAGE
  $ xc clear [-d] [-c] [-a]

FLAGS
  -a, --all
  -c, --config
  -d, --data

DESCRIPTION
  Clear config and data

EXAMPLES
  $ xc clear

  $ xc clear --data

  $ xc clear --config

  $ xc clear --data --config

  $ xc clear --all
```

_See code: [dist/commands/clear.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.11/dist/commands/clear.ts)_

## `xc copy [FILE]`

Copy content piped to stdin

```
USAGE
  $ xc copy [FILE] [--image]

FLAGS
  --image  Image File, without this flag, files will be interpreted as UTF8 Text File

DESCRIPTION
  Copy content piped to stdin

EXAMPLES
  echo content | xc copy

  $ xc copy

  $ xc copy <filename.txt>
```

_See code: [dist/commands/copy.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.11/dist/commands/copy.ts)_

## `xc delete [FILE]`

Delete Records, Flags can be combined, each flag will be evaluated separately.

```
USAGE
  $ xc delete [FILE] [-a] [-s <value>] [-e <value>] [-y] [-i <value>] [-n <value>]

FLAGS
  -a, --all              delete all records
  -e, --end=<value>      end index
  -i, --idx=<value>      Index of record to delete
  -n, --numDays=<value>  Delete records older than n days
  -s, --start=<value>    start index
  -y, --yes              Confirm Deletion without prompt

DESCRIPTION
  Delete Records, Flags can be combined, each flag will be evaluated separately.

EXAMPLES
  $ xc delete

  $ xc delete --all

  $ xc delete --all -y

  $ xc delete --idx 6

  $ xc delete --start 6 --end 10

  $ xc delete --numDays=7
```

_See code: [dist/commands/delete.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.11/dist/commands/delete.ts)_

## `xc exp`

describe the command here

```
USAGE
  $ xc exp

DESCRIPTION
  describe the command here

EXAMPLES
  $ xc exp
```

_See code: [dist/commands/exp.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.11/dist/commands/exp.ts)_

## `xc help [COMMANDS]`

Display help for xc.

```
USAGE
  $ xc help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for xc.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.1/src/commands/help.ts)_

## `xc listen`

Realtime Syncing

```
USAGE
  $ xc listen

DESCRIPTION
  Realtime Syncing

EXAMPLES
  $ xc listen
```

_See code: [dist/commands/listen.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.11/dist/commands/listen.ts)_

## `xc login`

Login to CrossCopy Cloud

```
USAGE
  $ xc login [-e <value>] [-p <value>] [--profile <value>] [--device <value>]

FLAGS
  -e, --email=<value>     Email
  -p, --password=<value>  Password
  --device=<value>        Device Name
  --profile=<value>       Profile Name

DESCRIPTION
  Login to CrossCopy Cloud

EXAMPLES
  $ xc login

  $ xc login -e username@email.com -p password
```

_See code: [dist/commands/login.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.11/dist/commands/login.ts)_

## `xc paste [FILE]`

Get Clipboard History Item

```
USAGE
  $ xc paste [FILE] [--id <value>] [--uuid <value>] [-c] [--imageFile <value>]

FLAGS
  -c, --toClipboard    Output to clipboard.
  --id=<value>         Database id of clipboard item to get
  --imageFile=<value>  Output to image file, only ends with .png
  --uuid=<value>       uuid of clipboard item to get

DESCRIPTION
  Get Clipboard History Item

  Paste: Get clipboard history item, output to stdout or clipboard

EXAMPLES
  $ xc paste

  $ xc paste --id 10

  $ xc paste --uuid <uuid>

  $ xc paste --id 10 --toClipboard

  $ xc paste --uuid <uuid> --imageFile image.png
```

_See code: [dist/commands/paste.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.11/dist/commands/paste.ts)_

## `xc plugins`

List installed plugins.

```
USAGE
  $ xc plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ xc plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.2.4/src/commands/plugins/index.ts)_

## `xc plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ xc plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ xc plugins add

EXAMPLES
  $ xc plugins:install myplugin 

  $ xc plugins:install https://github.com/someuser/someplugin

  $ xc plugins:install someuser/someplugin
```

## `xc plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ xc plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ xc plugins:inspect myplugin
```

## `xc plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ xc plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ xc plugins add

EXAMPLES
  $ xc plugins:install myplugin 

  $ xc plugins:install https://github.com/someuser/someplugin

  $ xc plugins:install someuser/someplugin
```

## `xc plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ xc plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ xc plugins:link myplugin
```

## `xc plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ xc plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ xc plugins unlink
  $ xc plugins remove
```

## `xc plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ xc plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ xc plugins unlink
  $ xc plugins remove
```

## `xc plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ xc plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ xc plugins unlink
  $ xc plugins remove
```

## `xc plugins update`

Update installed plugins.

```
USAGE
  $ xc plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `xc profile add [FILE]`

describe the command here

```
USAGE
  $ xc profile add [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ xc profile add
```

## `xc profile delete [FILE]`

describe the command here

```
USAGE
  $ xc profile delete [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ xc profile delete
```

## `xc profile ls [FILE]`

describe the command here

```
USAGE
  $ xc profile ls [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ xc profile ls
```

## `xc profile rename [FILE]`

describe the command here

```
USAGE
  $ xc profile rename [FILE] [-n <value>] [-f]

FLAGS
  -f, --force
  -n, --name=<value>  name to print

DESCRIPTION
  describe the command here

EXAMPLES
  $ xc profile rename
```

## `xc register`

describe the command here

```
USAGE
  $ xc register [-e <value>] [-u <value>] [-p <value>]

FLAGS
  -e, --email=<value>     Email
  -p, --password=<value>  Password
  -u, --username=<value>  Username

DESCRIPTION
  describe the command here

EXAMPLES
  $ xc register -e example@email.com -u username -p password

  $ xc register -e example@email.com -u username
```

_See code: [dist/commands/register.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.11/dist/commands/register.ts)_

## `xc root`

Root Command

```
USAGE
  $ xc root

DESCRIPTION
  Root Command
```

_See code: [dist/commands/root.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.11/dist/commands/root.ts)_

## `xc setting`

Visualize Current Setting

```
USAGE
  $ xc setting

DESCRIPTION
  Visualize Current Setting

EXAMPLES
  $ xc setting
```

_See code: [dist/commands/setting/index.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.11/dist/commands/setting/index.ts)_

## `xc setting set`

Set Setting

```
USAGE
  $ xc setting set [--mode online|offline] [--server <value>] [--device <value>]

FLAGS
  --device=<value>  set device name
  --mode=<option>   set mode
                    <options: online|offline>
  --server=<value>  set server url

DESCRIPTION
  Set Setting

EXAMPLES
  $ xc setting set --mode=offline --server=http://api.crosscopy.io
```

## `xc sync [LISTEN]`

Sync Data With CrossCopy Cloud

```
USAGE
  $ xc sync [LISTEN] [-i]

FLAGS
  -i, --image  Sync Image from clipboard, without this flag, sync clipboard text by default

DESCRIPTION
  Sync Data With CrossCopy Cloud

EXAMPLES
  $ xc sync
```

_See code: [dist/commands/sync.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.11/dist/commands/sync.ts)_

## `xc update [CHANNEL]`

update the xc CLI

```
USAGE
  $ xc update [CHANNEL] [-a] [-v <value> | -i] [--force]

FLAGS
  -a, --available        Install a specific version.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
  --force                Force a re-download of the requested version.

DESCRIPTION
  update the xc CLI

EXAMPLES
  Update to the stable channel:

    $ xc update stable

  Update to a specific version:

    $ xc update --version 1.0.0

  Interactively select version:

    $ xc update --interactive

  See available versions:

    $ xc update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v3.1.0/src/commands/update.ts)_

## `xc view`

View Clipboard Data

```
USAGE
  $ xc view [--uuid] [-n <value>]

FLAGS
  -n, --num=<value>  Number of records to display
  --uuid             Display UUID (takes more space, but could be used to delete records)

DESCRIPTION
  View Clipboard Data

EXAMPLES
  $ xc view
```

_See code: [dist/commands/view.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.11/dist/commands/view.ts)_
<!-- commandsstop -->
