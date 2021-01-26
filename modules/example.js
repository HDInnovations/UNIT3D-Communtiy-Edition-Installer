import { header, info, spawn, debug, success } from '../tools/io';

export default async (config, program) => {

  header('Example Module');

  info('Getting directory contents ...');
  const data = spawn('ls', ['-la']);
  if (program.debug) debug(data);

  return success('Example Module Completed Successfully');
};
