import { copyFileSync, chmod, writeFileSync } from 'fs';
import { header, info, warning, spawn, debug, error, success } from '../tools/io';
import { totalMemory, distVersion } from '../tools/helpers';
import { ReadFile, Replace, WriteFile } from '../tools/stub';
import {ConfigI} from "../config";

export default async (config: ConfigI, program: any) => {

  header('MySQL Module');

  const dist = distVersion();
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
    const data = spawn('mysql_install_db');
    if (program.debug) debug(data);
  }

  info('Setting permissions ...');
  spawn('chown', ['mysql:mysql', '/etc/mysql/my.cnf'] as never[]);
  spawn('chown', ['mysql:mysql', '/var/lib/mysql'] as never[]);
  chmod('/etc/mysql/my.cnf', 0o600, () => { 
    writeFileSync('/etc/mysql/my.cnf', "This file has now been edited."); 
  });

  info('Reading "mysql/.my.cnf" stub file ...');
  const myStub = ReadFile('mysql/.my.cnf');

  info('Preparing stub file with user specified values ...');
  const mycnf = Replace({
    'mysql_root_pass': mysql_root_pass
  }, myStub);

  info('Writing to "/root/.my.cnf" ...');
  if (!WriteFile('/root/.my.cnf', mycnf)) {
    error('Writing /root/.my.cnf FAILED. Please report this bug!');
    error('You will likely need to reinstall your OS and try again after receiving support!');
    process.exit(1);
  }

  info('Running "update-rc.d" ...');
  spawn('update-rc.d', ['mysql', 'defaults'] as never[]);

  info('Starting mysql service ...');
  spawn('service', ['mysql', 'start'] as never[]);

  info('Running "mysqladmin" ...');
  spawn('mysqladmin', ['-u', 'root', 'password', mysql_root_pass] as never[]);

  info('Setting permissions on "/root/.my.cnf" ...');
    chmod('/root/.my.cnf', 0o600, () => { 
    writeFileSync('/root/.my.cnf', "This file has now been edited."); 
  });

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
    spawn('mysql', ['-e', cmd] as never[]);
  }

  return success('MySQL Module Completed Successfully');
};
