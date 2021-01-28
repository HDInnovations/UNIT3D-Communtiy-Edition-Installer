import {header, info, spawn, debug, ModuleResultI} from '../tools/io';
import {ConfigI} from "../config";

export default async function (_config: ConfigI, program: any): Promise<ModuleResultI> {
    header('Composer Module');
    const command = 'php -r "readfile(\'http://getcomposer.org/installer\');" | sudo php -- --install-dir=/usr/bin/ --filename=composer';
    info('Installing composer ...');
    const resp = await spawn('sh', ['-c', command]);
    if (resp.code !== 0) {
        return {success: false, stdout: resp.stdout, message: "Failed to execute composer"}
    }
    if (program.debug) {
        debug(resp.stdout);
    }

    return {success: resp.code === 0, stdout: resp.stdout, message: 'Composer Module Completed Successfully'};
};


