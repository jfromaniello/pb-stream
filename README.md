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

var decoder = pbStream.decoder(MyRequestMessage);
var encoder = pbStream.encoder(MyResponseMessage);

net.createServer(function(socket) { //'connection' listener

  socket.pipe(decoder)
        .pipe(through(function (request) {
          //contains all properties
          console.log(request.SomeProperty)

          //do some logic
          var response = new MyRequestMessage({ foo: 'bar' });

          this.queue(response);
        })).pipe(encoder);

}).listen(8124, function () {
  console.log('server bound to localhost:8124');
})
```

## License

MIT 2015 José F. Romaniello