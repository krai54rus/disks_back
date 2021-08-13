const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const config = require('../config/db.js');
const path = require('path');
const cors = require('cors');
const app = express();
const uri = config.url;
const corsOption = {
  origin: function (origin, callback) {
    // console.log(origin);
    // if (whitelist.indexOf(origin) !== -1) {
    //   console.log("allowed cors for:", origin)
    //   callback(null, true)
    // } else {
    //   console.log("blocked cors for:", origin)
    //   callback(new Error('Not allowed by CORS'))
    // }
    callback(null, true);
  },
  allowedHeaders:
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe,Set-Cookie,Connection',
  methods: 'GET,PUT,POST,PATCH,DELETE,UPDATE,OPTIONS',
  credentials: true,
};
// app.use(express.static(path.join(__dirname,"../build")));
app.use(cookieParser())
// app.use(express.session());
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  store: MongoStore.create({
    mongoUrl: uri,
    // ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    // mongoOptions: advancedOptions // See below for details
  }),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(cors(corsOption))



const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect((err, client) => {
  if (err) return console.log(err);

  // Подрубаем роуты, пихаем туда экспресс объект для создания роутов и монго объект для работы с бд
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
