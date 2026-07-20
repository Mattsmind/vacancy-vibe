const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const argon2 = require('argon2');
const AppError = require('../utils/AppError');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

userSchema.methods.verifyPassword = async function (userInputPassword) {
    try {
        return await argon2.verify(this.password, userInputPassword);
    } catch (err) {
        return false;
    }
};

userSchema.pre('save', async function () {
    const user = this;

    if (!user.isModified('password')) return;

    try {
        const hashedPassword = await argon2.hash(user.password);
        user.password = hashedPassword;
    } catch (err) {
        throw new AppError('Error occurred while hashing password', 500);
    }
});

module.exports = mongoose.model('User', userSchema);