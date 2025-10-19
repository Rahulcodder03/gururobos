const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  subject: { type: String },
  message: { type: String },
  course: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
