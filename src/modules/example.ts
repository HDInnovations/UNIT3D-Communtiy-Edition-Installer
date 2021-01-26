import { header, info, spawn, debug, success } from '../tools/io';
import {ConfigI} from "../config";

export default async (_config: ConfigI, program: any) => {

  header('Example Module');

  info('Getting directory contents ...');
  const data = spawn('ls', ['-la'] as never[]);
  if (program.debug) debug(data);

  return success('Example Module Completed Successfully');
};
