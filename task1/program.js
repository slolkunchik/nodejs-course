const { program } = require('commander');
program.version('0.0.1');

program
  .requiredOption('-s, --shift <type>', 'a shift')
  .option('-i, --input <type>', 'an input file')
  .option('-o, --output <type>', 'an output file')
  .requiredOption('-a, --action <type>', 'an action encode/decode');

program.parse(process.argv);

module.exports = {
  shift: program.shift,
  input: program.input,
  output: program.output,
  action: program.action
};
