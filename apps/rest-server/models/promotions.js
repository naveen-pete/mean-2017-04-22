var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var PromotionSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        image: {
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
        }    
    },
    { timestamps: true }
);

var Promotion = mongoose.model('Promotion', PromotionSchema);

module.exports = Promotion;
