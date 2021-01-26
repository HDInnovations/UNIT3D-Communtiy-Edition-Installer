import { header, info, spawn, debug, success } from '../tools/io';

export default async (config, program) => {
  header('Packages Module');

  config.packages.forEach(value => {
    info(`Installing ${value} ...`);
    const data = spawn('apt-get', [
      'install',
      '-y',
      value
    ]);

    if (program.debug) {
      debug(data);
    }
  });

  return success('Packages Module Completed Successfully');
};
