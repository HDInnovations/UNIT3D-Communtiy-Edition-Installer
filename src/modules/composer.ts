import { header, info, spawn, debug, success } from '../tools/io';
import {ConfigI} from "../config";

export default async (_config: ConfigI, program: any) => {

  header('Composer Module');

  const command = 'php -r "readfile(\'http://getcomposer.org/installer\');" | sudo php -- --install-dir=/usr/bin/ --filename=composer';

  info('Installing composer ...');
  const data = spawn('sh', ['-c', command] as never[]);

  if (program.debug) debug(data);

  return success('Composer Module Completed Successfully');
};


