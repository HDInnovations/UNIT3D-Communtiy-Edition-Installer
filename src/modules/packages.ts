import {header, info, spawn, ModuleResultI} from '../tools/io';
import {ConfigI} from "../config";

export default async function (config: ConfigI, _program: any): Promise<ModuleResultI> {
  header('Packages Module');
  info(`Installing ${config.packages.join(" ")} ...`);
  const resp = await spawn('apt-get', ['install', '-y', config.packages.join(" ")]);
  if (resp.code !== 0) {
    return {success: false, stdout: resp.stdout, message: "Failed to install prerequisite packages"}
  }
  return {success: resp.code === 0, message: "Packages Module Completed Successfully", stdout: resp.stdout };
};
