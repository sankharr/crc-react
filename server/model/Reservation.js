const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
    },
    customerName : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Reservation", reservationSchema);