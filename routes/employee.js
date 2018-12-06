var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var db = mongoose.connection;
var Schema = mongoose.Schema;
var dbUrl = 'mongodb://localhost:27017/emp';
var Employee = Schema({
name: String,
designation:String
});
var Employee = mongoose.model('Employee', Employee);
db.on('error', function () {
console.log('there was an error communicating with the database');
});
mongoose.connect(dbUrl, function (err) {
if (err) {
return console.log('there was a problem connecting to the database!' + err);
}
});

router.get('/employees', function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    Employee.find().sort('name').exec(function(error, results) {
if (error) {
return next(error);
}
// Respond with valid data
res.json(results);
});
});
router.get('/employees/:name', function(req, res, next) {
Employee.findOne({
name: req.params.name
}).populate('Employee').exec(function (error, results) {
if (error) {
return next(error);
}
// If valid user was not found, send 404
if (!results) {
res.send(404);
}
// Respond with valid data
res.json(results);
});
});
router.get('/', function(req, res, next) {
    res.end("results");
    });
    
    
module.exports = router;
