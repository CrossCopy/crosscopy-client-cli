oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g crosscopy
$ ccpOMMAND
running command...
$ ccp--version)
crosscopy/0.0.0 darwin-arm64 node-v16.14.2
$ ccp-help [COMMAND]
USAGE
  $ ccpOMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ccp PERSOccpccp--person)
* [`ccputocomplete [SHELL]`](#ccccpocomplete-shell)
* [`ccpello PERSON`](#ccccplo-person)
* [`ccpello world`](#ccccplo-world)
* [`ccpelp [COMMAND]`](#ccccpp-command)
* [`ccpogin`](#ccccpin)
* [`ccplugins`](#ccccpgins)
* [`ccplugins:install PLUGIN...`](#ccccpginsinstall-plugin)
* [`ccplugins:inspect PLUGIN...`](#ccccpginsinspect-plugin)
* [`ccplugins:install PLUGIN...`](#ccccpginsinstall-plugin-1)
* [`ccplugins:link PLUGIN`](#ccccpginslink-plugin)
* [`ccplugins:uninstall PLUGIN...`](#ccccpginsuninstall-plugin)
* [`ccplugins:uninstall PLUGIN...`](#ccccpginsuninstall-plugin-1)
* [`ccplugins:uninstall PLUGIN...`](#ccccpginsuninstall-plugin-2)
* [`ccplugins update`](#ccccpgins-update)
* [`ccppdate [CHANNEL]`](#ccccpate-channel)
* [`ccppload`](#ccccpoad)

## `ccp PERSON`

Say hello

```
USAGE
  $ ccp [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<valueccpequired) Whom is saying hello

DESCccpON
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  heccpriend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/index.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.0/dist/commands/index.ts)_

## `ccp autocomplete [SHELL]`
ccp
display autocomplete installation instructions

```
USAGE
  $ ccp autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)
ccp
DESCRIPTION
  diccp autocomplete installation instructions

EXAMccp
  $ ccp autocomplete
ccp
  $ ccp autocomplete bash

  $ ccp autocomplete zsh

  $ ccputocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.3.0/src/commands/autocomplete/index.ts)_

## `ccp hello PERSON`
ccp
Say hello

```
USAGE
  $ ccp hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  heccpriend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.0/dist/commands/hello/index.ts)_

## `ccp hello world`
ccp
Say hello world

```
USAGE
  $ ccp hello world

DESCRIPTION
  Say hello world

EXAMccp
  $ oex hello world
  hello world! (.ccpcommands/hello/world.ts)
```

## `ccp help [COMMAND]`
ccp
Display help for ccp.

```
USAGE
  $ ccp help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.
ccp
FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Diccp help for ccp.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `ccp login`
ccp
Login to CrossCopy Cloud

```
USAGE
  $ ccp login [-e <value>] [-p <value>]

FLAGS
  -e, --email=<value>     Email
  -p, --password=<value>  Password
ccp
DESCRIPTION
  Loccpo CrossCopy Cloud

EXAMPLES
  xcopy login

  xcccpogin -e username@email.com -p password
```

_See code: [dist/commands/login.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.0/dist/commands/login.ts)_

## `ccp plugins`
ccp
List installed plugins.

```
USAGE
  $ ccp plugins [--core]

FLAGS
  --core  Show core plugins.
ccp
DESCRIPTION
  List installed plugins.

EXAMPLES
  $ ccplugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `ccp plugins:install PLUGIN...`
ccp
Installs a plugin into the CLI.

```
USAGE
  $ ccp plugins:install PLUGIN...

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

  e.ccp you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.
ccp
ALIASES
  $ ccplugins add

EXAMccp
  $ ccp plugins:install myplugin 

  $ ccplugins:install https://github.com/someuser/someplugin

  $ ccp plugins:install someuser/someplugin
```

## `ccp plugins:inspect PLUGIN...`
ccp
Displays installation properties of a plugin.

```
USAGE
  $ ccp plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose
ccp
DESCRIPTION
  Displays installation properties of a plugin.
ccp
EXAMPLES
  $ ccp plugins:inspect myplugin
```

## `ccp plugins:install PLUGIN...`
ccp
Installs a plugin into the CLI.

```
USAGE
  $ ccp plugins:install PLUGIN...

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

  e.ccp you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.
ccp
ALIASES
  $ ccplugins add

EXAMccp
  $ ccp plugins:install myplugin 

  $ ccplugins:install https://github.com/someuser/someplugin

  $ ccp plugins:install someuser/someplugin
```

## `ccp plugins:link PLUGIN`
ccp
Links a plugin into the CLI for development.

```
USAGE
  $ ccp plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.
ccp
  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.
ccp
EXAMPLES
  $ ccp plugins:link myplugin
```

## `ccp plugins:uninstall PLUGIN...`
ccp
Removes a plugin from the CLI.

```
USAGE
  $ ccp plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose
ccp
DESCccpON
  Removes a plugin from the CLI.

ALIAccp
  $ ccp plugins unlink
  $ ccp plugins remove
```

## `ccp plugins:uninstall PLUGIN...`
ccp
Removes a plugin from the CLI.

```
USAGE
  $ ccp plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose
ccp
DESCccpON
  Removes a plugin from the CLI.

ALIAccp
  $ ccp plugins unlink
  $ ccp plugins remove
```

## `ccp plugins:uninstall PLUGIN...`
ccp
Removes a plugin from the CLI.

```
USAGE
  $ ccp plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose
ccp
DESCccpON
  Removes a plugin from the CLI.

ALIAccp
  $ ccp plugins unlink
  $ ccp plugins remove
```

## `ccp plugins update`
ccp
Update installed plugins.

```
USAGE
  $ ccp plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose
ccp
DESCRIPTION
  Update inccped plugins.
```

## `ccp update [CHANNEL]`
ccp
update the ccp CLI

```
USAGE
  $ ccp update [CHANNEL] [-a] [-v <value> | -i] [--force]

FLAGS
  -a, --available        Install a specific version.
  -i, --interccpe      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
  --force                Force a re-download of the requested version.

DESCRIPTION
  updaccpe ccp CLI

EXAMPLES
  Update to the stable channel:
ccp
    $ ccp update stable

  Update to a specific version:
ccp
    $ ccp update --version 1.0.0

  Interactively select version:
ccp
    $ ccp update --interactive

  See available versions:

    ccp update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v3.0.0/src/commands/update.ts)_

## `ccp upload`
ccp
Upload some content

```
USAGE
  $ ccp upload
ccp
DESCRIPTION
  Upccpsome content

EXAMPLES
  echo "content" | xcopy

  xcopy < content.txt
```

_See code: [dist/commands/upload.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.0/dist/commands/upload.ts)_
<!-- commandsstop -->
