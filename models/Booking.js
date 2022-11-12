const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
    bookingStartDate:{
        type: Date,
        required: true
    },
    bookingEndDate:{ 
        type: Date,
        required:true
    }, 
    invoice : {
        type:String,
        required:true
    },
    itemId:{
        _id:{
            type:ObjectId,
            required:true,
            ref: "Item"
        },
        price:{
            type:Number,
            required:true
        },
        duration:{
            type: Number,
            required:true
        },
        title:{
            type: String,
            required: true
        }
    },
    total:{
        type: Number,
        required: true
    },
    payments:{
        proofPayment : {
            type:String,
            required:true
        },bankFrom:{
            type:String,
            required:true
        },
        accountHolder:{
            type: String,
            required:true
        },
        status:{
            type:String,
            required:true
        }
    },
    memberId:{
        type: ObjectId,
        ref : 'Member',
        required:true
    },
    bankId:{
        type: ObjectId,
        ref: 'Bank',
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);