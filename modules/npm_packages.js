import { header, info, spawn, debug, success } from '../tools/io';

export default async (config, program) => {

  header('NPM Packages Module');

  config.npm_packages.forEach(value => {

    info(`Globally Installing ${value} ...`);
    const data = spawn('npm', ['install', '-g', value]);
    if (program.debug) debug(data);

  });

  return success('NPM Packages Module Completed Successfully');
};
