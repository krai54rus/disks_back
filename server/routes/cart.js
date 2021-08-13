module.exports = function(app,db) {

  app.get('/cart/getCart', function(req,res){
    const cart = db.db("diplom").collection("cart");
    let findId = {};
    console.log(req.cookies);
    let userCookieId = req.cookies.userId;
    if (userCookieId) {
      findId = { userId: userCookieId };
    } else {
      if (req.cookies.clientId ) {
        findId = { clientId: req.cookies.clientId };
      } else {
        res.send([]);
        return;
      }
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
    console.log(req.body);
    const product = req.body;
    let findId = {};
    let userCookieId = req.cookies.userId;
    if (userCookieId) {
      findId = { userId: userCookieId };
    } else {
      findId = { clientId: req.cookies.clientId };
    }
    console.log(req.cookies);
    const newCartObj = {
      prods: JSON.stringify(product),
      date_create: new Date(),
    };

    const newC = Object.assign(findId, newCartObj);
    console.log('newCart ', newC);
    const newCart = cart.insertOne(newC);
    return ;
    let cartObj = cart.findOne(findId,function(err, cartObj){
      console.log('cartObj ',cartObj);
        if(err) return console.log(err);
        if (cartObj) {
          let allProds = [];
          let newProds = '';
          // Если есть дубликат - прибавляет количество товара
          if (cartObj.prods !== '') {
            allProds = JSON.parse(cartObj.prods);
            // product.forEach((item) => {
              const dublicate = allProds.find(
                (bufferItem) => bufferItem.code === product.code,
              );
              if (dublicate) {
                dublicate.count += item.count;
              } else {
                allProds.push(item);
              }
            // });
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
          console.log('newCart ', newC);
          const newCart = cart.insertOne(newC);
          return { status: 'OK', result: product };
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
