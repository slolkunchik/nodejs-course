const actionUtil = require('./utils/actionUtil');
const stream = require('stream');
const program = require('./program');

module.exports = class CodingTransformer extends stream.Transform {
  constructor(action) {
    super();
    this.action = action;
  }
  _transform(chunk, encoding, callback) {
    this.push(
      actionUtil(this.action, chunk.toString(), parseInt(program.shift, 10))
    );
    callback();
  }
};