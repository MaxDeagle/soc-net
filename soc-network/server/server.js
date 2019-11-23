const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const redisConfig = require('./config/redis');
const fileUpload = require('express-fileupload');
const app = express();
const port = 8000;

const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  return next();
});

app.use(fileUpload({
  limits: {
    fileSize: 50 * 1024 * 1024
  },
}));

const client = new MongoClient(db.url, {
  useNewUrlParser: true
});
client.connect((err, database) => {
  if (err) return console.log(err)

  const db = database.db("socialNetworkDB");

  require('./app/auth').init(db)

  app.use(cookieParser());
  app.use(session({
    store: new RedisStore({
      url: redisConfig.redisStore.url
    }),
    secret: redisConfig.redisStore.secret,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log(port);
  });
});
