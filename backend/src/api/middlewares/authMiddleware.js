const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        console.log('No authorization header');
        return res.status(401).json({ error: 'Authorization token required!' });
    }

    const token = authorization.split(' ')[1];
    //console.log('Token:', token);

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        //console.log('Decoded _id:', userId);
        
        req.user = await User.findOne({ _id: userId }).select('_id');
        //console.log('User found:', req.user);

        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }

        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ error: 'Request is not authorized.' });
    }
};

module.exports = requireAuth;