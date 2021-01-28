import {header, info, ModuleResultI} from '../tools/io';
import {ConfigI} from "../config";

export default async function (config: ConfigI, _program: any): Promise<ModuleResultI> {
  header('Properties Module');

  /* repositories */
  info('Checking repositories property exists in config ...');
  if (!config.repositories) {
    return {success: false, stdout: "", message: '"repositories" property missing from config.ts'}
  }

  info('Checking repositories property is an array ...');
  if (!Array.isArray(config.repositories)) {
    return {success: false, stdout: "", message: '"repositories" property value must be an array of values'};
  }

  /* packages */
  info('Checking packages property exists in config ...');
  if (!config.packages) {
    return {success: false, stdout: "", message: '"packages" property missing from config.ts'};
  }

  info('Checking packages property is an array ...');
  if (!Array.isArray(config.packages)) {
    return {success: false, stdout: "", message: '"packages" property value must be an array of values'};
  }

  return {success: true, stdout: "", message: 'Properties Module Completed Successfully'};
};
