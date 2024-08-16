const yup = require('yup')

const userSchema = yup.object({
    email: yup.string().email().required("Geçerli bir mail adresi kullanın!"),
    password: yup.string().min(6, 'Şifre en az 6 haneli olmalı!')
    .matches(/[a-zA-Z]/, 'Şifre en az bir harf içermeli.')
    .matches(/[0-9]/, 'Şifre en az bir rakam içermeli.')
    .required('Şifre girmeniz gerekli.')
})


module.exports = userSchema