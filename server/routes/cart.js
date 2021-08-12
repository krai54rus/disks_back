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
    const cart = db.db("diplom").collection("cart");
    let findId = {};
    let userCookieId = req.cookies.userId;
    if (userCookieId) {
      findId = { userId: userCookieId };
    } else {
      findId = { clientId: req.cookies.clientId };
    }
    let cartObj = cart.findOne(findId,function(err, cart){
      console.log('cart', cart);
        if(err) return console.log(err);
        if (cart) {
          // return cart;
          res.send(cart);
        } 
        // return [];
        res.send([]);
    });
    // console.log('cartObj',cartObj);
    // res.send(cartObj);
  });

  app.post('/cart/addToCart', function(req,res){
    const cart = db.db("diplom").collection("cart");
    // Поиск корзины в БД
    const product = res.body.prodInfo;
    let findId = {};
    let userCookieId = req.cookies.userId;
    // if (cookies.user) {
    //   userCookie = JSON.parse(cookies.user);
    // }
    // console.log(req.cookies);
    // console.log(req.session);
    if (userCookieId) {
      findId = { userId: userCookieId };
    } else {
      findId = { clientId: req.cookies.clientId };
    }
    // const cartObj = await this.cartRepository.findOne(findId);
    // const cartObj = await cart.findOne(findId);
    let cartObj = cart.findOne(findId,function(err, cartObj){
      console.log(cartObj);
        if(err) return console.log(err);
        if (cartObj) {
          let allProds = [];
          let newProds = '';
          // Если есть дубликат - прибавляет количество товара
          if (cartObj.prods !== '') {
            allProds = JSON.parse(cartObj.prods);
            product.forEach((item) => {
              const dublicate = allProds.find(
                (bufferItem) => bufferItem.id === item.id,
              );
              if (dublicate) {
                dublicate.counter += item.counter;
              } else {
                allProds.push(item);
              }
            });
            newProds = JSON.stringify(allProds);
          } else {
            newProds = JSON.stringify(product);
          }
          // Обновляет корзину
          const newCart = cart.update(
            { id: cartObj.id },
            { prods: newProds },
          );
          return { status: 'OK', result: JSON.parse(newProds) };
        } else {
          // Создаем корзину и сохраняем массив товаров
          const newCartObj = {
            prods: JSON.stringify(product),
            date_create: new Date(),
          };
          const newC = Object.assign(findId, newCartObj);
          const newCart = cart.save(newC);
          return { status: 'OK', result: product };
        }
    });
    console.log('cartObj', cartObj);
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
