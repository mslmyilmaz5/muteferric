const mongoose = require('mongoose')

const connectDB = (url) => {
    try {
        mongoose.connect(url);
        console.log('DATABASE CONNECTION IS OK!');
    } catch (error) {
        console.error('DATABASE CONNECTION ERROR:', error);
        throw error; 
    }
}

module.exports = connectDB;
