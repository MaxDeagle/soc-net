var ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.post('/notes', (req, res) => {
        console.log(req.body)
        res.send({
            serrgey: "lox"
        })
    });

    app.get('/notes', (req, res) => {
        db.collection('users').aggregate().toArray(function(err, items) {
           if (err) {
             res.send({ success: false });
           } else {
             res.send({success: true, data: items});
           }
           });
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) }
        db.collection('users').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          }
        });
    });
};