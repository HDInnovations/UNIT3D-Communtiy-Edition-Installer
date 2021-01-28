import {header, info, warning, spawn, debug, ModuleResultI} from '../tools/io';

export default async function () {

    header('PHP Module');

    info('Running PHP Setup & Configurations ...');
    // TODO

    return {success: true, stdout: "", message: 'PHP Module Completed Successfully'};
};