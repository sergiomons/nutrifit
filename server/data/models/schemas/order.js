const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    deliveryAddress: {
        type: String,
        required: true
    },
    orderDate: {
        type: String,
        // required: true
    },
    userId: [{
        type: ObjectId,
        ref: 'User',
        required: true
    }],
    orderProducts: [{
        type: ObjectId,
        ref: 'Product',
        required: true
    }],
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['unpaid', 'processing', 'paid'],
        default: 'unpaid',
        required: true
    }
})