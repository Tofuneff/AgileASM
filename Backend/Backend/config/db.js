const mongoose = require('mongoose');
const db = 'mongodb://localhost:27017/Planta';

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = { connectDB };
