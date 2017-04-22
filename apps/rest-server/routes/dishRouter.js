var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Dish = require('../models/dishes');

var router = express.Router();

router.use(bodyParser.json());

router.route('/')
    .get(function(req,res,next) {
        console.log('Get all dishes started.');
    
        Dish.find({}, function (err, dishes) {
            if (err) throw err;
            
            console.log('Get all dishes completed successfully.');
            console.log('dishes:', dishes);
            
            res.json(dishes);
        });
    })

    .post(function(req, res, next) {
        console.log('Create dish started.');
        console.log('req.body:', req.body);
    
        Dish.create(req.body, function (err, dish) {
            if (err) throw err;

            console.log('Create dish completed successfully.');
            
            var id = dish._id;
            console.log('id:', id);

            res.set('Content-Type', 'text/plain');
            res.end('Added the dish with id: ' + id);
        });
    })

    .delete(function(req, res, next) {
        console.log('Delete all dishes started.');

        Dish.remove({}, function (err, resp) {
            if (err) throw err;
            
            console.log('Delete all dishes completed successfully.');
            
            res.json(resp);
        });
    });

router.route('/:dishId')
    .get(function(req,res,next) {
        console.log('Get dish started.');
        console.log('req.params.dishId:', req.params.dishId);
    
        Dish.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;

            console.log('Get dish completed successfully.');
            console.log('dish:', dish);

            res.json(dish);
        });
    })

    .put(function(req, res, next) {
        console.log('Update dish started.');
        console.log('req.params.dishId:', req.params.dishId);
        console.log('req.body:', req.body);
    
        Dish.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {
            new: true
        }, function (err, dish) {
            if (err) throw err;

            console.log('Update dish completed successfully.');
            console.log('dish:', dish);

            res.json(dish);
        });
    })

    .delete(function(req, res, next) {
        console.log('Delete dish started.');
        console.log('req.params.dishId:', req.params.dishId);

        Dish.findByIdAndRemove(req.params.dishId, function (err, resp) {
            if (err) throw err;

            console.log('Delete dish completed successfully.');
            
            res.json(resp);
        });
    });

router.route('/:dishId/comments')
    .get(function (req, res, next) {
        console.log('Get all comments for a dish started.');
        console.log('req.params.dishId:', req.params.dishId);
    
        Dish.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            
            console.log('Get all comments completed successfully.');
            
            res.json(dish.comments);
        });
    })

    .post(function (req, res, next) {
        console.log('Create comment for a dish started.');
        console.log('req.params.dishId:', req.params.dishId);

        Dish.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            
            dish.comments.push(req.body);
            dish.save(function (err, dish) {
                if (err) throw err;
                
                console.log('Create comment completed successfully.');
                
                res.json(dish);
            });
        });
    })

    .delete(function (req, res, next) {
        console.log('Delete all comments for a dish started.');
        console.log('req.params.dishId:', req.params.dishId);

        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            
            for (var i = (dish.comments.length - 1); i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            
            dish.save(function (err, result) {
                if (err) throw err;
                
                console.log('Delete all comments completed successfully.');
                
                res.end('Deleted all comments!');
            });
        });
    });

router.route('/:dishId/comments/:commentId')
    .get(function (req, res, next) {
        console.log('Get comment for a dish started.');
        console.log('req.params.dishId:', req.params.dishId);
        console.log('req.params.commentId:', req.params.commentId);

        Dish.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            
            console.log('Get comment completed successfully.');
            
            res.json(dish.comments.id(req.params.commentId));
        });
    })

    .put(function (req, res, next) {
        console.log('Update comment for a dish started.');
        console.log('req.params.dishId:', req.params.dishId);
        console.log('req.params.commentId:', req.params.commentId);

        // We delete the existing commment and insert the updated
        // comment as a new comment
        Dish.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            
            dish.comments.id(req.params.commentId).remove();
            dish.comments.push(req.body);
            dish.save(function (err, dish) {
                if (err) throw err;
                
                console.log('Update comment completed successfully.');
                
                res.json(dish);
            });
        });
    })

    .delete(function (req, res, next) {
        console.log('Delete comment for a dish started.');
        console.log('req.params.dishId:', req.params.dishId);
        console.log('req.params.commentId:', req.params.commentId);

        Dish.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            
            if(dish.comments.id(req.params.commentId) === null) {
                res.status(404).send('No comment found for dish id: ' +
                                     req.params.dishId + 
                                     ' and comment id: ' +  
                                     req.params.commentId);
            }
            else {
                dish.comments.id(req.params.commentId).remove();
                dish.save(function (err, resp) {
                    if (err) throw err;

                    console.log('Delete comment completed successfully.');

                    res.json(resp);
                });
            }
        });
    });

module.exports = router;
