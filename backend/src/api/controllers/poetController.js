const poetService = require('../services/poetService');

registerPoet = async (req, res) => {
    try {
        const register_poet = await poetService.registerPoet(req.body);
        res.status(201).json(register_poet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

registerPoem = async (req, res) => {
    try {
        const register_poem = await poetService.registerPoem(req.body);
        res.status(201).json(register_poem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


getPoet = async (req, res) => {
    try {
        const user = await poetService.getPoet(req.params);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

getAllPoets = async (req, res) => {
    try {
        const poets = await poetService.getAllPoets();
        console.log("Fetched poets:", poets); // Log the poets
        res.status(200).json(poets);
    } catch (error) {
        console.error('Error in getAllPoets:', error.message);
        res.status(500).json({ error: error.message });
    }
};


getLastPoets = async (req,res) => {
    try {
      const last_poets = await poetService.getLastPoets();
      res.status(200).json(last_poets);
    } catch(error){
      res.status(500).json({error: error.message});
    }
}

getDatabaseInfo = async (req,res) => {
    try {
        const results = await poetService.getDatabaseInfo();
        res.status(200).json(results);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

// update about_one
updateAboutOne = async (req,res) => {
    try {
        console.log("xx")
        const { id } = req.params;
        const user = await poetService.updateAboutOne(req.body,id);
        console.log("This is update!")
        res.status(201).json(user);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
    
}

module.exports = {
    registerPoet,
    registerPoem,
    getPoet,
    getAllPoets,
    getLastPoets,
    getDatabaseInfo,
    updateAboutOne
}