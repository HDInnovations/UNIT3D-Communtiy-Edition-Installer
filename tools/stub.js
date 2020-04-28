const fs = require('fs');

module.exports.ReadFile = (source) => {
  return fs.readFileSync(`./resources/${source}`, 'utf8');
};

module.exports.WriteFile = (path, source) => {
  fs.writeFileSync(path, source);

  try {
    return fs.lstatSync(path).isFile();
  } catch (e) {
    return false;
  }

};

module.exports.Replace = (replace, source) => {
  let _source;

  for (const key in Object.keys(replace)) {
    const _key = `\{\{${key}\}\}`;
    _source = source.replace(_key, replace[key]);
  }

  return _source;
};
