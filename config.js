/* todo: make sure every property in this file is validated through the properties module */
const validate = require('./tools/validators');
const helper = require('./tools/helpers');

module.exports = {
  /* Main */
  'github': 'https://github.com/HDInnovations/UNIT3D-Communtiy-Edition.git',
  'web-user': 'www-data',
  'install_dir': '/var/www/html',
  'mysql_dir': '/etc/mysql',

  'repositories': [
    'ppa:nginx/stable',
    'ppa:ondrej/php',
    'ppa:certbot/certbot',
  ],

  /* These packages are installed GLOBALLY. */
  'npm_packages': [
    'laravel-echo-server',
  ],

  'packages': [
    'ufw',
    'debconf-utils',
    'python-certbot-nginx',
    'php-pear',
    'php7.4-curl',
    'php7.4-dev',
    'php7.4-gd',
    'php7.4-mbstring',
    'php7.4-zip',
    'php7.4-mysql',
    'php7.4-xml',
    'php7.4-fpm',
    'php7.4-intl',
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
  'answers': {},
};
