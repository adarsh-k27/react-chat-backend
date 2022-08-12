const USERMODEL = require('../Models/userSchema')
const bcrypt = require('bcrypt')
exports.Auth_Register = async (req, res) => {
    try {
        const {
            password,
            userName,
            email
        } = req.body
        const AlreadyRegister = await USERMODEL.findOne({
            email: req.body.email
        })
        if (AlreadyRegister) {
            return res.status(400).json({
                message: "User Is Already Exist "
            })
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            console.log(hashPassword);
            req.body.hashPassword = hashPassword
            const create = await USERMODEL.create(req.body)
            if (create) {
                return res.status(200).json({
                    message: "User Created",
                    user: {
                        email,
                        userName,
                        hashPassword,
                        _id:create._id
                    }
                })
            } else return res.status(400).json({
                message: "user is Not Registered "
            })
        }


    } catch (error) {
        console.log(error);
    }
}

exports.Auth_Login = async (req, res) => {
    try {
        const {
            password,
            userName
        } = req.body
        const AlreadyREgistered = await USERMODEL.findOne({
            email: userName
        })
        if (AlreadyREgistered) {
            if (await bcrypt.compare(password, AlreadyREgistered.hashPassword)) {
                return res.status(200).json({
                    message: "LoginSuccesFully",
                    data:{AlreadyREgistered}
                })
            } else {
                return res.status(400).json({
                    message: "Password Is Wrong"
                })
            }
        } else {
            return res.status(400), json({
                messahe: "User Is Not Registered"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.AvatarSetUp = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const {
            profileImage
        } = req.body
        const isUserValid = await USERMODEL.findById(id)
        if (isUserValid) {
            const update = await isUserValid.update({
                isProfile: true,
                profileImage
            })
            if (update) return res.status(200).json({
                message: "update succesfully"
            })
            else return res.status(400).json({
                message: "updation error"
            })
        } else return res.status(400).json({
            message: "user is not Valid"
        })
    } catch (error) {
        console.log(error);
    }
}