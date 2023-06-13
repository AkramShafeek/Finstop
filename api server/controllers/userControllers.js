const User = require('../models/UserModel');
const { generateToken } = require('../middleware/auth');

const getUsersController = async (req, res) => {
    const reqAuth = req.headers.authorization;
    if (!reqAuth || !reqAuth.startsWith('Bearer '))
        throw new Error("No key provided");

    const key = reqAuth.split(' ')[1];

    if (process.env.GET_USERS_KEY === key) {
        const users = await User.find();
        res.status(200).send(users);
    }
    else {
        throw new Error("key doesn't match");
    }
}

const signUpController = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
        throw new Error('User already exists');
    const newUser = await User.create(req.body);
    res.status(200).send("Signed up successfully");
}

const loginController = async (req, res) => {
    if (!req.body)
        throw new Error("request body is empty");
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user && (await user.comparePassword(password))) {
        user.password = undefined;
        const token = generateToken(user._id);
        res.status(200).json({ token, user });
    }
    else {
        throw new Error('Invalid Email or Password');
    }
}

const editController = async (req, res) => {
    if (!req.user)
        throw new Error("User doesn't exist");
    if (req.body.password)
        delete req.body.password;
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    user.password = undefined;

    res.status(200).send(user);
}

const passwordController = async (req, res) => {
    if (!req.body)
        throw new Error("request body is empty");
    if (!req.body.oldPassword || !req.body.newPassword)
        throw new Error("insufficient parameters");
    const user = await User.findById(req.user._id);
    if (user && user.comparePassword(req.body.oldPassword)) {
        user.password = req.body.newPassword;
        await user.save();
        res.status(200).send("password updated");
    }
    else {
        throw new Error("old password doesn't match");
    }
}

module.exports = {
    getUsersController,
    signUpController,
    loginController,
    editController,
    passwordController
}