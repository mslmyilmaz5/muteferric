const createTokenUser = (user) => {
    return { userId: user._id, mahlas: user.mahlas, name: user.name, 
        email: user.email, about_one: user.about_one, 
        about_two: user.about_two, userType: user.user_type};
};

module.exports = createTokenUser;