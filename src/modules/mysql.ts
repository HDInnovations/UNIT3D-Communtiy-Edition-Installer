import {copyFileSync, chmod, writeFileSync, chmodSync} from 'fs';
import {header, info, warning, spawn, debug, ModuleResultI} from '../tools/io';
import {totalMemory, distVersion} from '../tools/helpers';
import {ReadFile, Replace, WriteFile} from '../tools/stub';
import {ConfigI} from "../config";

export default async function (config: ConfigI, program: any): Promise<ModuleResultI> {

    header('MySQL Module');

    const dist = await distVersion();
    const mysql_root_pass = config.answers.mysql_root_pass;
    const db_name = config.answers.db_name;
    const db_user = config.answers.db_user;
    const db_pass = config.answers.db_pass;

    const mysql_dir = config.mysql_dir;

    info('Checking System Memory ...');
    switch (true) {
        case (totalMemory() >= 1200000 && totalMemory() < 3900000):
            info('Configuring MySQL for a medium sized server ...');
            copyFileSync('./resources/mysql/my-medium.cnf', `${mysql_dir}/my.cnf`);
            break;
        case (totalMemory() >= 3900000):
            info('Configuring MySQL for a large sized server ...');
            copyFileSync('./resources/mysql/my-large.cnf', `${mysql_dir}/my.cnf`);
            break;
        default:
            warning('Configuring MySQL for a small sized server ...');
            copyFileSync('./resources/mysql/my-small.cnf', `${mysql_dir}/my.cnf`);
    }

    info('Setting up MySQL ...');
    if (!dist.includes('18.04') && !dist.includes('20.04')) {
        warning(`Your OS version (${dist}) is old. Running mysql_install_db ...`);
        const data = await spawn('mysql_install_db');
        if (program.debug) debug(data.stdout);
        if (data.code !== 0) {
            return {success: data.code === 0, stdout: data.stdout, message: "Failed to run mysql_install_db"}
        }
    }

    info('Setting permissions ...');
    const m1 = await spawn('chown', ['mysql:mysql', '/etc/mysql/my.cnf']);
    if (m1.code !== 0) {
        return {success: false, stdout: m1.stdout, message: "chown mysql /etc/mysql/my.cnf failed"}
    }
    const m2 = await spawn('chown', ['mysql:mysql', '/var/lib/mysql']);
    if (m2.code !== 0) {
        return {success: false, stdout: m2.stdout, message: "chown mysql /var/lib/mysql failed"}
    }
    chmodSync('/etc/mysql/my.cnf', 0o600);
    //, () => { writeFileSync('/etc/mysql/my.cnf', "This file has now been edited."); });


    info('Reading "mysql/.my.cnf" stub file ...');
    const myStub = ReadFile('mysql/.my.cnf');

    info('Preparing stub file with user specified values ...');
    const mycnf = Replace({
        'mysql_root_pass': mysql_root_pass
    }, myStub);

    info('Writing to "/root/.my.cnf" ...');
    if (!WriteFile('/root/.my.cnf', mycnf)) {
        return {
            success: false, stdout: "", message: 'Writing /root/.my.cnf FAILED. Please report this bug!\nYou will ' +
                'likely need to reinstall your OS and try again after receiving support!'
        }
    }

    info('Running "update-rc.d" ...');
    const r1 = await spawn('update-rc.d', ['mysql', 'defaults']);
    if (r1.code !== 0) {
        return {success: false, stdout: r1.stdout, message: "update-rc.d mysql defaults failed"}
    }

    info('Starting mysql service ...');
    const r2 = await spawn('service', ['mysql', 'start']);
    if (r2.code !== 0) {
        return {success: false, stdout: r2.stdout, message: "mysql service start failed"}
    }

    info('Running "mysqladmin" ...');
    const r3 = await spawn('mysqladmin', ['-u', 'root', 'password', mysql_root_pass]);
    if (r3.code !== 0) {
        return {success: false, stdout: r3.stdout, message: "mysqladmin password set failed"}
    }

    info('Setting permissions on "/root/.my.cnf" ...');
    await Promise.all([chmod('/root/.my.cnf', 0o600, () => {
            writeFileSync('/root/.my.cnf', "This file has now been edited.");
        }
    )]);

    const mysqlCmds = [
        `DROP USER IF EXISTS '${db_user}'@'localhost'`,
        `DROP DATABASE IF EXISTS ${db_name}`,
        `CREATE DATABASE ${db_name}`,
        `CREATE USER '${db_user}'@'localhost' IDENTIFIED BY '${db_pass}'`,
        `GRANT ALL PRIVILEGES ON ${db_name} . * TO '${db_user}'@'localhost'`,
        `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '${mysql_root_pass}'`,
        `DELETE
         FROM mysql.user
         WHERE User = ''`,
        `DELETE
         FROM mysql.user
         WHERE User = 'root'
           AND Host NOT IN ('localhost', '127.0.0.1', '::1')`,
        `DROP DATABASE IF EXISTS test`,
        `DELETE
         FROM mysql.db
         WHERE Db = 'test'
            OR Db = 'test\\_%'`,
        `FLUSH PRIVILEGES`,
    ];

    for (const cmd of mysqlCmds) {
        if (program.debug) debug(`Executing "${cmd}" ...`);
        const r = await spawn('mysql', ['-e', cmd]);
        if (r.code !== 0) {
            return {success: false, stdout: r.stdout, message: "Mysql query failed"}
        }
    }

    return {success: true, stdout: "", message: 'MySQL Module Completed Successfully'};
};
