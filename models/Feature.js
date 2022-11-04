const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    qty:{
        type: Nummber,
        required: true,
    },
    imageUrl:{
        type: String,
        required: true
    },
    itemId:{
        type:ObjectId,
        ref: Item
    }
});

module.exports = mongoose.model('Feature', featureSchema);