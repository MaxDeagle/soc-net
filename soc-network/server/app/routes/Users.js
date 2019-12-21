var ObjectID = require('mongodb').ObjectID;
const passport = require('passport');

module.exports = function (app, db) {

  app.get('/users', passport.authenticationMiddleware(), (req, res) => {
    db.collection('users').aggregate().toArray(function (err, items) {
      if (err) {
        res.send({ success: false });
      } else {
        res.send({ success: true, data: items });
      }
    });
  });

  app.get('/users/:email', passport.authenticationMiddleware(), (req, res) => {
    const email = req.params.email;
    const details = { email };
    db.collection('users').findOne(details, (err, item) => {
      if (item === null) {
        res.status(404).send('Not found');
        return;
      }

      res.send(item);
    });
  });

  app.get('/getUserById/:id', passport.authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').findOne(details, (err, item) => {
      if (item === null) {
        res.status(404).send('Not found');
        return;
      }

      res.send(item);
    });
  });

  app.delete('/users/:id', passport.authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').remove(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    });
  });

  app.put('/users/:id', passport.authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const user = { secondName: req.body.secondName, firstName: req.body.firstName, birth: req.body.birth, img: req.body.img, email: req.body.email };
    db.collection('users').update(details, user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(user);
      }
    });
  });

  app.put('/users/:id/update-status', passport.authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').update(details, { $set: { status: req.body.status }}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send();
      }
    });
  });

  app.put('/users/:id/add-friend', passport.authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').update(details, { $push: { friends: req.body.userId }}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send();
      }
    });
  });

  app.put('/users/:id/remove-friend', passport.authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').update(details, { $pull: { friends: req.body.userId }}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send();
      }
    });
  });

  app.post('/users/:id/is-friend', passport.authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').findOne(details, (err, item) => {
      if (item && item.friends && item.friends.includes(req.body.userId)) {
        res.status(200).send(true);
      } else {
        res.status(200).send(false);
      }
    });
  });

  app.get('/users/:id/friends', passport.authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').findOne(details, (err, item) => {
      if (item && item.friends) {
        const usersIds = item.friends.map((friend) => new ObjectID(friend));
        db.collection('users').find( { _id: { $in: usersIds } }).toArray((err, items) => {
          res.status(200).send(items);
        });
      } else {
        res.status(200).send([]);
      }
    });
  });

  app.post('/users/:id/upload-avatar', passport.authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    const details = { _id:  new ObjectID(id) };
    db.collection('users').update(details, { $set: { img: req.files.file.data }}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result);
      }
    });
  });
  
  // Получение диалогов
  app.get('/users/:id/dialogue', passport.authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    
    db.collection('dialogue').find({ 'users._id': new ObjectID(id) }).toArray((err, items) => {
      if (items === null) {
        res.send( 'You don\'t have any dialogues' );
        return;
      } else {
        res.send(items);
      }
    });
  });

  // Добавление записей на страницу
  app.post('/users/:id/add-page-record', passport.authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const newRecord = {
      text: req.body.text,
      date: new Date()
    }
    db.collection('users').update(details, { $push: { records: newRecord }}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send();
      }
    });
  });
 

};