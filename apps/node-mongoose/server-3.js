var mongoose = require('mongoose');
var assert = require('assert');
var Dishes = require('./models/dishes-3');

var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
    console.log('Connected correctly to server');
    
    Dishes.create({
        name: 'Uthapizza',
        description: 'Test desc',
        comments: [ {
            rating: 3,
            comment: 'This is good!',
            author: 'Rajani'
        } ]
    }, function (err, dish) {
        assert.equal(null, err);
        
        console.log('Dish created!');
        console.log(dish);
        
        var id = dish._id;
        
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                $set: { description: 'Updated test desc' }
//               , $push: { 
//                    comments: { 
//                        rating: 4,
//                        comment: 'Very good!',
//                        author: 'Hari'
//                    } 
//                }
            }, { new: true })
            .exec(function (err, dish) {
                assert.equal(null, err);
                
                console.log('Updated Dish!');
                console.log(dish);
                
                dish.comments.push({
                    rating: 5,
                    comment: 'Excellent!!',
                    author: 'Krishna'
                });
                
                dish.save(function (err, dish) {
                    assert.equal(null, err);
                    
                    console.log('Added new comment to the Dish!');
                    console.log(dish);
                    
                    db.collection('dishes').drop(function (err, result) {
                        assert.equal(null, err);

                        console.log('Dropped Dish collection!');
                        console.log(result);

                        db.close();
                    });
                });
            });
        }, 3000);
    });
});
