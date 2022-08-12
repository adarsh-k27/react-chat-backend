const mongoose=require('mongoose')

const MessageSchema=mongoose.Schema({
    message:{
        text:{
            type:String
        },
    },
    users:Array,
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

module.exports=mongoose.model('message',MessageSchema)