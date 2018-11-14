var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var elasticubes = [];

router.get('/', function(req, res, next) {
  console.log('get received');
  
  // connect to Mongo
  MongoClient.connect("mongodb://RootUser:RepoAdmin!@localhost:27018", function(err, client) {
    
    if(!err) {
      console.log("Mongo connected");
    
      var db = client.db('prismWebDB');
    
      // iterate over elasticubes
      db.collection('elasticubes').find().forEach(function(elasticube, err) {
      
        if (err) throw err;

        // TODO - check what it means that oid is undefined
        // create object per elasticube
        if (elasticube && elasticube.oid){
          var title = elasticube.title;
          var oid = elasticube.oid;
  
          var ec = {
            title,
            oid
          }  

          // add elasticubes to array
          elasticubes.push(ec);
        }
      })

      console.log(`found ${elasticubes.length} elasticubes`);
      console.log('mongo connection closed');
      client.close();	

      res.send(elasticubes);

    }
  })  

  
});

module.exports = router;
