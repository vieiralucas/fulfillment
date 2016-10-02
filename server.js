const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const cors = require('cors');

const client = redis.createClient({
  host: process.env.REDIS_CLOUD_URL || '127.0.0.1',
  port: 6379
});

client.on('error', err => {
  console.error(`Error connecting to redis: ${err}`);
  process.exit(1);
});

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/highscores', cors(), (req, res) => {
  client.zrevrange('highscores', 0, 10, 'WITHSCORES', (err, highscores) => {
    if (err) {
      res.sendStatus(500);
      console.error(err);
      return;
    }

    const asPairs = []

    for (let i = 0; i < highscores.length; i = i + 2) {
      asPairs.push([highscores[i], Number(highscores[i + 1])]);
    }

    res.json(asPairs);
  });
});

app.post('/highscore', cors(), (req, res) => {
  console.log(req.body);
  client.zscore('highscores', req.body.nick, (err, score) => {
    if (err) {
      res.sendStatus(500);
      console.error(err);
      return;
    }

    if (score === null) {
      score = 0;
    }

    if (req.body.score > score) {
      client.zincrby('highscores', req.body.score - score, req.body.nick, (err, code) => {
        if (err) {
          res.sendStatus(500);
          console.error(err);
          return;
        }

        console.log(code);
        res.json(req.body);
      });
    } else {
      res.sendStatus(400);
    }
  });
});

app.listen(process.env.PORT || 1338, () => console.info('express server listening'));
