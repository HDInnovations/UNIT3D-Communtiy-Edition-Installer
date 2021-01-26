import {spawn} from "./io";
import {totalmem} from "os"

export const ip = (): string => {
  const data = spawn('hostname', ['-I']);
  return data.split(' ')[0].trim();
};

export const distVersion = () => {
  return spawn('cut', ['-f2', '-d', ' '], {
    input: spawn('head', ['-n1', '/etc/issue'])
  });

};

export const totalMemory = (): number => {
  return totalmem();
};
