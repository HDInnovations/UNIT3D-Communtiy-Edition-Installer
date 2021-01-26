import {spawnSync} from "child_process"
import * as chalk from "chalk";
import * as inquirer from "inquirer"

export const debug = (message: string) => console.log(chalk.blue(`[DEBUG] ${message}`));
export const warning = (message: string) => console.log(chalk.yellow(`[WARN] ${message}`));
export const success = (message: string) => console.log(chalk.green(`[OK] ${message}`));
export const error = (message: string) => console.log(chalk.red(`[ERROR] ${message}`));
export const info = (message: string) => console.log(chalk.cyan(message));

export const header = (message: string) => {
  console.log();
  console.log(chalk.magenta('='.repeat(18 + message.length)));
  console.log(chalk.magenta(`======== ${message} ========`));
  console.log(chalk.magenta('='.repeat(18 + message.length)));
};

export function spawn (command: string, args = [], options = {}): string {
  const child = spawnSync(command, args, options);

  if (child.status !== null && child.status !== 0) {

    if (child.error)
      error(`error.message: ${child.error.message}`);

    // if (child.stderr !== '')
    //   error(`stderr: ${child.stderr}`);

    error(`Exited with code ${child.status}`);
    process.exit(child.status);
  }

  return child.stdout ? child.stdout.toString().trim() : '';
}

export async function ask (questions: any[]) {
  return inquirer.prompt(questions);
}

