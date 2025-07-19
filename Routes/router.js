// import controllers 
const userController = require('../Controllers/userController')
const upload = require('../middleware/upload');
const verifyToken=require('../middleware/auth')




// 1 import express
const express = require('express');

//2  create an obj for class router n express
const router = new express.Router()


router.post('/user/register/team', upload.single('logo'), userController.registerUser)


router.post('/user/register/asso', userController.registerAsso)

router.post('/user/register/admin', userController.registerAdmin)

router.post('/user/login',userController.loginUser);



// 4 export router
module.exports = router;

