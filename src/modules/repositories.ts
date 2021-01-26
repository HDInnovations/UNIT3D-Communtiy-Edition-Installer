import { header, info, spawn, debug, success } from '../tools/io';
import {ConfigI} from "../config";

export default (config: ConfigI, program: any) => {
  header('Repositories Module');

  config.repositories.forEach(value => {
    info(`Adding ${value} repository ...`);
    const data = spawn('add-apt-repository', ['-y', value] as never[]);
    if (program.debug) debug(data);
  });

  return success('Repositories Module Completed Successfully');
};
