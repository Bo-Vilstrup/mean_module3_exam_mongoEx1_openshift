var MongoClient = require('mongodb').MongoClient;

var connection;

var connect = function(url, done) {
    if (connection) return done();
    MongoClient.connect(url, function(err, db) {
        if (err){
            return done(err);
        }
        connection = db;
        console.log("Connection to the data base opened "+"\n");
        done();
    })
};

var get = function() {
    return connection;
};

var close = function(done) {
    if (connection) {
        connection.close(function(err, result) {
            connection= null;
            console.log("Connection to the data base closed "+"\n");
            done(err,result)
        })
    }
};

module.exports.connect = connect;
module.exports.get = get;
module.exports.close = close;