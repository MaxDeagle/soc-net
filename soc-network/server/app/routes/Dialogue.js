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
    const dialogue = { name: req.body.name, age: req.body.age };
    db.collection('dialogue').insert(dialogue, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/dialogue/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('dialogue').remove(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    });
  });

  app.put('/dialogue/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const dialogue = { text: req.body.body, title: req.body.title, name: req.body.name };
    db.collection('dialogue').update(details, dialogue, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(dialogue);
      }
    });
  });
};