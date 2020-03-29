const path = require('path');
const fs = require('fs');

module.exports = function defineInputFile(inputValue) {
  let readable;
  if (inputValue !== undefined) {
    const pathToRead = path.join(__dirname, '../', inputValue);

    readable = fs.createReadStream(pathToRead);
    readable.on('error', () => {
      throw new Error('no such input file');
    });
  } else {
    readable = process.stdin;
  }
  return readable;
};
