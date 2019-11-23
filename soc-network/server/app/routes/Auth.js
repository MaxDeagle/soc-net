const passport = require('passport');

module.exports = function (app, db) {
  app.post('/login',
  // wrap passport.authenticate call in a middleware function
  (req, res, next) => {
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate('local', (error, user, info) => {
      // this will execute in any case, even if a passport strategy will find an error
      // log everything to console
      console.log(error);
      console.log(user);
      console.log(info);

      if (error) {
        res.status(401).send(error);
      } else if (!user) {
        res.status(401).send(info);
      } else {
        res.status(200).send(user);
      }
    })(req, res);
  });

  app.post('/register', (req, res) => {
    const user = { city: req.body.city, secondName: req.body.secondName, firstName: req.body.firstName, birth: req.body.birth, email: req.body.email, password: req.body.password };
    db.collection('users').insert(user, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
}

