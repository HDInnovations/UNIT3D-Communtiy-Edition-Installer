import {header, info, warning, spawn, debug, ModuleResultI} from '../tools/io';

export default async function () {

    header('NGINX Module');

    info('Running NGINX Setup & Configurations ...');
    // TODO

    return {success: true, stdout: "", message: 'NGINX Module Completed Successfully'};
};