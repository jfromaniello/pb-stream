var es = require('event-stream');
var xtend = require('xtend');

var defaults = {
  ignore_invalid: false
};

module.exports = function (Message, options) {
  options = xtend(defaults, options || {});

  return es.through(function (message) {

    if (!(message instanceof Message)) {
      if (options.ignore_invalid) {
        return this.queue(message);
      }
      throw new Error('Unhandled request');
    }

    return this.queue(message.encodeDelimited().toBuffer());
  });
};