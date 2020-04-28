const io = require('../tools/io');

module.exports = async (config, program) => {
  io.header('Packages Module');

  config.packages.forEach(value => {
    io.info(`Installing ${value} ...`);
    const data = io.spawn('apt-get', [
      'install',
      '-y',
      value
    ]);

    if (program.debug) {
      io.debug(data);
    }
  });

  return io.success('Packages Module Completed Successfully');
};
