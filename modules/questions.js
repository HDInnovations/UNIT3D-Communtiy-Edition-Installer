import { header, warning, info, ask, error, debug, success } from '../tools/io';
import { LimitSpecialChars, Domain, Ip, Email, Password, confirmPassword, NoSpecialChars, Length } from '../tools/validators';
import { ip } from '../tools/helpers';

export default async (config, program) => {

  header('Questions Module');
  
  warning('All Passwords Must Be A Minimum Of 8 Characters In Lenght.');
  warning('All Passwords Must Contain One Uppercase Alphabetical Character.');
  warning('All Passwords Must Contain One Lowercase Alphabetical Character.');
  warning('All Passwords Must Contain One Numerical Character.');

  /* NOTE: The `name` properties of these objects MUST match the value in the stubs */
  const questions = {
    'Server': [
      {
        type: 'input',
        name: 'server_name',
        message: 'Server Name ?',
        default () { return 'UNIT3D-SERVER'; },
        validate (input) { return LimitSpecialChars(input); },
      },
      {
        type: 'input',
        name: 'fqdn',
        message: 'The domain for this server ?',
        default (answers) { return answers.server_name.replace(' ', '-').toLowerCase() + '.com'; },
        validate (input) { return Domain(input); },
      },
      {
        type: 'input',
        name: 'ip',
        message: 'Primary IP Address ?',
        default () { return ip(); },
        validate (input) { return Ip(input); },
      },
      {
        type: 'input',
        name: 'owner_username',
        message: 'Owner Username ?',
        default () { return 'UNIT3D'; },
        validate (input) { return LimitSpecialChars(input); },
      },
      {
        type: 'input',
        name: 'owner_email',
        message: 'Owners Email ?',
        default (answers) { return `${answers.owner_username.toLowerCase()}@${answers.fqdn}`; },
        validate (input) { return Email(input); },
      },
      {
        type: 'password',
        name: 'owner_password',
        message: 'Owner Password ?',
        mask: '*',
        default () { return program.test ? 'Password1' : ''; },
        validate (input) { return Password(input); },
      },
      {
        type: 'password',
        name: 'owner_password_confirm',
        message: 'Confirm Owner Password ?',
        mask: '*',
        default () { return program.test ? 'Password1' : ''; },
        validate (input, answers) { return confirmPassword(input, answers.owner_password); },
      },
    ],
    'Database': [
      {
        type: 'input',
        name: 'db_name',
        message: 'Database Name ?',
        default () { return 'unit3d'; },
        validate (input) { return LimitSpecialChars(input); },
      },
      {
        type: 'input',
        name: 'db_user',
        message: 'Database User ?',
        default () { return 'unit3d'; },
        validate (input) { return LimitSpecialChars(input); },
      },
      {
        type: 'password',
        name: 'db_pass',
        message: 'Database Password ?',
        mask: '*',
        default () { return program.test ? 'DBPassword1' : ''; },
        validate (input) { return Password(input); },
      },
      {
        type: 'password',
        name: 'db_pass_confirm',
        message: 'Confirm Database Password ?',
        mask: '*',
        default () { return program.test ? 'DBPassword1' : ''; },
        validate (input, answers) { return confirmPassword(input, answers.db_pass); },
      },
      {
        type: 'password',
        name: 'mysql_root_pass',
        message: 'MySQL Root Password ?',
        mask: '*',
        default () { return program.test ? 'DBRootPass1' : ''; },
        validate (input) { return Password(input); },
      },
      {
        type: 'password',
        name: 'mysql_root_pass_confirm',
        message: 'Confirm MySQL Root Password ?',
        mask: '*',
        default () { return program.test ? 'DBRootPass1' : ''; },
        validate (input, answers) { return confirmPassword(input, answers.mysql_root_pass); },
      },
    ],
    'Mail': [
      {
        type: 'list',
        message: 'Select Mail Driver',
        name: 'mail_driver',
        choices: [
          'smtp',
          'sendmail',
          'mailgun',
          'mandrill',
          'ses',
          'sparkpost',
          'log',
          'array',
        ],
      },
      {
        type: 'input',
        name: 'mail_host',
        message: 'Mail Host ?',
        default () { return program.test ? 'domain.com' : ''; },
        validate (input) { return Domain(input); },
      },
      {
        type: 'input',
        name: 'mail_username',
        message: 'Mail Username ?',
        default () { return program.test ? 'Username' : ''; },
        validate (input) { return LimitSpecialChars(input); },
      },
      {
        type: 'password',
        name: 'mail_password',
        message: 'Mail Password ?',
        mask: '*',
        default () { return program.test ? 'MailPass1' : ''; },
        validate (input) { return Password(input); },
      },
      {
        type: 'password',
        name: 'mail_password_confirm',
        message: 'Confirm Mail Password ?',
        mask: '*',
        default () { return program.test ? 'MailPass1' : ''; },
        validate (input, answers) { return confirmPassword(input, answers.mail_password); },
      },
      {
        type: 'input',
        name: 'mail_from',
        message: 'Mail From ?',
        default () { return program.test ? 'Me' : ''; },
        validate (input) { return NoSpecialChars(input); },
      },
    ],
    'Api': [
      {
        type: 'input',
        name: 'tmdb_key',
        message: 'TMDB API Key ?',
        default () { return program.test ? '12345678901234567890123456789012' : ''; },
        validate (input) { return Length(input, 32); },
      },
      {
        type: 'input',
        name: 'igdb_key',
        message: 'IGDB API Key ?',
        default () { return program.test ? '12345678901234567890123456789012' : ''; },
        validate (input) { return Length(input, 32); },
      },
    ],
  };

  /* Run */
  for (let item of Object.keys(questions)) {
    info(`\n=== ${item} Questions ===`);
    await ask(questions[item]).then(answers => {
      /* Merge these answers into the configuration answers object */
      Object.assign(config.answers, answers);
    }).catch(err => {
      error(err);
      process.exit(1);
    });
  }

  if (program.debug) debug(JSON.stringify(config.answers, null, '  '));

  info('\n=== Confirm ===');
  await ask([
    {
      type: 'confirm',
      name: 'install',
      message: 'About to install software on your system. Continue ?',
      default: false,
    },
  ]).then(answers => {
    if (!answers.install) {
      error('Aborted ...');
      process.exit(1);
    }
  }).catch(err => {
    error(err);
    process.exit(1);
  });

  return success('Questions Module Completed Successfully');

};
