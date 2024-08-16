const poetryService = require('../services/poetryService')


// create poetry
registerPoetry = async (req, res) => {
    try {
        const user_id = req.user._id
        console.log("This is create!")
        const poetry = await poetryService.registerPoetry(req.body,user_id);
        res.status(201).json(poetry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete poetry
deletePoetry = async (req, res) => {
      const { id } = req.params;
      const poem = await poetryService.deletePoetry(id)
      res.status(201).json(poem)
}

// get user all poetries
getPoetries = async (req,res) => {
   
    const user_id = req.query.user_id;
    const poems = await poetryService.getPoetries(user_id)
    res.status(200).json(poems);
}

// get user visible poetries
getVisiblePoetries = async (req,res) => 
{
   const user_id = req.query.user_id;
   const poems = await poetryService.getVisiblePoetries(user_id)
   res.status(200).json(poems);

}

// get single poetry
getPoetry = async (req, res) => {

    try {
        
        const poem_id = req.params.id;
        const poem = await poetryService.getPoetry(poem_id);
        
        if (!poem) {
            return res.status(404).json({error: 'No such poem'});
        }

        res.status(200).json(poem);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


// update poetry
updatePoetry = async (req,res) => {
    try {
        const { id } = req.params;
        const poem = await poetryService.updatePoetry(req.body,id);
        console.log("This is update!")
        res.status(201).json(poem);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
    
}

// get last poems
getLatestPoetries = async (req,res) => {
    try {
      const three_poems = await poetryService.getLatestPoetries();
      res.status(200).json(three_poems);
    } catch(error){
      res.status(500).json({error: error.message});
    }
}

getLatestEssays = async (req,res) => {
    try {
      const three_poems = await poetryService.getLatestEssays();
      res.status(200).json(three_poems);
    } catch(error){
      res.status(500).json({error: error.message});
    }
}

searchPoems = async (req,res) => {
    try {
      const query = req.query.q
      const results = await poetryService.searchPoems(query);
      res.status(200).json(results);
    } catch(error){
      res.status(500).json({error: error.message});
    }
}

getDatabaseInfo = async (req,res) => {
    try {
        const results = await poetryService.getDatabaseInfo();
        res.status(200).json(results);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    registerPoetry,
    deletePoetry,
    getPoetries,
    getPoetry,
    updatePoetry,
    getLatestPoetries,
    getVisiblePoetries,
    searchPoems,
    getDatabaseInfo,
    getLatestEssays
}
