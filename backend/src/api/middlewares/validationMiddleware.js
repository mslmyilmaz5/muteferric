const validation = (schema) => async (req, res,next) => {

    const body = req.body;
    try {
        await schema.validate(body);
        return next();
    } catch(error){
        res.status(500).json({
            error : error.errors // Send detailed validation errors to the client
        });
    }
}

module.exports = validation