const authService = require('../services/authService');
const { attachCookiesToResponse } = require('../utils/jwt');
const createTokenUser = require('../utils/createTokenUser');

signup_get = async (req, res) => {
    try {
        const signup_get = await authService.signup_get(req.body);
        res.status(201).json("signup_get");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

login_get = async (req, res) => {
    try {
        const login_get = await authService.login_get(req.body);
        res.status(201).json("login_get");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

signup_post = async (req, res) => {
    try {
        const signup_post = await authService.signup_post(req.body);
        const tokenUser = createTokenUser(signup_post);
        const token = attachCookiesToResponse({ res, user: tokenUser });
        res.status(201).json({ tokenUser, token });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

login_post = async (req, res) => {
    try {
        const login_post = await authService.login_post(req.body);
        const tokenUser = createTokenUser(login_post);
        const token = attachCookiesToResponse({ res, user: tokenUser });
        res.status(201).json({tokenUser, token});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

logout = async (req, res) => {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    res.status(201).json({ msg: 'user logged out!' });
  };





  module.exports = {
    signup_get,
    login_get,
    signup_post ,
    login_post,
    logout,
}
