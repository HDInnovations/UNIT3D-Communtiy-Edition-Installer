// @ts-ignore
import program, { version } from 'commander';
import {config} from './config';
import {info, error} from './tools/io';
import properties from "./modules/properties";
import questions from "./modules/questions";
import utf8 from "./modules/utf8";
import repositories from "./modules/repositories";
import packages from "./modules/packages";
import composer from "./modules/composer";
import npm_packages from "./modules/npm_packages";
import mysql from "./modules/mysql";

function main() {
    version('1.0.0', '-v, --version')
        .option('--debug', 'Run installer in debug mode to show additional output',  false)
        .option('--disable-ssl', 'Disable SSL',  false)
        .option('--test', 'Run a test with preconfigured values',  false)
        .parse(process.argv);

    info(`UNIT3D Community Edition Installer`);
    info(`Version: v1.0.0`);

    /*
     | Installer steps, Run the following modules in order from top to bottom.
     | The values here should be the filename of the module in the modules directory excluding the .js
     */
    const steps = [
        properties,
        questions,
        utf8,
        repositories,
        packages,
        composer,
        npm_packages,
        mysql
    ];

    for (let fn of steps) {
        try {
            fn(config, program);
        } catch (err) {
            error(err);
            process.exit(1);
        }
    }

    return true;
}

main();
