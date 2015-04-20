var es = require('event-stream');
var ByteBuffer = require('bytebuffer');

module.exports = function (Message) {
  var buffer;

  return es.through(function (chunk) {
    chunk = ByteBuffer.wrap(chunk);
    buffer = buffer ? ByteBuffer.concat([buffer, chunk]) : chunk;

    var decoded;

    while (buffer.remaining() > 0) {

      try {
        decoded = Message.decodeDelimited(buffer);
      } catch (err) {
        this.emit('error', err);
      }

      if (!decoded) break;

      buffer.compact();
      this.queue(decoded);
    }
  });

};