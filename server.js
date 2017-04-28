const express = require('express');
const request = require('request-promise');

const app = express();

app.set('port', (process.env.PORT || 4000));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.get('/api', (req, res) => {
	console.log('api here');
  console.log(req.query.rbl);
  const rbl = (req.query.rbl || '406'); // TODO
  const options = {
    uri: 'http://www.wienerlinien.at/ogd_realtime/monitor',
    qs: {
      rbl: rbl,
      sender: 'dqvZqWbKGu'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  // set header to json
  // res.setHeader('Content-Type', 'application/json');


  request(options)
    .then(function(data) {
      console.log('sending data');
      res.json(data);
    })
    .catch(function(err) {
      console.log('error');
      res.status(400).send('error ' + err)
    });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
