// call the packages we need
var express    = require('express')      // call express
var bodyParser = require('body-parser')
var app        = express()     // define our app using express
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// configure app to use bodyParser() and ejs
app.use(bodyParser.urlencoded({ extended: true }));
app.use( express.static(__dirname + "/public"))
app.set('view engine','ejs');

// get an instance of the express Router
var router = express.Router();

// a “get” at the root of our web app: http://localhost:3000/api
router.get('/', function(req, res) {
  console.log("GET")
  var dataResult

  db.collection('tasks').find({}).toArray((err, result) => {
    if(err) {console.log(err)}
    res.render('index.ejs', {resultData: result})

  })


});

router.post('/buttonclick', function(req, res) {
  console.log("BUTTON")
  var id = req.query.id
  console.log(id);
  db.collection('tasks').deleteOne({"_id": ObjectId(id)}, function(err, res_) {
    if (err) console.log(err);
    db.collection('tasks').find({}).toArray((err, result) => {
      res.send(result)

    })
  })

})

router.post('/additem', function(req, res) {
  console.log("NEW ITEM")
  var name = req.query.name
  var dueDate = req.query.dueDate
  var tag = req.query.tag
   console.log("post")
  db.collection('tasks').insertOne({name: name, dueDate: dueDate}, function(){
    console.log("REDIRECT")
    db.collection('tasks').find({}).toArray((err, result) => {
      if(err) {console.log(err)}
      console.log("About to render")
      res.send(result)

    })
  })
})
// all of our routes will be prefixed with /api


// START THE SERVER
//==========================================================
var db
MongoClient.connect('mongodb://nathanmbaker:Soccerguy1@ds055689.mlab.com:55689/to-do-list-nathan',{ useNewUrlParser: true }, (err, client) => {
    if(err) console.log(err)
    console.log("Connected successfully to server");

    db = client.db('to-do-list-nathan');
    port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log('WORKING')
    })
})

app.use('/api', router);
