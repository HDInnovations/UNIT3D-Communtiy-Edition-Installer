const io = require('../tools/io');

module.exports = async (config, program) => {
  io.header('Repositories Module');

  config.repositories.forEach(value => {
    io.info(`Adding ${value} repository ...`);
    const data = io.spawn('add-apt-repository', ['-y', value]);
    if (program.debug) io.debug(data);
  });

  return io.success('Repositories Module Completed Successfully');
};
