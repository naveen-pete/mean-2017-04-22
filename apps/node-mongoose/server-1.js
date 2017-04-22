var mongoose = require("mongoose");
var assert = require("assert");
var Dishes = require("./models/dishes-1");

var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
    console.log('Connected correctly to server');
    
    var newDish = Dishes({
        name: "Uthapizza",
        description: "test"
    });
    
    newDish.save(function(err) {
        assert.equal(null, err);
        
        console.log("Dish created!");
        
        Dishes.find({}, function(err, dishes) {
            assert.equal(null, err);
            
            console.log(dishes);
            
            db.collection("dishes").drop(function(err) {
                assert.equal(err);
                db.close();
            });
        });
    });
});
