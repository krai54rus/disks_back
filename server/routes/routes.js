module.exports = function(app,db) {
  require('./beer')(app,db);
  require('./auto')(app,db);
  require('./disks')(app,db);
  require('./catalog')(app,db);
  require('./constructor')(app,db);
  require('./personal')(app,db);
  require('./cart')(app,db);
};
