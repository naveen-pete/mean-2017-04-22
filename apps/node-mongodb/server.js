var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dboper = require('./operations');

var url = "mongodb://localhost:27017/conFusion";

MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    
    console.log("Connection to server successful.");
    
    dboper.insertDocument(db, "dishes", {name: "Dosa", description: "Test Desc"}, function (result) {
        console.log("After Insert: ");
        console.log(result.ops);

        dboper.findDocuments(db, "dishes", function (docs) {
            console.log("After Find: ");
            console.log(docs);
            
            dboper.updateDocument(db, "dishes", {name: "Dosa"}, {description: "Updated Test Desc"}, function (result) {
                console.log("After Update: ");
                console.log(result.result);
                
                dboper.findDocuments(db, "dishes", function (docs) {
                    console.log("After Find: ");
                    console.log(docs);
                    
                    db.dropCollection("dishes", function (result) {
                        console.log(result);
                        db.close();
                    });
                });
            });
        });
    });
});
