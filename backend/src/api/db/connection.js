const mongoose = require('mongoose');

const connectDB = (url) => {
    try {
        mongoose.connect(url);
        console.log('DATABASE CONNECTION IS OK!');
    } catch (error) {
        console.error('DATABASE CONNECTION ERROR:', error);
        throw error;
    }
};

// Bağlantıyı sürekli aktif tutmak için ping fonksiyonu
function keepMongoAlive() {
    if (mongoose.connection.readyState === 1) {
        mongoose.connection.db.admin().ping((err, result) => {
            if (err) {
                console.error('Ping error:', err);
            } else {
                console.log('Ping result:', result);
            }
        });
    }
}

// Her 4 dakikada bir ping göndererek bağlantıyı aktif tut
setInterval(keepMongoAlive, 1 * 60 * 1000);

module.exports = connectDB;
