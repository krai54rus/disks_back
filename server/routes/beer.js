// const express = require('express');
// const beerController = require('../controllers/beerController');
// const beerRouter = express.Router;

// beerRouter.get('/', beerController.getAllBeers);

// // beerRouter.use(passportAuth.isAuthenticated);

// beerRouter.post('/', beerController.addBeer);

// beerRouter.put('/address', beerController.updateBeer);

// module.exports = beerRouter;

module.exports = function(app,db) {
  app.get('/beer', function(req,res){
    const collection = db.db("portal").collection("beer");
    collection.find({}).toArray(function(err, beers){
        if(err) return console.log(err);
        console.log(beers);
        res.send(beers);
    });
  });
  app.get('/beer/style', function(req,res){
    let styleFind = req.query.style;
    console.log(req.query.style);
    const collection = db.db("portal").collection("beer");
    collection.find({'style':{$regex:styleFind,$options:"$i"}}).toArray(function(err, beers){
        if(err) return console.log(err);
        res.send(beers);
    });
  });
};
