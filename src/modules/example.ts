import {header, info, spawn, ModuleResultI} from '../tools/io';
import {ConfigI} from "../config";

export default async function (_config: ConfigI, _program: any): Promise<ModuleResultI> {

  header('Example Module');

  info('Getting directory contents ...');
  const resp = await spawn('ls', ['-la']);
  return {success: resp.code === 0, stdout: resp.stdout, message: 'Example Module Completed Successfully'};
};
