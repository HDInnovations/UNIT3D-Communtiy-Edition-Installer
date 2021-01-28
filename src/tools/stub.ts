import * as fs from "fs";

export const ReadFile = (source: string) => {
  return fs.readFileSync(`./resources/${source}`, 'utf8');
};

export const WriteFile = (path: string, source: string | NodeJS.ArrayBufferView) => {
  fs.writeFileSync(path, source);

  try {
    return fs.lstatSync(path).isFile();
  } catch (e) {
    return false;
  }

};

export const Replace = (replace: any, source: any): any => {
  let _source;

  for (const key in Object.keys(replace)) {
    const _key = `\{\{${key}\}\}`;
    _source = source.replace(_key, replace[key]);
  }

  return _source;
};
