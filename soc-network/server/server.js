const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  return next();
});

const client = new MongoClient(db.url, { useNewUrlParser: true });
client.connect((err, database) => {
  if (err) return console.log(err)

  const db = database.db("socialNetworkDB");
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});
