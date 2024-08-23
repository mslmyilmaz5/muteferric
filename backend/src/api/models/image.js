const mongoose = require('mongoose')


const ImageScehma = new mongoose.Schema(
    {   
        userId: {
            type: String,
        },  
        image: {
            type: String,
        },        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('image',ImageScehma);