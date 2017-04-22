var assert = require("assert");

module.exports.insertDocument = function (db, collection, document, callback) {
    var coll = db.collection(collection);
    
    coll.insert(document, function (err, result) {
        assert.equal(null, err);
        
        console.log("Inserted " + result.result.n + " documents into the collection " + collection);
        
        callback(result);
    });
};

module.exports.findDocuments = function (db, collection, callback) {
    var coll = db.collection(collection);
    
    coll.find({}).toArray(function (err, docs) {
        assert.equal(null, err);
        
        callback(docs);
    });
};

module.exports.removeDocument = function (db, collection, document, callback) {
    var coll = db.collection(collection);
    
    coll.deleteOne(document, function (err, result) {
        assert.equal(null, err);
        
        console.log("Removed the document " + document);
        
        callback(result);
    });
};

module.exports.updateDocument = function (db, collection, document, update, callback) {
    var coll = db.collection(collection);
    
    coll.updateOne(document, { $set: update }, null, function (err, result) {
        assert.equal(null, err);
        
        console.log("Updated the document with " + JSON.stringify(update));
        
        callback(result);
    });
};
