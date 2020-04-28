const io = require('../tools/io');

module.exports = async (config, program) => {

  io.header('UTF8 Module');

  io.info('Installing language-pack-en-base ...');
  let data = io.spawn('apt-get', ['install', '-y', 'language-pack-en-base']);
  if (program.debug) io.debug(data);

  io.info('Exporting LC_ALL=en_US.UTF-8 ...');
  data = io.spawn('export', ['LC_ALL=en_US.UTF-8']);
  if (program.debug) io.debug(data);

  io.info('Exporting LANG=en_US.UTF-8 ...');
  data = io.spawn('export', ['LANG=en_US.UTF-8']);
  if (program.debug) io.debug(data);

  io.info('Installing software-properties-common ...');
  data = io.spawn('apt-get', ['install', '-y', 'software-properties-common']);
  if (program.debug) io.debug(data);

  return io.success('UTF8 Module Completed Successfully');
};
