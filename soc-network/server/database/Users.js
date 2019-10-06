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

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) }
    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });

  app.post('/users', (req, res) => {
    const user = { secondName: req.body.secondName, firstName: req.body.firstName, birth: req.body.birth, age: req.body.age };
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
    const user = { secondName: req.body.secondName, firstName: req.body.firstName, birth: req.body.birth, age: req.body.age };
    db.collection('users').update(details, user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(user);
      }
    });
  });
};