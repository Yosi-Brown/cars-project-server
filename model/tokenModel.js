const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    expires: 60 * 15,
    default: Date.now,
   
  }
}, {timestamps: true});
tokenSchema.index({createdAt: 1},{expireAfterSeconds: 60 * 15});

module.exports = mongoose.model('Tokens', tokenSchema);