import { header, info, spawn, debug, success } from '../tools/io';
import {ConfigI} from "../config";

export default async function (config: ConfigI, program: any) {
  header('Repositories Module');

  config.repositories.forEach(value => {
    info(`Adding ${value} repository ...`);
    const data = spawn('add-apt-repository', ['-y', value]);
    if (program.debug) debug(data);
  });

  return success('Repositories Module Completed Successfully');
};
