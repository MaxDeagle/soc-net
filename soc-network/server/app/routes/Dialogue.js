var ObjectID = require('mongodb').ObjectID;
const passport = require('passport');

module.exports = function (app, db) {

  // Получение диалогов
  app.get('/dialogue', passport.authenticationMiddleware(), (req, res) => {
    db.collection('dialogue').aggregate().toArray(function (err, items) {
      if (err) {
        res.send({
          success: false
        });
      } else {
        res.send({
          success: true,
          data: items
        });
      }
    });
  });

  // Получение диалога по id
  app.get('/dialogue/:id', passport.authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    const details = {
      '_id': new ObjectID(id)
    }
    db.collection('dialogue').findOne(details, (err, item) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(item);
      }
    });
  });

  // Получение диалога или создание и получение. Есть ли диалог между двумя юзерами
  app.post('/dialogue', passport.authenticationMiddleware(), (req, res) => {
    let users = req.body.users; // Юзеры
    users = users.map((user) => new ObjectID(user));
    // сохраняем полных юзеров в диалог
    db.collection('users').find({
      _id: {
        $in: users
      }
    }).toArray((err, items) => {
      const userIds = items.map((user) => new ObjectID(user._id));
      const dialogue = {
        'users._id': {
          $all: userIds
        }
      };
      db.collection('dialogue').findOne(dialogue, (err, result) => {
        if (result === null) {
          createDialog(items, res)
        } else {
          res.send(result);
        }
      });
    });
  });

  // Создание и получение диалога
  createDialog = (users, res) => {
    const dialog = {
      messages: [],
      users
    };
    db.collection('dialogue').insert(dialog, (err, result) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(result.ops[0]);
      }
    });
  }

  // Добавление сообщения в диалог
  app.put('/dialogue/:id/messages', passport.authenticationMiddleware(), (req, res) => {
    const dialogId = req.params.id;
    const dialogDetails = {
      '_id': new ObjectID(dialogId)
    };
    const userDetails = {
      '_id': new ObjectID(req.body.userId)
    };

    db.collection('users').findOne(userDetails, (err, user) => {
      const message = {
        text : req.body.message,
        author: user,
        datetime: new Date()
      }
      db.collection('dialogue').update(dialogDetails, {
        $push: {
          messages: message
        }
      }, (err, result) => {
        if (err) {
          res.send({
            'error': 'An error has occurred'
          });
        } else {
          res.send(message);
        }
      });
    });
  });

  // Получение сообщений
  app.get('/dialogue/:id/messages', passport.authenticationMiddleware(), (req, res) => {
    const id = req.params.id;
    const details = {
      '_id': new ObjectID(id)
    }
    db.collection('dialogue').findOne(details, (err, item) => {
      if (err) {
        res.send({
          'error': 'An error has occurred'
        });
      } else {
        res.send(item);
      }
    });
  });
};
