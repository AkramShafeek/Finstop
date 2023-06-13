const mongoose = require('mongoose');

const TrackModel = new mongoose.Schema({
    // now what?
    name: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }    
}, { timestamps: true });

const Track = mongoose.model("tracks", TrackModel);

module.exports = Track;