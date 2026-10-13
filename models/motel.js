const mongoose = require('mongoose');
const Review = require('./review');
//const { required } = require('joi');
const Schema = mongoose.Schema;

const motelSchema = new Schema({
    title: {
        type: String,
        minlength: [4, 'Title must be at least 4 characters!'],
        required: true
    },
    images: [
        {
            url: {
                type: String,
                required: true
            },
            filename: {
                type: String,
                required: true
            }
        }
    ],
    vibePic: {
        type: String,
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