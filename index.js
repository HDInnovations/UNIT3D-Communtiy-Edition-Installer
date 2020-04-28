'use strict';
const program = require('commander');
const figlet = require('figlet');

const config = require('./config');
const io = require('./tools/io');

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

program
  .version('0.1.0', '-v, --version')
  .option('--debug', 'Run installer in debug mode to show additional output', null, false)
  .option('--disable-ssl', 'Disable SSL', null, false)
  .option('--test', 'Run a test with preconfigured values', null, false)
  .parse(process.argv);

io.info(figlet.textSync('UNIT3D', {
  font: 'Big Money-se',
  horizontalLayout: 'default',
  verticalLayout: 'default',
}));

io.info(`Installer Version: v0.1.0`);

const run = async () => {
  for (let file of steps) {
    try {
      const mod = require(`./modules/${file}`);
      await mod(config, program);
    } catch (err) {
      io.error(err);
      process.exit(1);
    }
  }

  return true;
};

run();

