var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeaderSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        },
        abbr: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }    
    },
    { timestamps: true }
);

var Leader = mongoose.model('Leader', LeaderSchema);

module.exports = Leader;
