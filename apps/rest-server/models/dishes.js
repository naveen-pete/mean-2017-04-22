var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var CommentSchema = new Schema({
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required:true
        }
    }, 
    { timestamps: true } 
);

var DishSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        label: {
            type: String,
            default: ''
        },
        price: {
            type: Currency,
            required: true
        },
        description: {
            type: String,
            required: true
        }, 
        comments: [ CommentSchema ]
    },
    { timestamps: true }
);

var Dish = mongoose.model('Dish', DishSchema);

module.exports = Dish;
