const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const PoetSchema = new mongoose.Schema(
    {   
        name: {
            type: String,
            required: true,
        },
        about_one: {
            type:String,
            default: ""
        },
        about_two: {
            type:String,
            default: ""
        },
        user_type: {
            type:String,
            default:"VP"
        }
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('poets',PoetSchema);