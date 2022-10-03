const mongoose = require("mongoose");

const { ObjectId } = moongose.Schema;

const bookingSchema = new mongoose.Schema({
    bookingStartDate:{
        type: Date,
        required: true
    },
    bookingEndDate:{ 
        type: Date,
        required:true
    },
    proofPayment : {
        type:String,
        required:true
    },
    bankFrom:{
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
    },
    itemId:[{
        type: String,
        ref:'Item',
        required: true
    }],
    memberId:[{
        type: ObjectId,
        ref : 'Member',
        required:true
    }],
    bankId:[{
        type: ObjectId,
        ref: 'Bank',
        required: true
    }]
});

module.exports = mongoose.model('Booking', bookingSchema);