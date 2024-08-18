const Poet = require("../models/poet")
const Poetry = require("../models/poetry");

const mongoose = require('mongoose');


const registerPoet = async(data) => {
    const poet = await Poet.create(data)
    return poet;
}

const registerPoem = async(poetryData) => {
    const {title, poetry, isVisible, type,userId} = poetryData;
    return await Poetry.create({title,poetry,isVisible,type,userId});
}

const getPoet = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId.id))
        throw new Error('No such user');
    
    return await Poet.findById(userId.id).select('-password -email -updatedAt');

}

const getAllPoets = async () => {
    return await Poet.find({}).select('_id name');
};


const getLastPoets = async() => {
    return await Poet.find()
        .select('name _id')
        .sort({ createdAt: -1 })
        .limit(5);
};

const getDatabaseInfo = async () => {
    const stats = await Poet.countDocuments();
    return stats;
};

module.exports = {
    registerPoet,
    registerPoem,
    getPoet,
    getAllPoets,
    getLastPoets,
    getDatabaseInfo
};