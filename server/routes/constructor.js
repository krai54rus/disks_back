module.exports = function(app,db) {
    app.get('/constructor', function(req,res){
      const collAuto = db.db("diplom").collection("auto");
      const collDisks = db.db("diplom").collection("disks");
      const marka = req.query.marka;
      const model = req.query.model;
      let diskSize = '';
      if (marka) {
        // Поиск марки
        let resMarka = collAuto.findOne({name:marka},function(err, markaObj){
            if(err) return console.log(err);
            if (markaObj) {
              // Поиск модели марки и ее размеров
              const resModel = markaObj.models.filter(modelObj=> modelObj.name == model);
              diskSize = resModel[0].size;
            }
            // Поиск дисков по размерам модели
            collDisks.find( { size: { $in: diskSize } } ).toArray(function(err, disks){
              if(err) return console.log(err);
              res.send(disks);
          });
        });
      }
    });
  };
