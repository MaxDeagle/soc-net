const dialogueRoutes = require('./Dialogue');
const usersRoutes = require('./Users');
const authRoutes = require('./Auth');
module.exports = function(app, db) {
    dialogueRoutes(app, db);
    usersRoutes(app, db);
    authRoutes(app, db);
}