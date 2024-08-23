const Muteferric = require("../models/muteferric")
const Image = require("../models/image")

const getGeneralInfo = async () => {
    return await Muteferric.findOne();
}


const updateHomeText = async (data) => {
   
    console.log(data)
    const {updated_text} = data;
    const text = await Muteferric.findOneAndUpdate(
        { _id: '66c8809e6fafd3fa5ad93d1a' },
        { today_home_text: updated_text },
        { new: true }
    );
    
    return text;
};

const uploadImage = async (data) => {
    const { userId, base64 } = data;
    
    const updatedImage = await Image.findOneAndUpdate(
        { userId: userId }, 
        { image: base64 }, 
        { new: true, upsert: true } 
    );

    return updatedImage;
};

const getImage = async (userId) => {
 
    return Image.findOne({userId: userId.id})
}
module.exports = {
    getGeneralInfo,
    updateHomeText,
    uploadImage,
    getImage
};