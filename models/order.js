const mongoose = require("mongoose")

const orderschema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
    image: { type: String, required: true }
})

module.exports = mongoose.model('order', orderschema)