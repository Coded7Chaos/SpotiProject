const mongoose = require('mongoose');

const relatedDataSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Referencia al modelo Product
        required: true
    },
    type: {
        type: String,
        enum: ['image', 'video', 'text'], // Tipos de información relacionada
        required: false
    },
    data: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('RelatedData', relatedDataSchema);