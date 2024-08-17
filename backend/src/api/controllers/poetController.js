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
        console.log("Fetching all poets");
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
module.exports = {
    registerPoet,
    registerPoem,
    getPoet,
    getAllPoets,
    getLastPoets,
    getDatabaseInfo
}