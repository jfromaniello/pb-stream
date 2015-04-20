[ProtoBuf.js](https://github.com/dcodeIO/ProtoBuf.js/) stream encoder / decoder for varint32 length-delimited messages.

## Install

```
npm i pb-stream --save
```

## Usage

Use pb-stream to decode messages as follows:

```javascript
var net = require('net');
var through = require('through');

var pbStream = require('pb-stream');

var MyRequestMessage = require('./my-protocol').MyRequestMessage
var MyResponseMessage = require('./my-protocol').MyRequestMessage

net.createServer(function(socket) { //'connection' listener

  socket.pipe(pbStream.decoder(MyRequestMessage))
        .pipe(through(function (request) {
          //do some logic
          this.queue(new MyRequestMessage({ foo: 'bar' }));
        })).pipe(pbStream.encoder(MyResponseMessage));

}).listen(8124, function () {
  console.log('server bound to localhost:8124');
})
```

## License

MIT 2015 José F. Romaniello