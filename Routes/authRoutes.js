var express=require('express')
var router=express.Router()
const {Auth_Register,Auth_Login, AvatarSetUp}=require('../collection/auth')


router.post('/register',Auth_Register)
router.post('/login',Auth_Login)
router.put('/set-avatar/:id',AvatarSetUp)

module.exports=router


