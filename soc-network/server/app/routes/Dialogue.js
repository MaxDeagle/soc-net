var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {

  app.get('/dialogue', (req, res) => {
    db.collection('dialogue').aggregate().toArray(function (err, items) {
      if (err) {
        res.send({ success: false });
      } else {
        res.send({ success: true, data: items });
      }
    });
  });

  app.get('/dialogue/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) }
    db.collection('dialogue').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });

  app.post('/dialogue', (req, res) => {
    const users = req.body.users;

    const dialogue = { users: { $all: users } };
    db.collection('dialogue').findOne(dialogue, (err, result) => {
      if (result === null) { 
        createDialog(users, res)
      } else {
        res.send(result);
      }
    });
  });

  createDialog = (users, res) => {
    const dialog = { messages: [], users };
    db.collection('dialogue').insert(dialog, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  }

  app.put('/dialogue/:id/messages', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('dialogue').update(details, { $push: { messages: req.body.messages }}, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send();
      }
    });
  });

  app.get('/dialogue/:id/messages', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) }
    db.collection('dialogue').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });

  

  
};