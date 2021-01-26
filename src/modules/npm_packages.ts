import { header, info, spawn, debug, success } from '../tools/io';
import {ConfigI} from "../config";

export default async function (config: ConfigI, program: any) {

  header('NPM Packages Module');

  config.npm_packages.forEach(value => {

    info(`Globally Installing ${value} ...`);
    const data = spawn('npm', ['install', '-g', value]);
    if (program.debug) debug(data);

  });

  return success('NPM Packages Module Completed Successfully');
};
