var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Product.js');
var dbSort = { server_address: 1};

/* GET ALL BY TERM */
// router.get('/SEARCH', function(req, res, next) {  
//   var SeachTerm = req.query.Term;  
//   if(SeachTerm == undefined) 
//     SeachTerm = req.query.term ;      
//   Hero.find({ name : { $regex: '.*' + SeachTerm + '.*' } }, function (err, person) {
//     if (err) return handleError(err);           
//     res.json(person);  
//   });
// });

/* GET ALL PRODUCTS */
router.get('/', function(req, res, next) {
  Product.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  }).sort(dbSort);
});

/* GET SINGLE PRODUCT BY ID */
router.get('/:id', function(req, res, next) {
  Product.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE PRODUCT */
router.post('/', function(req, res, next) {
  Product.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE PRODUCT */
router.put('/:id', function(req, res, next) {
  Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PRODUCT */
router.delete('/:id', function(req, res, next) {
  Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;