module.exports = function(app,db) {

  app.get('/cart/getCart', function(req,res){
    const collection = db.db("diplom").collection("cart");
    collection.find({}).toArray(function(err, auto){
        if(err) return console.log(err);
        console.log('/auto');
        res.send(auto);
    });
  });

  app.post('/cart/addToCart', function(req,res){
    const collection = db.db("diplom").collection("cart");
    collection.find({}).toArray(function(err, auto){
        if(err) return console.log(err);
        console.log('/auto');
        res.send(auto);
    });
  });

  app.post('/cart/plusCount', function(req,res){
    const collection = db.db("diplom").collection("cart");
    collection.find({}).toArray(function(err, auto){
        if(err) return console.log(err);
        console.log('/auto');
        res.send(auto);
    });
  });

  // Удаление тоже здесь
  app.post('/cart/minusCount', function(req,res){
    const collection = db.db("diplom").collection("cart");
    collection.find({}).toArray(function(err, auto){
        if(err) return console.log(err);
        console.log('/auto');
        res.send(auto);
    });
  });
};
