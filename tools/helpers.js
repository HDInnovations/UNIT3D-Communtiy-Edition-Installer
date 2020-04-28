const os = require('os');
const io = require('./io');

module.exports.ip = () => {
  const data = io.spawn('hostname', ['-I']);
  return data.split(' ')[0].trim();
};

module.exports.distVersion = () => {
  return io.spawn('cut', ['-f2', '-d', ' '], {
    input: io.spawn('head', ['-n1', '/etc/issue'])
  });

};

module.exports.totalMemory = () => {
  return os.totalmem();
};
