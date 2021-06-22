module.exports = function(app,db) {
    app.get('/disks', function(req,res){
      const collection = db.db("portal").collection("beer");
      collection.find({}).toArray(function(err, disks){
          if(err) return console.log(err);
          res.send(disks);
      });
    });
    app.get('/main/disks', function(req,res){
      const collection = db.db("diplom").collection("disks");
      collection.find({main:true}).toArray(function(err, disks){
          if(err) return console.log(err);
          res.send(disks);
      });
    });
    app.get('/disks/all', function(req,res){
      const collection = db.db("diplom").collection("disks");
      collection.find({}).toArray(function(err, disks){
          if(err) return console.log(err);
          console.log('/disks/all');
          res.send(disks);
      });
    });
    app.get('/disks/filter',function(req,res){
      const arr = require('./arr.js');
      // console.log(arr);
      let arrET = [];
      let arrDIA = [];
      let arrSize = [];
      arr.forEach((item,index)=>{
        arrET.push(item.ET);
        arrDIA.push(item.DIA);
        arrSize.push(item.size);
      });
      // Оставляем уникальные значения в массиве
      arrET = Array.from(new Set(arrET));
      arrDIA = Array.from(new Set(arrDIA));
      arrSize = Array.from(new Set(arrSize));
      console.log(arrET);
    });
    app.get('/personal/disks', function(req,res){
      const collection = db.db("diplom").collection("disks");
      collection.find({}).limit( 10 ).toArray(function(err, disks){
          if(err) return console.log(err);
          console.log('/personal/disks');
          res.send(disks);
      });
    });
    app.get('/beer/style', function(req,res){
      let styleFind = req.query.style;
      console.log(req.query.style);
      const collection = db.db("portal").collection("beer");
      collection.find({'style':{$regex:styleFind,$options:"$i"}}).toArray(function(err, beers){
          if(err) return console.log(err);
          res.send(beers);
      });
    });
  };
