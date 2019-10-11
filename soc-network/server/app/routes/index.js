const dialogueRoutes = require('./Dialogue');
const usersRoutes = require('./Users');
module.exports = function(app, db) {
    dialogueRoutes(app, db);
    usersRoutes(app, db);
}