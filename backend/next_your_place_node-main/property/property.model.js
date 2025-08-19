const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require("mongoose");

const schema = new Schema({
  type: { type: String },
  city: { type: Object },
  state: { type: Object },
  owner: { type: String },
  addOn: { type: String },
  title: { type: String },
  price: { type: String },
  address: { type: String },
  zipCode: { type: String },
  features: { type: Object },
  locations: { type: Array },
  description: { type: String },
  negotiation: { type: String },
  phoneNumber: { type: String },
  hideAddress: { type: String },
  neighborhood: { type: Object },
  rentalPeriod: { type: String },
  contactMethod: { type: String },
  privacyPolicy: { type: Boolean },
  rentalDuration: { type: Number },
  images: { type: Array, default: [] }, // Array de URLs das imagens
  createdDate: { type: Date, default: Date.now },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("property", schema);
