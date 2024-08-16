const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createJWT = ({payload}) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: maxAge,
   });
    return token;
}

const attachCookiesToResponse = ({res, user}) => {
    const token = createJWT({payload: user});
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token',token,{
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: true,
        sameSite: "none", // Allow the cookie to be sent in cross-site requests
        //signed: true,
       
    })
    return token;


}

module.exports = {
    createJWT,
    attachCookiesToResponse
}
