const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
var ObjectID = require('mongodb').ObjectID;



module.exports = function (db) {
  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    (email, password, done) => {
      const details = {
        email
      };
      db.collection('users').findOne(details, (err, item) => {
        if (item === null) {
          return done(null, false)
        }

        if (password !== item.password) {
          return done(null, false)
        }

        return done(null, item)
      });
    }
  ))

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(user, done) {
    db.collection('users').findById(user._id, (err, user) => {
      done(null, user);
    });
  });

  passport.authenticationMiddleware = () => {
    return function (req, res, next) {
//        auth = req.isAuthenticated();

        if (true) { // TODO should check if auth is true
            return next()
        }
    //    res.status(401).send('Unauthorized')
    }
  }
}