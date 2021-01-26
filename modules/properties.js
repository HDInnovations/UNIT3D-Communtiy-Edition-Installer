import { header, info, error, success } from '../tools/io';

export default async (config, program) => {
  header('Properties Module');

  /* repositories */
  info('Checking repositories property exists in config ...');
  if (!config.repositories) {
    error('"repositories" property missing from config.js');
    process.exit(1);
  }

  info('Checking repositories property is an array ...');
  if (!Array.isArray(config.repositories)) {
    error('"repositories" property value must be an array of values');
    process.exit(1);
  }

  /* packages */
  info('Checking packages property exists in config ...');
  if (!config.packages) {
    error('"packages" property missing from config.js');
    process.exit(1);
  }

  info('Checking packages property is an array ...');
  if (!Array.isArray(config.packages)) {
    error('"packages" property value must be an array of values');
    process.exit(1);
  }

  return success('Properties Module Completed Successfully');
};
