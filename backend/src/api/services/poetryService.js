const Poetry = require('../models/poetry');


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
        .sort({ createdAt: -1 })
        .limit(5);
};

// for home page essays
const getLatestEssays = async() => {
    return await Poetry.find(
        {isVisible:true, type:"e"})
        .sort({ createdAt: -1 })
        .limit(5);
};


// search poems
const searchPoems = async (query) => {
    return await Poetry.find({
        title: { $regex: `^${query}`, $options: 'i' }, 
        isVisible: true,
    })
    .limit(10) // Limit results for performance
    .select('userId title'); // Only return title and _id fields
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