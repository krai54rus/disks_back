const crypto = require('crypto');
module.exports = function(app,db) {
    app.get('/personal/getUnique',function(req,res){
        console.log(req.cookies);
        if (!req.cookies.clientId || req.cookies.clientId == '') {
            const uniqueId = crypto.randomBytes(16).toString('hex');
            res.send({ status: 'OK', result: uniqueId });
          } else {
            res.send({ status: 'ERROR' });
          }
    });
    app.get('/personal/auth', function(req,res){
        console.log(req.query);
        res.send(req.query);
      const collection = db.db("portal").collection("personal");
      collection.findOne({login:req.query.login, password: req.query.password}).toArray(function(err, user){
          if(err) return console.log(err);
            if (user) {
                res.send(user);
            }else{
                res.send(new Error('Пользователь не найден'));
            }
      });
    });
    app.post('/personal/register', function(req,res){
        const collection = db.db("portal").collection("personal");
        collection.findOne({login:req.body.login}, function(err, user){
            if(err) return console.log(err);
            if (user) {
                res.send(new Error('Пользователь уже существует'));
            }else{
                const newUser = collection.insertOne(req.body);
                res.send(newUser);
            }
        });
    });

    // app.get('/getOrders', function(req,res){
  //   const collection = db.db("diplom").collection("personal");
  //   collection.find({}).toArray(function(err, auto){
  //       if(err) return console.log(err);
  //       console.log('/auto');
  //       res.send(auto);
  //   });
  // });
  };
