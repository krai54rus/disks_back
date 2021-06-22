const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const config = require('../config/db.js');
const path = require('path');
const cors = require('cors');
const app = express();
const corsOption = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};
app.use(cors(corsOption))
// app.use(express.static(path.join(__dirname,"../build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = config.url;
const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect((err, client) => {
  if (err) return console.log(err);

  // Подрубаем роуты, пихаем туда экспресс объект для создания роутов и  монго объект для работы с бд
  require('./routes')(app,client);
  // Test роутер для фронта - удалить
  // app.get('/beer',(req,res)=>{
  //   const collection = client.db("portal").collection("beer");
  //   collection.find({}).toArray(function(err, beers){
  //       if(err) return console.log(err);
  //       res.send(beers)
  //   });
  // });
  //
  // app.use('/', indexRouter);
  // app.use('/beer', beerRouter);
  // app.use('/amazon', amazonRouter);
  // app.use('/catalog', catalogRouter);

  app.listen(5000, () => {
    console.log('сервер поехал');
  })
});
