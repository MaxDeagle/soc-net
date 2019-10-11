var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {

  app.get('/users', (req, res) => {
    db.collection('users').aggregate().toArray(function (err, items) {
      if (err) {
        res.send({ success: false });
      } else {
        res.send({ success: true, data: items });
      }
    });
  });

  app.get('/users/:email', (req, res) => {
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

  app.post('/users', (req, res) => {
    const user = { secondName: req.body.secondName, firstName: req.body.firstName, birth: req.body.birth, img: req.body.img, email: req.body.email };
    db.collection('users').insert(user, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/users/:id', (req, res) => {
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

  app.put('/users/:id', (req, res) => {
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

  app.put('/users/:id/update-status', (req, res) => {
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

  app.put('/users/:id/add-friend', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').update(details, { $push: { friends: req.body.friends }}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send();
      }
    });
  });

  app.post('/users/:email/upload-avatar', (req, res) => {
    const email = req.params.email;
    console.log(req.files.file.data);
    db.collection('users').update({ email }, { $set: { img: req.files.file.data }}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send();
      }
    });
  });
  
};