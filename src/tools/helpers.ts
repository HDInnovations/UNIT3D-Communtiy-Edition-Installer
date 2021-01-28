import {spawn} from "./io";
import {totalmem} from "os"

export async function ip(): Promise<string> {
  const data = await spawn('hostname', ['-I']);
  return data.stdout.split(' ')[0].trim();
}

export async function distVersion(): Promise<string> {
  const input = await spawn('head', ['-n1', '/etc/issue']);
  const s = await spawn('cut', ['-f2', '-d', ' '], { input: input.stdout})
  return s.stdout;
}

export const totalMemory = (): number => {
  return totalmem();
};
