import {header, info, spawn, ModuleResultI} from '../tools/io';
import {ConfigI} from "../config";

export default async function (config: ConfigI, _program: any): Promise<ModuleResultI> {

  header('NPM Packages Module');

  info(`Globally Installing ${config.npm_packages.join(" ")} ...`);
  const data = await spawn('npm', ['install', '-g', config.npm_packages.join(" ")]);
  if (data.code !== 0) {
    return {success: false, stdout: data.stdout, message:'Failed to install NPM package(s)'};
  }
  return {success: true, stdout: data.stdout, message:'NPM Packages Module Completed Successfully'};
};
