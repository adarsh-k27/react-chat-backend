const express=require('express')
const router=express.Router()
const {Add_Message,Find_Chats}=require('../collection/message')
router.post('/add-message',Add_Message)
router.get('/find/message/:from/:to',Find_Chats)


module.exports=router