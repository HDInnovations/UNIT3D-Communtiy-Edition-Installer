import {header, warning, info, ask, debug, ModuleResultI} from '../tools/io';
import {
    LimitSpecialChars,
    Domain,
    Ip,
    Email,
    Password,
    confirmPassword,
    NoSpecialChars,
    Length
} from '../tools/validators';
import {ip} from '../tools/helpers';
import {ConfigI} from "../config";

export interface QuestionI {
    type: string
    name: string
    message: string
    mask?: string
    choices?: string[]
    validate?: (input?: any, answers?: any) => boolean | string | Promise<boolean | string>
    default?: (input?: any) => any
}

export default async function (config: ConfigI, program: any): Promise<ModuleResultI> {

    header('Questions Module');

    warning('All Passwords Must Be A Minimum Of 8 Characters In Length.');
    warning('All Passwords Must Contain One Uppercase Alphabetical Character.');
    warning('All Passwords Must Contain One Lowercase Alphabetical Character.');
    warning('All Passwords Must Contain One Numerical Character.');

    /* NOTE: The `name` properties of these objects MUST match the value in the stubs */
    const questions: Record<string, QuestionI[]> = {
        'Server': [
            {
                type: 'input',
                name: 'server_name',
                message: 'Server Name ?',
                default() {
                    return 'UNIT3D-SERVER';
                },
                validate(input) {
                    const r = LimitSpecialChars(input);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'input',
                name: 'fqdn',
                message: 'The domain for this server ?',
                default(answers) {
                    return answers.server_name.replace(' ', '-').toLowerCase() + '.com';
                },
                validate(input) {
                    return Domain(input).valid;
                },
            },
            {
                type: 'input',
                name: 'ip',
                message: 'Primary IP Address ?',
                default() {
                    return ip();
                },
                validate(input) {
                    const r = Ip(input);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'input',
                name: 'owner_username',
                message: 'Owner Username ?',
                default() {
                    return 'UNIT3D';
                },
                validate(input) {
                    const r = LimitSpecialChars(input);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'input',
                name: 'owner_email',
                message: 'Owners Email ?',
                default(answers) {
                    return `${answers.owner_username.toLowerCase()}@${answers.fqdn}`;
                },
                validate(input) {
                    const r = Email(input);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'password',
                name: 'owner_password',
                message: 'Owner Password ?',
                mask: '*',
                default() {
                    return program.test ? 'Password1' : '';
                },
                validate(input) {
                    const r = Password(input);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'password',
                name: 'owner_password_confirm',
                message: 'Confirm Owner Password ?',
                mask: '*',
                default() {
                    return program.test ? 'Password1' : '';
                },
                validate(input, answers) {
                    const r = confirmPassword(input, answers.owner_password);
                    return r.valid ?? r.error;
                },
            },
        ],
        'Database': [
            {
                type: 'input',
                name: 'db_name',
                message: 'Database Name ?',
                default() {
                    return 'unit3d';
                },
                validate(input) {
                    const r = LimitSpecialChars(input);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'input',
                name: 'db_user',
                message: 'Database User ?',
                default() {
                    return 'unit3d';
                },
                validate(input) {
                    const r = LimitSpecialChars(input);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'password',
                name: 'db_pass',
                message: 'Database Password ?',
                mask: '*',
                default() {
                    return program.test ? 'DBPassword1' : '';
                },
                validate(input) {
                    const r = Password(input);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'password',
                name: 'db_pass_confirm',
                message: 'Confirm Database Password ?',
                mask: '*',
                default() {
                    return program.test ? 'DBPassword1' : '';
                },
                validate(input, answers) {
                    const r = confirmPassword(input, answers.db_pass);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'password',
                name: 'mysql_root_pass',
                message: 'MySQL Root Password ?',
                mask: '*',
                default() {
                    return program.test ? 'DBRootPass1' : '';
                },
                validate(input) {
                    const r = Password(input);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'password',
                name: 'mysql_root_pass_confirm',
                message: 'Confirm MySQL Root Password ?',
                mask: '*',
                default() {
                    return program.test ? 'DBRootPass1' : '';
                },
                validate(input, answers) {
                    const r = confirmPassword(input, answers.mysql_root_pass);
                    return r.valid ?? r.error;
                },
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
                default() {
                    return program.test ? 'domain.com' : '';
                },
                validate(input) {
                    const r = Domain(input);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'input',
                name: 'mail_username',
                message: 'Mail Username ?',
                default() {
                    return program.test ? 'Username' : '';
                },
                validate(input) {
                    const r = LimitSpecialChars(input);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'password',
                name: 'mail_password',
                message: 'Mail Password ?',
                mask: '*',
                default() {
                    return program.test ? 'MailPass1' : '';
                },
                validate(input) {
                    const r = Password(input);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'password',
                name: 'mail_password_confirm',
                message: 'Confirm Mail Password ?',
                mask: '*',
                default() {
                    return program.test ? 'MailPass1' : '';
                },
                validate(input, answers) {
                    const r = confirmPassword(input, answers.mail_password);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'input',
                name: 'mail_from',
                message: 'Mail From ?',
                async default() {
                    return program.test ? 'Me' : '';
                },
                validate(input) {
                    const r = NoSpecialChars(input);
                    return r.valid ?? r.error;
                },
            },
        ],
        'Api': [
            {
                type: 'input',
                name: 'tmdb_key',
                message: 'TMDB API Key ?',
                default() {
                    return program.test ? '12345678901234567890123456789012' : '';
                },
                validate(input) {
                    const r = Length(input, 32);
                    return r.valid ?? r.error;
                },
            },
            {
                type: 'input',
                name: 'igdb_key',
                message: 'IGDB API Key ?',
                default() {
                    return program.test ? '12345678901234567890123456789012' : '';
                },
                validate(input) {
                    const r = Length(input, 32);
                    return r.valid ?? r.error;
                },
            },
        ],
    };

    /* Run */
    for (let item of Object.keys(questions)) {
        info(`\n=== ${item} Questions ===`);
        try {
            let answers = await ask(questions[item])
            /* Merge these answers into the configuration answers object */
            Object.assign(config.answers, answers);
        } catch(err) {
            return {success: false, stdout: "", message: err.message}
        }
    }

    if (program.debug) debug(JSON.stringify(config.answers, null, '  '));

    info('\n=== Confirm ===');
    try {
        let answers: any = await ask([
            {
                type: 'confirm',
                name: 'install',
                message: 'About to install software on your system. Continue ?',
                default: false,
            },
        ])

        if (!answers.install) {
            return {success: false, stdout: "", message: "Aborted"}
        }
    } catch (err) {
        return {success: false, stdout: "", message: err}
    }
    return {success: false, stdout: "", message: 'Questions Module Completed Successfully'};
}

