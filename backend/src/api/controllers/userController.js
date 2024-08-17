const userService = require('../services/userService');


getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

getUserAbouts = async (req, res) => {
    try {
        const user_abouts = await userService.getUserAbouts(req.params);
        res.status(200).json(user_abouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// update about_one
updateAboutOne = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await userService.updateAboutOne(req.body,id);
        console.log("This is update!")
        res.status(201).json(user);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
    
}

// update about_two
updateAboutTwo = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await userService.updateAboutTwo(req.body,id);
        console.log("This is update!")
        res.status(201).json(user);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
    
}


getLastUsers = async (req, res) => {
    try {
        const last_users = await userService.getLastUsers();
        res.status(200).json(last_users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

getDatabaseInfo = async (req,res) => {
    try {
        const results = await userService.getDatabaseInfo();
        res.status(200).json(results);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}


module.exports = {
    getUser,
    getUserAbouts,
    updateAboutOne,
    updateAboutTwo,
    getLastUsers,
    getDatabaseInfo
};