const io = require('../tools/io');

module.exports = async (config, program) => {

  io.header('Composer Module');

  const command = 'php -r "readfile(\'http://getcomposer.org/installer\');" | sudo php -- --install-dir=/usr/bin/ --filename=composer';

  io.info('Installing composer ...');
  const data = io.spawn('sh', ['-c', command]);

  if (program.debug) io.debug(data);

  return io.success('Composer Module Completed Successfully');
};


