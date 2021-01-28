import {spawnSync} from "child_process"
import {blue, yellow, green, red,cyan, magenta} from "chalk";
import * as inquirer from "inquirer"

export const debug = (message: string) => console.log(blue(`[DEBUG] ${message}`));
export const warning = (message: string) => console.log(yellow(`[WARN] ${message}`));
export const success = (message: string) => console.log(green(`[OK] ${message}`));
export const error = (message: string) => console.log(red(`[ERROR] ${message}`));
export const info = (message: string) => console.log(cyan(message));

export interface CommandResultI {
  code: number
  stdout: string
}

export interface ModuleResultI {
  success: boolean
  stdout: string
  message: string
}

export interface CommandArgsI {
  cmd: string
  args: string[]
  name: string
}

export const header = (message: string) => {
  console.log();
  console.log(magenta('='.repeat(18 + message.length)));
  console.log(magenta(`======== ${message} ========`));
  console.log(magenta('='.repeat(18 + message.length)));
};

export async function  spawn (command: string, args?: any[], options?: object): Promise<CommandResultI> {
  const child = spawnSync(command, args, options);
  if (child.status !== null && child.status !== 0) {
    let err = "";
    if (child.error) {
      err = `error.message: ${child.error.message}`;
    } else if (child.stderr.toString() !== '') {
      err = `stderr: ${child.stderr.toString()}`;
    }
    return {code: child.status, stdout: err ?? ""}
  }

  return {code: 0, stdout: child.stdout ? child.stdout.toString().trim() : ''}
}

export async function ask (questions: any[]) {
  return inquirer.prompt(questions);
}

