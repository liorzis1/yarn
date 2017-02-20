/* @flow */

import type Config from '../../config.js';
import buildSubCommands from './_build-sub-commands.js';

export function hasWrapper(flags: Object, args: Array<string>): boolean {
  return args[0] !== 'dir';
}

export const {run, setFlags} = buildSubCommands('logs', {
  dir(config: Config) {
    console.log(config.logsFolder);
  },
});
