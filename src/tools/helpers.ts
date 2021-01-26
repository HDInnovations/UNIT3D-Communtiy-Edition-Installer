import {spawn} from "./io";
import {totalmem} from "os"

export const ip = (): string => {
  const data = spawn('hostname', ['-I'] as never[]);
  return data.split(' ')[0].trim();
};

export const distVersion = () => {
  return spawn('cut', ['-f2', '-d', ' '] as never[], {
    input: spawn('head', ['-n1', '/etc/issue'] as never[])
  });

};

export const totalMemory = () => {
  return totalmem();
};
