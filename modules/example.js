const io = require('../tools/io');

module.exports = async (config, program) => {

  io.header('Example Module');

  io.info('Getting directory contents ...');
  const data = io.spawn('ls', ['-la']);
  if (program.debug) io.debug(data);

  return io.success('Example Module Completed Successfully');
};
