var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = "mongodb://localhost:27017/conFusion";

MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    
    console.log("Connection to server successful.");
    var collection = db.collection("dishes");
    
    collection.insertOne({name: "Dosa", description: "Dosa description"}, function (err, result) {
        assert.equal(null, err);
        
        console.log("After Insert:");
        console.log(result.ops);
        
        collection.find({}).toArray(function (err, docs) {
            assert.equal(null, err);
            
            console.log("Found:");
            console.log(docs);
            
            db.dropCollection("dishes", function (err, result) {
                assert.equal(null, err);
                
                db.close();
            });
        });
    });
});
