const MESSAGE_MODEL = require('../Models/messageSchema')

exports.Add_Message = async (req, res) => {
    try {
        const {
            from,
            to,
            message
        } = req.body
        const create_message = await MESSAGE_MODEL.create({
            message: {
                text: message
            },
            senderId: from,
            users: [from, to]
        })

        if (create_message) return res.status(200).json({
            message: "created Succesfully",
            result:create_message
        })
        else return res.status(400).json({
            message: "Not Created"
        })
    } catch (error) {
        console.log(error);
    }
}

exports.Find_Chats = async (req, res) => {
    try {
        const {
            from,
            to
        } = req.params
        console.log(req.body);
        const chats = await MESSAGE_MODEL.find({
            users: {
                $all: [from, to]
            }
        }).sort({updatedAt:1})
        const messages=await chats.map((chat)=>{
            return{
                currentMessage:chat.senderId.toString() == from,
                message:chat.message.text
            }
        })

        if(chats) return res.status(200).json({message:"success",messages})
        else return res.status(400).json({messages:[]})
    } catch (error) {
        console.log(error);
    }
}