const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
    {   
        name: {
            type: String,
            required: true,
        },
        mahlas: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique:true,
            lowercase:true,
        },
        password: {
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
            default:"N"
        }
    },
    {
        timestamps: true
    }
)




// fire a function before doc saved to db
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// function for compare password
UserSchema.methods.comparePassword = async function(candidatePassword){
    
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch
}


module.exports = mongoose.model('users',UserSchema);