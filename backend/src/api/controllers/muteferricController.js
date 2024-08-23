const muteferricService = require('../services/muteferricService');

getGeneralInfo = async (req, res) => {
    try {

        const info = await muteferricService.getGeneralInfo();
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

updateHomeText = async (req, res) => {
    try {
        
        const text = await muteferricService.updateHomeText(req.body);
        res.status(200).json(text);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

uploadImage = async (req,res) => {

    try {
        
        const image = await muteferricService.uploadImage(req.body);
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

getImage = async (req, res) => {
    try {

        const image = await muteferricService.getImage(req.params);
        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    getGeneralInfo,
    updateHomeText,
    uploadImage,
    getImage
}