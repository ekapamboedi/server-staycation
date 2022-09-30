const mongoose = require("mongoose");

const { ObjectId } = moongose.Schema;

const itemSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{ 
        type:Number,
        required:true
    },
    country:{
        type: String,
        required:true,
        default:'Indonesia'
    },
    city:{
        type:String,
        required:true
    },
    isPopular:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        required:true
    },
    imageId:[{
        type: ObjectId,
        ref : 'Image'
    }],
    feutureId:[{
        type: ObjectId,
        ref: 'Feature'
    }],
    activityId:[{
        type: ObjectId,
        ref: 'Activity'
    }]
    
});

module.exports = mongoose.model('Item', itemSchema);