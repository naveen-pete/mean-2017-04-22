var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Promotion = require('../models/promotions');

var router = express.Router();

router.use(bodyParser.json());

router.route('/')
    .get(function(req,res,next){
        console.log('Get all promotions started.');
    
        Promotion.find({}, function (err, promotions) {
            if (err) throw err;
            
            console.log('Get all promotions completed successfully.');
            console.log('promotions:', promotions);
            
            res.json(promotions);
        });
    })

    .post(function(req, res, next){
        console.log('Create promotion started.');
        console.log('req.body:', req.body);
    
        Promotion.create(req.body, function (err, promotion) {
            if (err) throw err;

            console.log('Create promotion completed successfully.');
            
            var id = promotion._id;
            console.log('id:', id);

            res.set('Content-Type', 'text/plain');
            res.end('Added the promotion with id: ' + id);
        });
    })

    .delete(function(req, res, next){
        console.log('Delete all promotions started.');

        Promotion.remove({}, function (err, resp) {
            if (err) throw err;
            
            console.log('Delete all promotions completed successfully.');
            
            res.json(resp);
        });
    });

router.route('/:promotionId')
    .get(function(req,res,next){
        console.log('Get promotion started.');
        console.log('req.params.promotionId:', req.params.promotionId);
    
        Promotion.findById(req.params.promotionId, function (err, promotion) {
            if (err) throw err;

            console.log('Get promotion completed successfully.');
            console.log('promotion:', promotion);

            res.json(promotion);
        });
    })

    .put(function(req, res, next){
        console.log('Update promotion started.');
        console.log('req.params.promotionId:', req.params.promotionId);
        console.log('req.body:', req.body);
    
        Promotion.findByIdAndUpdate(req.params.promotionId, {
            $set: req.body
        }, {
            new: true
        }, function (err, promotion) {
            if (err) throw err;

            console.log('Update promotion completed successfully.');
            console.log('promotion:', promotion);

            res.json(promotion);
        });
    })

    .delete(function(req, res, next){
        console.log('Delete promotion started.');
        console.log('req.params.promotionId:', req.params.promotionId);

        Promotion.findByIdAndRemove(req.params.promotionId, function (err, resp) {
            if (err) throw err;

            console.log('Delete promotion completed successfully.');
            
            res.json(resp);
        });
    });

module.exports = router;
