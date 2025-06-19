// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,         // remove extra whitespace
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,    // always store as lowercase
    trim: true,
    match: /.+\@.+\..+/, // basic email format validation
  },
  subject: {
    type: String,
    required: true,
    enum: ['general', 'support', 'feedback', 'other'],
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 5000,    // adjust as needed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Contact', contactSchema);
