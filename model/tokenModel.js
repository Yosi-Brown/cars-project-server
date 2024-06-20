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
  // createdAt: {
  //   type: Date,
  //   expires: 60,
  //   default: Date.now,
  //   // expires: 3600
  // }
}, {timestamps: true});
tokenSchema.index({createdAt: 1},{expireAfterSeconds: 60});

module.exports = mongoose.model('Tokens', tokenSchema);