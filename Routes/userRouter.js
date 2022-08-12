const express=require('express')
const { GetAllUser } = require('../collection/user')
const router=express.Router()

router.get('/get-all-user/:id',GetAllUser)

module.exports=router