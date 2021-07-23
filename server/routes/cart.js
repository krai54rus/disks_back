module.exports = function(app,db) {

  app.get('/cart/getOrder', function(req,res){
    const collection = db.db("diplom").collection("orders");
    // if (
    //   !req.cookies.user ||
    //   !req.session.clientPhone ||
    //   JSON.parse(req.cookies.user).phone !== req.session.clientPhone
    // ) {
    //   return { status: 'ERROR', result: 'Не авторизован' };
    // }
    console.log(req.cookies);
    console.log(req.session);

    // const bdOrder = collection.findOne({ id: orderId, userId:  JSON.parse(req.cookies.user).id });
    // console.log(bdOrder);
    // if (bdOrder) {
    //   return { status: 'OK', result: bdOrder };
    // } else {
    //   return { status: 'ERROR', result: 'Заказ не найден' };
    // }
    collection.find({}).toArray(function(err, auto){
        if(err) return console.log(err);
        res.send(auto);
    });
  });

  app.post('/cart/addOrder', function(req,res){
    const collection = db.db("diplom").collection("orders");
    collection.find({}).toArray(function(err, auto){
        if(err) return console.log(err);
        console.log('/auto');
        res.send(auto);
    });
  });

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
