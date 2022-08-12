const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    isProfile: {
        type: String,
        required: true,
        default: false
    },
    profileImage: {
        type: String,

    }


}, {
    timestamps:true
})

module.exports=mongoose.model('user',UserSchema)