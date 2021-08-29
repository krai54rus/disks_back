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
        console.log('personal/auth ',req.body);
        const session = req.session;
        const query = req.body;
        // res.send(req.query);
        const collection = db.db("diplom").collection("personal");
        collection.findOne({login:query.login, password: query.password},function(err, user){
            if(err) return console.log(err);
            if (user) {
                session.isAuth = true;
                session.login = user.login;
                const { password, ...userObj } = user;
                res.send({status:'OK', result: userObj});
            }else{
                res.send({status:'ERROR', result: 'Пользователь не найден'});
            }
        });
    });
    app.get('/personal/checkAuth',function(req,res){
        console.log('personal/checkAuth ',req.body);
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
        console.log('personal/checkAuth ',req.body);
        const session = req.session;
        const collection = db.db("diplom").collection("personal");
        collection.findOne({login:req.body.login}, function(err, user){
            if(err) return console.log(err);
            if (user) {
                // res.send(new Error('Пользователь уже существует'));
                res.send({status:'ERROR', result: 'Такой пользователь уже существует'});
            }else{
                const userRegisterObj = {
                    login:req.body.login,
                    password:req.body.password,
                    user:{},
                    disks:[],
                    garage:[],
                };
                const newUserReq = collection.insertOne(userRegisterObj, function(err, newUser){
                    if(err) return console.log(err);
                    session.isAuth = true;
                    session.login = req.body.login;
                    const { password, ...userObj } = userRegisterObj;
                    console.log('userObj ', userObj);
                    res.send({status:'OK', result: userObj});
                });
                
            }
        });
    });
  };
