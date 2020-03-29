const path = require('path');
const fs = require('fs');

module.exports = function defineOutputFile(outputValue) {
  let writable;
  if (outputValue !== undefined) {
    const pathToWrite = path.join(__dirname, '../', outputValue);
    writable = fs.createWriteStream(pathToWrite, {
      flags: 'a',
      encoding: null
    });
    writable.on('error', () => {
      throw new Error('can not write to file, check file permissions');
    });
  } else {
    writable = process.stdout;
  }
  return writable;
};
