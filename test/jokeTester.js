/*
 run npm test, or press the run bottom

 here we test the joke api

 check this site:
 https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
 */
var expect = require("chai").expect;
var request = require("request");
var http = require("http");
var app = require('../app');
var server;
var TEST_PORT = 3456;

var db = require("../db/db");
var app = require('../app');

before(function(done){

    server = http.createServer(app);

    var connection_string = "mongodb://localhost:27017/test"; // mongodb://localhost:27017/my_database_name';
    db.connect(connection_string, function(err){

        if(err){
            console.log("Could not connect to Database");
            return;
        } else
        {
            server.listen(TEST_PORT,function(){
                console.log("Test server started "+"\n");
                done();
            });
        }
    });
});

after(function(done){
    server.close();
    db.close();
    console.log("Test server closed"+"\n");
    done();
});

describe("Test of the joke api" , function(){

    //describe("POST: /api/add ", function () {
    //    var options = {
    //        url: "http://localhost:" + TEST_PORT + "/api/add",
    //        method: "POST",
    //        json: true,
    //        body: {newJoke: "Its better to be late than to arrive ugly"}
    //    };
    //    it("should return the posted joke", function (done) {
    //        request(options, function (error, res, body) {
    //            var addedJoke = body.newJoke;
    //            expect(addedJoke).to.be.equal("Its better to be late than to arrive ugly");
    //            //You should also check whether the joke actually was added to the Data-store
    //            done();
    //        });
    //    })
    //}); // End of POST

    describe("GET: /api/jokes/all", function() {

        var options = {
            url: "http://localhost:" + TEST_PORT + "/api/jokes/all",
            method: "GET",
            json: true
        };

        it("Should return all the jokes" , function(done) {

            request(options, function(err, res, body) {

                var array = body;
                expect(array.length).to.have.length.equal(22);
                done();
            });
        });
    }); // End of GET :: all


    //describe("GET: /api/random", function() {
    //    var options = {
    //        url: "http://localhost:" + TEST_PORT + "/api/random",
    //        method: "GET",
    //        json: true
    //    };
    //    it("Should return one joke" ,function(done) {
    //        request(options, function(err, res, body) {
    //            var array = body.jokes;
    //            expect(array.length).to.have.length.equal(1);
    //            done();
    //        });
    //    });
    //}); // End of GET :: random
}); // End of Test og the joke api