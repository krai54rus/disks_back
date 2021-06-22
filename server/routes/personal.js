module.exports = function(app,db) {
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
  };
