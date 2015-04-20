var decoder = require('../lib/decoder');
var es = require('event-stream');
var assert = require('chai').assert;
var stream = require('stream');

//test protocol
var ProtoBuf = require('protobufjs');
var builder = ProtoBuf.loadProtoFile(__dirname + '/Fixture.proto');
var Protocol = builder.build('pbstream');
//end


var concat = function (count) {
  var result = [];
  return es.through(function (data) {
    result.push(data);
    if (result.length === count) {
      this.queue(result);
    }
  });
};

describe('encoder', function () {
  it('should work', function (done) {
    var message1 = new Protocol.Message({Hello: 'world'});
    var message2 = new Protocol.Message({Hello: 'mundo'});

    var source = new stream.Transform();


    source
      .pipe(decoder(Protocol.Message))
      .pipe(concat(2))
      .on('data', function (data) {
        assert.equal(data[0].Hello, 'world');
        assert.equal(data[1].Hello, 'mundo');
        done();
      });


    source.push(message1.encodeDelimited().toBuffer());
    source.push(message2.encodeDelimited().toBuffer());
  });
});