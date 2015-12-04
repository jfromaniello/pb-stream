var through2 = require('through2');
var xtend = require('xtend');

var defaults = {
  ignore_invalid: false
};

module.exports = function (Message, options) {
  options = xtend(defaults, options || {});

  return through2.obj(function (message, enc, callback) {

    if (!(message instanceof Message)) {
      if (options.ignore_invalid) {
        return this.queue(message);
      }
      throw new Error('Unhandled request');
    }

    return callback(null, message.encodeDelimited().toBuffer());
  });
};