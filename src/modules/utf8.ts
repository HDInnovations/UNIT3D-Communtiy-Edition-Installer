import { header, info, spawn, debug, success } from '../tools/io';
import {ConfigI} from "../config";

export default async function(_config: ConfigI, program: any) {

  header('UTF8 Module');

  info('Installing language-pack-en-base ...');
  let data = spawn('apt-get', ['install', '-y', 'language-pack-en-base']);
  if (program.debug) debug(data);

  info('Exporting LC_ALL=en_US.UTF-8 ...');
  data = spawn('export', ['LC_ALL=en_US.UTF-8']);
  if (program.debug) debug(data);

  info('Exporting LANG=en_US.UTF-8 ...');
  data = spawn('export', ['LANG=en_US.UTF-8']);
  if (program.debug) debug(data);

  info('Installing software-properties-common ...');
  data = spawn('apt-get', ['install', '-y', 'software-properties-common']);
  if (program.debug) debug(data);

  return success('UTF8 Module Completed Successfully');
};
