const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userModel = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phone: [{ type: String }],
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'user-default-avatar',
    }

}, { timestamps: true });

userModel.pre('save', async function (next) {
    console.log("pre middleware fired");
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userModel.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("users", userModel);

module.exports = User;