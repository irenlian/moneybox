/*eslint-disable */
const fs = require('fs');
const path = require('path');
const merge = require('deepmerge');
/* eslint-enable */

const LOCALES_DIR = path.join(__dirname, 'en');
const OUT_FILE = path.join(__dirname, 'localeKeys.ts');

const getFileExtention = fileName => {
  return fileName.split('.').pop();
};

const writeFile = (filePath, data) => {
  fs.writeFileSync(filePath, data, 'utf8', err => {
    throw err;
  });
};

const readFileData = fileData => {
  const parsedData = JSON.parse(fileData);
  return Object.keys(parsedData).reduce((acc, key) => {
    if (key.indexOf('/') >= 0) {
      const obj = createNested(key, key);
      return merge(acc, obj);
    }

    return merge(acc, { [key]: key });
  }, {});
};

// recursive function to help build deeper nested objects
const createNested = (key, finalValue) => {
  const [constName, ...localeName] = key.split('/');
  if (localeName.length > 1) {
    const obj = createNested(localeName.join('/'), finalValue);
    return {
      [constName]: obj,
    };
  } else {
    return { [constName]: { [localeName]: finalValue } };
  }
};

const checkFilesForLocaleKeys = dir => {
  const files = fs.readdirSync(dir);

  return files.reduce((acc, file) => {
    const fullPath = path.join(dir, file);
    const fileStat = fs.statSync(fullPath);

    if (fileStat.isDirectory()) {
      const dirOutObject = checkFilesForLocaleKeys(fullPath);
      return merge(acc, dirOutObject);
    }
    if (getFileExtention(file) === 'json') {
      const fileData = fs.readFileSync(fullPath);
      const fileOutObject = readFileData(fileData);

      return merge(acc, fileOutObject);
    }
    return {};
  }, {});
};

const writeToOneObject = filePath => {
  return localeKeys => {
    const outputData = `export const Locale = ${JSON.stringify(localeKeys, null, 2)}`;
    writeFile(filePath, outputData);
  };
};

const writeToMultipleObjects = filePath => {
  return localeKeys => {
    let outputData =
      '//__GENERATED__ `npm run generate-locales`\n// these are generated keys for our translation string.\n// this helps ensure we do not remove or change keys that are still in use \n\n';
    for (const [key, value] of Object.entries(localeKeys)) {
      outputData = outputData.concat(`export const ${key} = ${JSON.stringify(value, null, 2)};\n\n`);
    }

    writeFile(filePath, outputData);
  };
};

const generateLocaleConstants = (localesDir, writeFunction) => {
  const newObject = checkFilesForLocaleKeys(localesDir);
  writeFunction(newObject);
};

generateLocaleConstants(LOCALES_DIR, writeToMultipleObjects(OUT_FILE));
