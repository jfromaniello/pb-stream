var es = require('event-stream');
var ByteBuffer;

try {
  ByteBuffer = require('protobufjs').ByteBuffer;
} catch (err) {}


module.exports = function (Message, bb) {
  var buffer;

  bb = bb || ByteBuffer;

  return es.through(function (chunk) {
    chunk = bb.wrap(chunk);
    buffer = buffer ? bb.concat([buffer, chunk]) : chunk;

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