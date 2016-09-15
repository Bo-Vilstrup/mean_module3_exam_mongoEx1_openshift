var express = require('express');
var router = express.Router();


var jokes = require('../model/jokes');

/* GET users listing. */
router.get('/jokes/all', function (req, res, next) {
    console.log("from model/jokes: " );
    jokes.allJokes(function (err, result) {

        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}); // End of get all

router.post('/jokes/addOne', function (req, res, next) {

    var newJoke = req.body;
    jokes.addJoke(newJoke, function (err, result) {

        if (err) {
            return res.json(err);
        } else {
            return res.json(result);
        }
    });
}); // End of post one


router.get('/jokes/one/:id', function (req, res, next) {

    var id = req.params.id;

    jokes.findJoke(id, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}); // End of get all


module.exports = router;
