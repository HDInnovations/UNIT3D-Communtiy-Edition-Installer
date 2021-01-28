import {header, info, spawn, ModuleResultI, CommandArgsI} from '../tools/io';
import {ConfigI} from "../config";

export default async function (_config: ConfigI, _program: any): Promise<ModuleResultI> {

    header('UTF8 Module');
    let stdout = '';
    const args: CommandArgsI[] = [
        {name: "language-pack-en-base", cmd: "language-pack-en-base", args: ['install', '-y', 'language-pack-en-base']},
        {name: "export LC_ALL=en_US.UTF-8", cmd: "export", args: ['LC_ALL=en_US.UTF-8']},
        {name: "export LANG=en_US.UTF-8", cmd: "export", args: ['LANG=en_US.UTF-8']},
        {
            name: "apt-get software-properties-common",
            cmd: "apt-get",
            args: ['install', '-y', 'software-properties-common']
        },
    ]
    for (const arg of args) {
        info(`Installing ${arg.name} ...`);
        const resp = await spawn(arg.cmd, arg.args);
        if (resp.code !== 0) {
            return {success: false, stdout: resp.stdout, message: `Failed to install ${arg.name}`}
        }
        stdout += resp.stdout;
    }

    return {success: true, stdout: stdout, message: 'UTF8 Module Completed Successfully'};
};
