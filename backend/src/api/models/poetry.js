const mongoose = require('mongoose')


const PoetrySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        poetry: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        isVisible: {
            type: Boolean,
        },
        type: {
            type: String,
          
        }
        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('poetries',PoetrySchema);