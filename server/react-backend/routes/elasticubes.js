var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;



router.get('/', function(req, res, next) {
  console.log('get received');
  
  var elasticubes = [];
  
  const url = "mongodb://RootUser:RepoAdmin!@localhost:27018"
  const client = new MongoClient(url);

  client.connect((err) => {
    if (err) throw err;

    var db = client.db('prismWebDB');
    

    db.collection('elasticubes').find({oid: {$exists: true}}).toArray().then((elasticubes) => {

      console.log(elasticubes)
      res.send(elasticubes);
    })

  })
  client.close();
})
  
  module.exports = router;