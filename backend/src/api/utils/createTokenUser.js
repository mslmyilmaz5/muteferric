const createTokenUser = (user) => {
    return { userId: user._id, mahlas: user.mahlas, name: user.name, 
        email: user.email, about_one: user.about_one, 
        userType: user.user_type, createdAt: user.createdAt};
};

module.exports = createTokenUser;