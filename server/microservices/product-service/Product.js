const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
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
        default: new Date()
    }
});

module.exports = Product = mongoose.model("Product", productSchema);