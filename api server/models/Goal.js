const mongoose = require('mongoose');

const goalsSchema = mongoose.Schema({
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tracks',
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
  accomplished: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Goal = mongoose.model('goals', goalsSchema);

module.exports = Goal;

