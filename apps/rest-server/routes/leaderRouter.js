var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Leader = require('../models/leadership');

var router = express.Router();

router.use(bodyParser.json());

router.route('/')
    .get(function(req,res,next){
        console.log('Get all leaders started.');
    
        Leader.find({}, function (err, leaders) {
            if (err) throw err;
            
            console.log('Get all leaders completed successfully.');
            console.log('leaders:', leaders);
            
            res.json(leaders);
        });
    })

    .post(function(req, res, next){
        console.log('Create leader started.');
        console.log('req.body:', req.body);
    
        Leader.create(req.body, function (err, leader) {
            if (err) throw err;

            console.log('Create leader completed successfully.');
            
            var id = leader._id;
            console.log('id:', id);

            res.set('Content-Type', 'text/plain');
            res.end('Added the leader with id: ' + id);
        });
    })

    .delete(function(req, res, next){
        console.log('Delete all leaders started.');

        Leader.remove({}, function (err, resp) {
            if (err) throw err;
            
            console.log('Delete all leaders completed successfully.');
            
            res.json(resp);
        });
    });

router.route('/:leaderId')
    .get(function(req,res,next){
        console.log('Get leader started.');
        console.log('req.params.leaderId:', req.params.leaderId);
    
        Leader.findById(req.params.leaderId, function (err, leader) {
            if (err) throw err;

            console.log('Get leader completed successfully.');
            console.log('leader:', leader);

            res.json(leader);
        });
    })

    .put(function(req, res, next){
        console.log('Update leader started.');
        console.log('req.params.leaderId:', req.params.leaderId);
        console.log('req.body:', req.body);
    
        Leader.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, {
            new: true
        }, function (err, leader) {
            if (err) throw err;

            console.log('Update leader completed successfully.');
            console.log('leader:', leader);

            res.json(leader);
        });
    })

    .delete(function(req, res, next){
        console.log('Delete leader started.');
        console.log('req.params.leaderId:', req.params.leaderId);

        Leader.findByIdAndRemove(req.params.leaderId, function (err, resp) {
            if (err) throw err;

            console.log('Delete leader completed successfully.');
            
            res.json(resp);
        });
    });

module.exports = router;
