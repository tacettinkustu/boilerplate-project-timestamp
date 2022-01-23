// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// API endpoint for empty params...
app.get('/api', function (req, res) {
  let resObj = {};
  const currentTime = moment();

  resObj['unix'] = new Date(currentTime).getTime();
  resObj['utc'] = new Date(currentTime).toUTCString();

  res.json(resObj);
});

// API endpoint for date...
app.get('/api/:date', function (req, res) {
  let resObj = {};
  let inputDate = req.params.date;

  if (moment(inputDate).isValid()) {
    resObj['unix'] = new Date(inputDate).getTime();
    resObj['utc'] = new Date(inputDate).toUTCString();
  } else if (!isNaN(parseInt(inputDate))) {
    inputDate = parseInt(inputDate);
    resObj['unix'] = inputDate;
    resObj['utc'] = new Date(inputDate).toUTCString();
  } else if (!isNaN(Date.parse(inputDate))) {
    inputDate = Date.parse(inputDate);
    resObj['unix'] = inputDate;
    resObj['utc'] = new Date(inputDate).toUTCString();
  } else {
    resObj['error'] = 'Invalid Date';
  }

  res.json(resObj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
