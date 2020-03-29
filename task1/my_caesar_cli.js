const program = require('./program');
const { pipeline } = require('stream');
const CodingTransformer = require('./CodingTransformer');
const defineInputFile = require('./utils/defineInputFileUtil');
const defineOutputFile = require('./utils/defineOutputFileUtil');

const transform = new CodingTransformer(program.action);

pipeline(
  defineInputFile(program.input),
  transform,
  defineOutputFile(program.output),
  err => {
    if (err) {
      console.error(err.message.slice(8));
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }
  }
);
