[ProtoBuf.js](https://github.com/dcodeIO/ProtoBuf.js/) stream encoder / decoder for varint32 length-delimited messages.

Build awesome tcp servers by using industry standard [Protocol Buffers](https://developers.google.com/protocol-buffers)!

## Install

```
npm i pb-stream --save
```

## Usage

Use pb-stream to decode messages as follows:

```javascript
var net      = require('net');
var through  = require('through');
var pbStream = require('pb-stream');

var Protocol = require('./my-protocol')

var decoder = pbStream.decoder(Protocol.MyRequestMessage);
var encoder = pbStream.encoder(Protocol.MyResponseMessage);


var handle = through(function (request) {
  //request has all properties
  console.log(request.SomeProperty)

  //do some logic
  var response = new Protocol.MyResponseMessage({ foo: 'bar' });

  this.queue(response);
});

net.createServer(function(socket) { //'connection' listener
  //the magic:
  socket.pipe(decoder)
        .pipe(handle)
        .pipe(encoder);

}).listen(8124, function () {
  console.log('server bound to localhost:8124');
})
```

## License

MIT 2015 José F. Romaniello