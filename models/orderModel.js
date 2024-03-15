const mongoose = require('mongoose');
const user = require('./../models/userModel')
// Define the schema
const ordersSchema = new mongoose.Schema({
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "menu" }],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    status: {
        type: String,
        enum: ["Order received", "Preparing", "on the way", "deliverd"],
        default: "Order received",
    },
}, { timestamps: true });

// Export the model
module.exports = mongoose.model('Order', ordersSchema);
