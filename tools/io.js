const {spawnSync} = require('child_process');
const chalk = require('chalk');
const inquirer = require('inquirer');

const debug = (message) => console.log(chalk.blue(`[DEBUG] ${message}`));
const warning = (message) => console.log(chalk.yellow(`[WARN] ${message}`));
const success = (message) => console.log(chalk.green(`[OK] ${message}`));
const error = (message) => console.log(chalk.red(`[ERROR] ${message}`));
const info = (message) => console.log(chalk.cyan(message));

const header = (message) => {
  console.log();
  console.log(chalk.magenta('='.repeat(18 + message.length)));
  console.log(chalk.magenta(`======== ${message} ========`));
  console.log(chalk.magenta('='.repeat(18 + message.length)));
};

function spawn (command, args = [], options = {}) {
  const child = spawnSync(command, args, options);

  if (child.status !== null && child.status !== 0) {

    if (child.error)
      error(`error.message: ${child.error.message}`);

    if (child.stderr !== '')
      error(`stderr: ${child.stderr}`);

    error(`Exited with code ${child.status}`);
    process.exit(child.status);
  }

  return child.stdout ? child.stdout.toString().trim() : '';
}

function ask (questions) {
  return new Promise(async (resolve, reject) => {
    await inquirer.prompt(questions)
      .then(data => {
        return resolve(data);
      })
      .catch(err => {
        return reject(err);
      });
  });
}

module.exports = {
  ask,
  spawn,
  debug,
  warning,
  success,
  error,
  info,
  header,
};
