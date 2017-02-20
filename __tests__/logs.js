/* @flow */

import NoopReporter from '../src/reporters/base-reporter.js';
import makeTemp from './_temp';
import * as fs from '../src/util/fs.js';

const path = require('path');
const exec = require('child_process').exec;
const glob = require('glob');

const fixturesLoc = path.join(__dirname, './fixtures/lifecycle-scripts');
const yarnBin = path.join(__dirname, '../bin/yarn.js');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

async function execCommand(cmd: string, packageName: string, env = process.env): Promise<string> {
  const srcPackageDir = path.join(fixturesLoc, packageName);
  const packageDir = await makeTemp(packageName);

  await fs.copy(srcPackageDir, packageDir, new NoopReporter());

  return new Promise((resolve, reject) => {

    exec(`node ${yarnBin} ${cmd}`, {cwd:packageDir, env}, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout.toString());
      }
    });
  });
}

test('should generate a log', () => {

});
