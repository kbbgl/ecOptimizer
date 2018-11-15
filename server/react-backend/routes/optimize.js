var express = require('express');
var router = express.Router();
var cmd = require('node-cmd');
var path = require('path');


router.post('/', function(req, res) {
  console.log('POST /optimize');
  console.log(req.body);

  var elasticube = req.body.elasticube;
  cmd.get(
      `psm ecube info name="${elasticube}" serverAddress=localhost`,
      (err, data, stderr) => {
        //   var ecubePath = data.split("DBFarmDirectory: ")[1].split("LastFullBuildTime: ")[0];
        var ecubePath = path.join(path.normalize(data.split("DBFarmDirectory: ")[1].split("LastFullBuildTime: ")[0]), "ElastiCube.ecube").replace("\r\n", "");
        console.log(ecubePath);

        cmd.get(
            `psm ecube convert name="${ecubePath}"`,
            (err, data, stderr) => {
                if(err) throw err;
                if(stderr) throw stderr;

                console.log(data);
                
            }
        )
      }
  )


    
})
  
  module.exports = router;