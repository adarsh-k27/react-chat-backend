const USERMODEL = require('../Models/userSchema')

exports.GetAllUser = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const allUsers = await USERMODEL.find({
            _id: {
                $ne: id
            }
        }).select(["email","userName","profileImage","_id"])
        if(allUsers){
            return res.status(200).json(allUsers)
        }
        else return res.status(400).json({message:"error"})
    } catch (error) {
        console.log(error);
    }
}