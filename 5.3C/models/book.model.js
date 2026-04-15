const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    summary: { type: String, required: true },
    price: { type: mongoose.Decimal128, required: true, get: v => v.toString() },
    currency: { type: String, default: 'AUD' }
}, {
    toJSON: {
        getters: true,
        transform(_doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

module.exports = mongoose.model('Book', BookSchema);