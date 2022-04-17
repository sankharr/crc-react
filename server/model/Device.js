const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    lastUpdatedDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Device", deviceSchema);