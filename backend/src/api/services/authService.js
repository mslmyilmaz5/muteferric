const User = require("../models/user")
const mongoose = require('mongoose');

const signup_get = async(sign_get_data) => {
   console.log("signup_get")
}

const login_get = async(login_get_data) => {
    console.log("login_get")
}

const signup_post = async(sign_up_data) => {
    const {name,mahlas,email,password} = sign_up_data;
    if (!name) throw Error("Herkesin bir ismi vardır elbet. Merak etme kaydolduktan sonra istemezsen görünmez :)")
    if (!email) throw Error("Kayıt olabilmen için email gerekli.");
    if (!password) throw Error("Şifresiz hesap olmaz sanırsam")
    const check_user = await User.findOne({email})
    if (check_user) throw Error("Daha önce bu email adresiyle kayıt olunmuş.")  
    const user = await User.create(sign_up_data)
    return user;
}

const login_post = async(login_post_data) => {
    const {email, password} = login_post_data;
    if (!email || !password) throw Error("Lütfen şifrenizi ve mail adresinizi giriniz.")
    const user = await User.findOne({email})  
    if (!user) throw Error("Kayıtlı olmayan mail adresi!")
    const isPasswordCorrect =  await user.comparePassword(password);
    if (!isPasswordCorrect) throw Error("Yanlış şifre!")
    return user;
     
}



module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post,
    
}