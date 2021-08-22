const crypto = require('crypto');
module.exports = function(app,db) {
    app.get('/personal/getUnique',function(req,res){
        console.log('cookie',req.cookies);
        if (!req.cookies.clientId || req.cookies.clientId == '') {
            const uniqueId = crypto.randomBytes(16).toString('hex');
            res.send({ status: 'OK', result: uniqueId });
          } else {
            res.send({ status: 'ERROR' });
          }
    });
    app.post('/personal/auth', function(req,res){
        console.log('body auth ',req.body);
        const session = req.session;
        const query = req.body;
        // res.send(req.query);
        const collection = db.db("diplom").collection("personal");
        collection.findOne({login:query.login, password: query.password},function(err, user){
            if(err) return console.log(err);
            if (user) {
                session.isAuth = true;
                session.login = user.login;
                res.send({status:'OK', result: user});
            }else{
                res.send({status:'ERROR', result: 'Пользователь не найден'});
            }
        });
    });
    app.get('/personal/checkAuth',function(req,res){
        const session = req.session;
        const cookies = req.cookies;
        const query = req.query;
        if (session.login && session.isAuth && session.login === cookies.login) {
            const collection = db.db("diplom").collection("personal");
            collection.findOne({login:cookies.login}, function(err, user){
                if(err) return console.log(err);
                if (user) {
                    const { password, ...userObj } = user;
                    res.send({status:'OK', result: userObj});
                }else{
                    res.send({status:'ERROR', result: 'Пользователь не найден'});
                }
            });
        }
    });
    app.post('/personal/register', function(req,res){
        const collection = db.db("diplom").collection("personal");
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
