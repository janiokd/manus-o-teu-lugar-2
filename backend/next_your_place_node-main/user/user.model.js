const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require("mongoose");

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    type: { type: String },
    name: { type: String },
    agree: { type: Boolean },
    photoURL: { type: String },
    password: { type: String },
    phoneNumber: { type: String },
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('user', schema);