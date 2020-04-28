const io = require('../tools/io');

module.exports = async (config, program) => {

  io.header('NPM Packages Module');

  config.npm_packages.forEach(value => {

    io.info(`Globally Installing ${value} ...`);
    const data = io.spawn('npm', ['install', '-g', value]);
    if (program.debug) io.debug(data);

  });

  return io.success('NPM Packages Module Completed Successfully');
};
