const io = require('../tools/io');

module.exports = async (config, program) => {
  io.header('Properties Module');

  /* repositories */
  io.info('Checking repositories property exists in config ...');
  if (!config.repositories) {
    io.error('"repositories" property missing from config.js');
    process.exit(1);
  }

  io.info('Checking repositories property is an array ...');
  if (!Array.isArray(config.repositories)) {
    io.error('"repositories" property value must be an array of values');
    process.exit(1);
  }

  /* packages */
  io.info('Checking packages property exists in config ...');
  if (!config.packages) {
    io.error('"packages" property missing from config.js');
    process.exit(1);
  }

  io.info('Checking packages property is an array ...');
  if (!Array.isArray(config.packages)) {
    io.error('"packages" property value must be an array of values');
    process.exit(1);
  }

  return io.success('Properties Module Completed Successfully');
};
