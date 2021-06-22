const routes = require('./routes.js');
module.exports = function(app, db) {
  routes(app, db);
  // Тут, позже, будут и другие обработчики маршрутов
};
