module.exports = function(app,db) {
    app.get('/auto', function(req,res){
        const collection = db.db("diplom").collection("auto");
        collection.find({}).toArray(function(err, auto){
            if(err) return console.log(err);
            console.log('/auto');
            res.send(auto);
        });
    });
  };
