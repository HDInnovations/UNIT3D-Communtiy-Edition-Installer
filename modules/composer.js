import { header, info, spawn, debug, success } from '../tools/io';

export default async (config, program) => {

  header('Composer Module');

  const command = 'php -r "readfile(\'http://getcomposer.org/installer\');" | sudo php -- --install-dir=/usr/bin/ --filename=composer';

  info('Installing composer ...');
  const data = spawn('sh', ['-c', command]);

  if (program.debug) debug(data);

  return success('Composer Module Completed Successfully');
};


