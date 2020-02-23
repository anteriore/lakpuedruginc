const express = require('express');
const app = express();

app.use(express.static('app-ui/dist'));

var port = 4000;
if (process.env.PORT) {
    port = process.env.PORT
}

app.set('port', port);
console.log('port: ' + port);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});