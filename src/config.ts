/* todo: make sure every property in this file is validated through the properties module */
// import validate from './tools/validators';
// import helper from './tools/helpers';

export interface ConfigI {
    github: string
    web_user: string
    install_dir: string
    mysql_dir: string
    repositories: string[]
    npm_packages: string[]
    packages: string[]
    answers: {
        mysql_root_pass: string
        db_name: string
        db_user: string
        db_pass: string
    }
}

export const config: ConfigI = {
    /* Main */
    'github': 'https://github.com/HDInnovations/UNIT3D-Community-Edition.git',
    'web_user': 'www-data',
    'install_dir': '/var/www/html',
    'mysql_dir': '/etc/mysql',

    'repositories': [
        'ppa:nginx/stable',
        'ppa:ondrej/php',
    ],
    /* These packages are installed GLOBALLY. */
    'npm_packages': [
        'laravel-echo-server',
    ],

    'packages': [
        'ufw',
        'debconf-utils',
        'python3-certbot-nginx',
        'php-pear',
        'php8.0-curl',
        'php8.0-dev',
        'php8.0-gd',
        'php8.0-mbstring',
        'php8.0-zip',
        'php8.0-mysql',
        'php8.0-xml',
        'php8.0-fpm',
        'php8.0-intl',
        'nginx',
        'mysql-server',
        'supervisor',
        'redis-server',
        'nodejs',
        'build-essential',
        'git',
        'tmux',
        'vim',
        'wget',
        'zip',
        'unzip',
        'htop',
    ],

    /* Do Not Touch This */
    'answers': {
        db_name: "",
        db_pass: "",
        db_user: "",
        mysql_root_pass: ""
    },
};
