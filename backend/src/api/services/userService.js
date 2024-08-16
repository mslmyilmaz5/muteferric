const User = require('../models/user');
const mongoose = require('mongoose');

const getUser = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId.id))
        throw new Error('No such user');

    return await User.findById(userId.id).select('-password -email -updatedAt');
}

const getUserAbouts = async (userId) => {

    if (!mongoose.Types.ObjectId.isValid(userId.id))
        throw new Error('No such user');

    return await User.findById(userId.id).select('about_one about_two');
}

const updateAboutOne = async (data, user_id) => {
   
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        throw new Error('No such user');
    }
    const {text} = data;
    const user = await User.findOneAndUpdate(
        { _id: user_id },
        { about_one: text },
        { new: true }
    );
    
    if (!user) {
        throw new Error('No such user');
    }
    return user;
};

const updateAboutTwo = async (data, user_id) => {
   
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        throw new Error('No such user');
    }
    const {text} = data;
    const user = await User.findOneAndUpdate(
        { _id: user_id },
        { about_two: text },
        { new: true }
    );
    
    if (!user) {
        throw new Error('No such user');
    }
    return user;
};


module.exports = {
    getUser,
    getUserAbouts,
    updateAboutOne,
    updateAboutTwo
};