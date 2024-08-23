const mongoose = require('mongoose')


const MuteferricSchema = new mongoose.Schema(
    {
        today_home_text: {
            type: String,
        },        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('muteferric',MuteferricSchema);