const yup = require('yup')

const poetrySchema = yup.object({
    title: yup.string().required("Başlıksız şiir olmaz"),
    poetry: yup.string().required("İçeriksiz şiir hiç olmaz"),
    isVisible: yup.boolean().default(false),
})


module.exports = poetrySchema