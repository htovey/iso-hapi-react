var mysql = require('mysql');

var pool = mysql.createPool({
//	  host: process.env.MYSQL_HOST,
//	  user: process.env.MYSQL_USER,
//	  password: process.env.MYSQL_PASS,
//	  database: process.env.MYSQL_DB,
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "test",
	  connectionLimit: 10,
	  supportBigNumbers: true
	});

	// Get records from a city
	exports.getNoteRecords = function(userid, callback) {
	  var sql = "SELECT category FROM note WHERE USER_ID=?";
	  // get a connection from the pool
	  pool.getConnection(function(err, connection) {
	    if(err) { console.log(err); callback(true); return; }
	    // make the query
	    connection.query(sql, [userid], function(err, results) {
	      connection.release();
	      if(err) { console.log(err); callback(true); return; }
	      callback(false, results);
	    });
	  });
	};