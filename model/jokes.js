var connection = require("../db/db");
var ObjectId = require('mongodb').ObjectId;


var all = function(callback) {

    var db = connection.get();
    var collection = db.collection("jokes");


    collection.find({}).toArray(function (err, result) {
        if(err) {
            return callback(err);
        } else {
            return callback(null, result);
        }
    });
}; // End of find all

var addOne = function(jokeToAdd, callback) {

    var db = connection.get();
    var collection = db.collection("jokes");

    collection.insertOne(jokeToAdd, function(err, result) {
        if(err) {
            return callback(err);
        } else {
            return callback(null, jokeToAdd);
        }
    });
}; //End of add one

var findOne = function(id, callBack) {

    var db = connection.get();
    var collection = db.collection("jokes");

    var o_id = new ObjectId(id);

    collection.findOne({"_id": o_id}, function(err, result) {

        if(err) {
            return callBack(err);
        } else {
            return callBack(result);
        }
    });
};

exports.allJokes = all;
exports.addJoke = addOne;
exports.findJoke = findOne;
//exports.editJoke = function (jokeToEdit, callback) {};
//exports.deleteJoke = function (id, callback) {};
//exports.randomJoke = function randomJoke(callback);







