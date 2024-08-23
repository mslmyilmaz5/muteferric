const Poetry = require('../models/poetry');
const User = require('../models/user');
const Poet = require('../models/poet');

const mongoose = require('mongoose')

const registerPoetry = async(poetryData,userId) => {
    const {title, poetry, isVisible, type} = poetryData;
    return await Poetry.create({title,poetry,userId,isVisible,type});
}

const deletePoetry = async(poetryId) => {
    if (!mongoose.Types.ObjectId.isValid(poetryId)) 
        return res.status(404).json({error: 'No such poem'})
      
    return await Poetry.findOneAndDelete({_id: poetryId});
}

const getPoetries = async (userId) => {
    
    return await Poetry.find({userId:userId}).sort({createdAt: -1})
}

const getVisiblePoetries = async (userId) => {
    
    return await Poetry.find({userId:userId, isVisible:true});

}

const getPoetry = async (poetryId) => {
    if (!mongoose.Types.ObjectId.isValid(poetryId)) {
        throw new Error('No such poem');
    }
    return await Poetry.findById(poetryId);
}


const updatePoetry = async (poetryData, poetryId) => {
    if (!mongoose.Types.ObjectId.isValid(poetryId)) {
        throw new Error('No such poem');
    }

    const poem = await Poetry.findOneAndUpdate(
        { _id: poetryId },
        { ...poetryData },
        { new: true }
    );

    if (!poem) {
        throw new Error('No such poem');
    }

    return poem;
};


// for home page poetries
const getLatestPoetries = async() => {
    return await Poetry.find(
        {isVisible:true, type:"p"})
        .select('_id title createdAt')
        .sort({ createdAt: -1 })
        .limit(5);
};

// for home page essays
const getLatestEssays = async() => {
    return await Poetry.find(
        {isVisible:true, type:"e"})
        .select('_id title createdAt')
        .sort({ createdAt: -1 })
        .limit(5);
};


// search poems and users
// search poems and users
const searchPoems = async (query) => {
    const poems = await Poetry.find({
        title: { $regex: `^${query}`, $options: 'i' },
        isVisible: true,
    })
    .limit(3) // Limit results for performance
    .select('_id title'); // Only return _id and title fields

    const users = await User.find({
        name: { $regex: `^${query}`, $options: 'i' }
    })
    .limit(3) // Limit results for performance
    .select('_id name'); // Only return _id and name fields

    const poets = await Poet.find({
        name: { $regex: `^${query}`, $options: 'i' }
    })
    .limit(3) // Limit results for performance
    .select('_id name'); // Only return _id and name fields

    // Combine results and include the type field
    const results = [
        ...poems.map(poem => ({ _id: poem._id, title: poem.title, type: 'poem' })),
        ...users.map(user => ({ _id: user._id, title: user.name, type: 'user' })),
        ...poets.map(poet => ({ _id: poet._id, title: poet.name, type: 'poet' }))
    ];

    return results;
};

const getDatabaseInfo = async () => {
    const stats = await Poetry.countDocuments();
    return stats;
};

module.exports = {
    registerPoetry,
    deletePoetry,
    getPoetries,
    getPoetry,
    updatePoetry,
    getLatestPoetries,
    getLatestEssays,
    getVisiblePoetries,
    searchPoems,
    getDatabaseInfo,
}