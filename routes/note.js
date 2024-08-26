
/*
 * GET note listing.
 */
var db = require('../mysql');

exports.get = function(req, res) {
	  db.getNoteRecords("htovey", function(err, results) {
	    if(err) { res.send(500,"Server Error"); return;
	    // Respond with results as JSON
	    }
	    res.send(results);
	    
	  });
	};
	
exports.list = function(req, res){
  res.send("respond with a resource");
};