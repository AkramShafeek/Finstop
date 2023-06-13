const mongoose = require('mongoose');

const connectToMongo = () => {
    return mongoose.connect(process.env.MONGO_URI);
}

module.exports = connectToMongo;