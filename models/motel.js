const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const motelSchema = new Schema({
    title: {
        type: String,
        minlength: [4, 'Title must be at least 4 characters!'],
        required: true
    },
    image: {
        type: String,
        default: () => `https://picsum.photos/400?random=${Math.random()}`,
        match: [/^https?:\/\/.+/, 'Please enter a valid HTTP or HTTPS URL'],
        required: true
    },
    price: {
        type: Number,
        min: [0.01, 'Price must be greater than $0.00!'], 
        required: true
    },
    description: {
        type: String,
        minlength: [10, 'Your Description is too short!'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, {
    timestamps: true
});

motelSchema.post('findOneAndDelete', async function (motel) {
    if (motel && motel.reviews && motel.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: motel.reviews } });
    }
});

module.exports = mongoose.model('Motel', motelSchema);