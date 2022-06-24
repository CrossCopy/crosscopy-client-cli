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
$ xcopy COMMAND
running command...
$ xcopy (--version)
crosscopy/0.0.0 darwin-arm64 node-v16.14.2
$ xcopy --help [COMMAND]
USAGE
  $ xcopy COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`xcopy .`](#xcopy-)
* [`xcopy autocomplete [SHELL]`](#xcopy-autocomplete-shell)
* [`xcopy hello PERSON`](#xcopy-hello-person)
* [`xcopy hello world`](#xcopy-hello-world)
* [`xcopy help [COMMAND]`](#xcopy-help-command)
* [`xcopy login`](#xcopy-login)
* [`xcopy plugins`](#xcopy-plugins)
* [`xcopy plugins:install PLUGIN...`](#xcopy-pluginsinstall-plugin)
* [`xcopy plugins:inspect PLUGIN...`](#xcopy-pluginsinspect-plugin)
* [`xcopy plugins:install PLUGIN...`](#xcopy-pluginsinstall-plugin-1)
* [`xcopy plugins:link PLUGIN`](#xcopy-pluginslink-plugin)
* [`xcopy plugins:uninstall PLUGIN...`](#xcopy-pluginsuninstall-plugin)
* [`xcopy plugins:uninstall PLUGIN...`](#xcopy-pluginsuninstall-plugin-1)
* [`xcopy plugins:uninstall PLUGIN...`](#xcopy-pluginsuninstall-plugin-2)
* [`xcopy plugins update`](#xcopy-plugins-update)
* [`xcopy update [CHANNEL]`](#xcopy-update-channel)
* [`xcopy upload`](#xcopy-upload)

## `xcopy .`

describe the command here

```
USAGE
  $ xcopy .

DESCRIPTION
  describe the command here

EXAMPLES
  echo "content" | xcopy

  $ xcopy < content.txt
```

_See code: [dist/commands/index.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.0/dist/commands/index.ts)_

## `xcopy autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ xcopy autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ xcopy autocomplete

  $ xcopy autocomplete bash

  $ xcopy autocomplete zsh

  $ xcopy autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.3.0/src/commands/autocomplete/index.ts)_

## `xcopy hello PERSON`

Say hello

```
USAGE
  $ xcopy hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.0/dist/commands/hello/index.ts)_

## `xcopy hello world`

Say hello world

```
USAGE
  $ xcopy hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `xcopy help [COMMAND]`

Display help for xcopy.

```
USAGE
  $ xcopy help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for xcopy.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `xcopy login`

Login to CrossCopy Cloud

```
USAGE
  $ xcopy login [-e <value>] [-p <value>]

FLAGS
  -e, --email=<value>     Email
  -p, --password=<value>  Password

DESCRIPTION
  Login to CrossCopy Cloud

EXAMPLES
  $ xcopy login

  $ xcopy login -e username@email.com -p password
```

_See code: [dist/commands/login.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.0/dist/commands/login.ts)_

## `xcopy plugins`

List installed plugins.

```
USAGE
  $ xcopy plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ xcopy plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `xcopy plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ xcopy plugins:install PLUGIN...

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
  $ xcopy plugins add

EXAMPLES
  $ xcopy plugins:install myplugin 

  $ xcopy plugins:install https://github.com/someuser/someplugin

  $ xcopy plugins:install someuser/someplugin
```

## `xcopy plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ xcopy plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ xcopy plugins:inspect myplugin
```

## `xcopy plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ xcopy plugins:install PLUGIN...

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
  $ xcopy plugins add

EXAMPLES
  $ xcopy plugins:install myplugin 

  $ xcopy plugins:install https://github.com/someuser/someplugin

  $ xcopy plugins:install someuser/someplugin
```

## `xcopy plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ xcopy plugins:link PLUGIN

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
  $ xcopy plugins:link myplugin
```

## `xcopy plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ xcopy plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ xcopy plugins unlink
  $ xcopy plugins remove
```

## `xcopy plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ xcopy plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ xcopy plugins unlink
  $ xcopy plugins remove
```

## `xcopy plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ xcopy plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ xcopy plugins unlink
  $ xcopy plugins remove
```

## `xcopy plugins update`

Update installed plugins.

```
USAGE
  $ xcopy plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `xcopy update [CHANNEL]`

update the xcopy CLI

```
USAGE
  $ xcopy update [CHANNEL] [-a] [-v <value> | -i] [--force]

FLAGS
  -a, --available        Install a specific version.
  -i, --interactive      Interactively select version to install. This is ignored if a channel is provided.
  -v, --version=<value>  Install a specific version.
  --force                Force a re-download of the requested version.

DESCRIPTION
  update the xcopy CLI

EXAMPLES
  Update to the stable channel:

    $ xcopy update stable

  Update to a specific version:

    $ xcopy update --version 1.0.0

  Interactively select version:

    $ xcopy update --interactive

  See available versions:

    $ xcopy update --available
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v3.0.0/src/commands/update.ts)_

## `xcopy upload`

Upload some content

```
USAGE
  $ xcopy upload

DESCRIPTION
  Upload some content

EXAMPLES
  echo "content" | xcopy

  $ xcopy < content.txt
```

_See code: [dist/commands/upload.ts](https://github.com/CrossCopy/crosscopy-client-cli/blob/v0.0.0/dist/commands/upload.ts)_
<!-- commandsstop -->
