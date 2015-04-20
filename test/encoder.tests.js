var encoder = require('../lib/encoder');
var es = require('event-stream');
var assert = require('chai').assert;
var bufferEqual = require('buffer-equal');

//test protocol
var ProtoBuf = require('protobufjs');
var builder = ProtoBuf.loadProtoFile(__dirname + '/Fixture.proto');
var Protocol = builder.build('pbstream');
//end


describe('encoder', function () {
  it('should work', function (done) {
    var message = new Protocol.Message({Hello: 'world'});

    es.readArray([ message ])
      .pipe(encoder(Protocol.Message))
      .on('data', function (data) {
        var expected = message.encodeDelimited().toBuffer();

        assert.ok(bufferEqual(data, expected));
        done();
      });

  });
});