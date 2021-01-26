import { header, info, spawn, debug, success } from '../tools/io';
import {ConfigI} from "../config";

export default async (config: ConfigI, program: any) => {

  header('NPM Packages Module');

  config.npm_packages.forEach(value => {

    info(`Globally Installing ${value} ...`);
    const data = spawn('npm', ['install', '-g', value] as never[]);
    if (program.debug) debug(data);

  });

  return success('NPM Packages Module Completed Successfully');
};
