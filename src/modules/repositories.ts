import {header, info, spawn, ModuleResultI} from '../tools/io';
import {ConfigI} from "../config";

export default async function (config: ConfigI, _program: any): Promise<ModuleResultI> {
    header('Repositories Module');

    for (const value of config.repositories) {
        info(`Adding ${value} repository ...`);
        const data = await spawn('add-apt-repository', ['-y', value]);
        if (data.code !== 0) {
            return {success: false, stdout: data.stdout, message: 'Failed to add apt repo'};
        }
    }

    return {success: false, stdout: "", message: 'Repositories Module Completed Successfully'};
};
