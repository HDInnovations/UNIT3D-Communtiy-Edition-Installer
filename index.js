'use strict';
import program, { version } from 'commander';
import config from './config';
import { info, error } from './tools/io';

/*
 | Installer steps, Run the following modules in order from top to bottom.
 | The values here should be the filename of the module in the modules directory excluding the .js
 */
const steps = [
  'properties',
  'questions',
  'utf8',
  'repositories',
  'packages',
  'composer',
  'npm_packages',
  'mysql'
];

version('1.0.0', '-v, --version')
  .option('--debug', 'Run installer in debug mode to show additional output', null, false)
  .option('--disable-ssl', 'Disable SSL', null, false)
  .option('--test', 'Run a test with preconfigured values', null, false)
  .parse(process.argv);

info(`UNIT3D Community Edition Installer`);
info(`Version: v1.0.0`);

const run = async () => {
  for (let file of steps) {
    try {
      const mod = require(`./modules/${file}`);
      await mod(config, program);
    } catch (err) {
      error(err);
      process.exit(1);
    }
  }

  return true;
};

run();

