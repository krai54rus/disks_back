module.exports = function(app,db) {

  app.get('/cart/getCart', function(req,res){
    const cart = db.db("diplom").collection("cart");
    let findId = {};
    // console.log(req.cookies);
    let userCookieLogin = req.cookies.login;
    if (userCookieLogin) {
      findId = { userLogin: userCookieLogin };
    } else {
      if (req.cookies.clientId ) {
        findId = { clientId: req.cookies.clientId };
      } else {
        res.send([]);
        return;
      }
    }
    let cartObj = cart.findOne(findId,function(err, cart){
      // console.log('cart', cart);
        if(err) return console.log(err);
        if (cart) {
          res.send(cart);
          return;
        }
        res.send([]);
        return;
    });
  });

  app.post('/cart/addToCart', function(req,res){
    const cart = db.db("diplom").collection("cart");
    // Поиск корзины в БД
    // console.log(req.body);
    const product = req.body;
    let findId = {};
    let userCookieLogin = req.cookies.login;
    if (userCookieLogin) {
      findId = { userLogin: userCookieLogin };
    } else {
      findId = { clientId: req.cookies.clientId };
    }
    // const newCartObj = {
    //   prods: [product],
    //   date_create: new Date(),
    // };

    // const newC = Object.assign(findId, newCartObj);
    // console.log('newCart ', newC);
    // const newCart = cart.insertOne(newC);
    let cartObj = cart.findOne(findId,function(err, cartObj){
      // console.log('cartObj ',cartObj);
        if(err) return console.log(err);
        if (cartObj) {
          let allProds = [];
          let newProds = '';
          // Если есть дубликат - прибавляет количество товара
          if (cartObj.prods !== '' && cartObj.prods.length) {
            allProds = cartObj.prods;
            // product.forEach((item) => {
              const dublicate = allProds.find(
                (bufferItem) => bufferItem.code === product.code,
              );
              if (dublicate) {
                dublicate.count += product.count;
              } else {
                allProds.push(product);
              }
              console.log('after: ', dublicate);
            // });
            newProds = allProds;
          } else {
            newProds = [product];
          }
          // Обновляет корзину
          const newCart = cart.updateOne(
            { _id: cartObj._id },
            {$set:{ prods: newProds }},
          );
          res.send({ status: 'OK', result: newProds });
        } else {
          // Создаем корзину и сохраняем массив товаров
          const newCartObj = {
            prods: [product],
            date_create: new Date(),
          };

          const newC = Object.assign(findId, newCartObj);
          console.log('newCart ', newC);
          const newCart = cart.insertOne(newC);
          res.send({ status: 'OK', result: product });
        }
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
