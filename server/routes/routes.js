module.exports = function(app,db) {
  require('./beer')(app,db);
  require('./auto')(app,db);
  require('./disks')(app,db);
  require('./catalog')(app,db);
  require('./constructor')(app,db);
  require('./personal')(app,db);
  //const beerRouter = app.Router;
  // app.get('/beer', function(req,res){
  //   const collection = db.db("portal").collection("beer");
  //   collection.find({}).toArray(function(err, beers){
  //       if(err) return console.log(err);
  //       res.send(beers)
  //   });
  // });
  // app.post('/', (req, res) => {
  //   console.log(req.body)
  //   res.send('Hello')
  // });
};
