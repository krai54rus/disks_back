const crypto = require('crypto');
module.exports = function(app,db) {
    app.get('/users', function(req,res){
        res.send('ky');
    });
    app.get('/users/uniqueId', function(req,res){
        if (!req.cookies.clientId || req.cookies.clientId == '') {
            const uniqueId = crypto.randomBytes(16).toString('hex');
            res.send({ status: 'OK', result: uniqueId });
        } else {
            res.send({ status: 'ERROR', result: 'clientId уже существует' });
        }
    });
  };

