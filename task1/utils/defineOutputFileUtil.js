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
  } else {
    writable = process.stdout;
  }
  return writable;
};
