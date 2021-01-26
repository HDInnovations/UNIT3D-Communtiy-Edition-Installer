import { header, info, spawn, debug, success } from '../tools/io';
import {ConfigI} from "../config";

export default async function (_config: ConfigI, program: any) {

  header('Example Module');

  info('Getting directory contents ...');
  const data = spawn('ls', ['-la']);
  if (program.debug) debug(data);

  return success('Example Module Completed Successfully');
};
