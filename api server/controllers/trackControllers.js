const Track = require('../models/TrackModel');

const fetchTracks = async (req, res, next) => {
    if (!req.body)
        throw new Error("empty request body");

    // populate user if necessary
    // const tracks = await Track.find().populate("user", "-password");

    const tracks = await Track.find();
    res.status(200).send(tracks);
}

const createTrack = async (req, res, next) => {
    if (!req.body)
        throw new Error("empty request body");
    const { name, balance } = req.body;
    const track = { name, balance, user: req.user._id };
    const createdTrack = await Track.create(track);
    res.status(200).send(createdTrack);
}

const editTrack = async (req, res, next) => {
    if (!req.body)
        throw new Error("empty request body");
    if (req.body.balance)
        delete req.body.balance;
    const newName = req.body.name;
    const updatedTrack = await Track.findByIdAndUpdate(req.body.id, { name: newName }, { new: true });
    res.status(200).send(updatedTrack);
}

const deleteTrack = async (req, res, next) => {
    if (!req.body)
        throw new Error("empty request body");
    const deletedTrack = await Track.findByIdAndDelete(req.body.id);
    res.status(200).send(deletedTrack);
}

module.exports = {
    fetchTracks,
    createTrack,
    editTrack,
    deleteTrack
}