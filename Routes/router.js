// import controllers 
const userController = require('../Controllers/userController')

// 1 import express
const express = require('express');

//2  create an obj for class router n express
const router = new express.Router()

// 3 path define
// 3.1  user reg
        router.post('/user/team/register',userController.registerUser)
//    3.2 user login
        router.post('/user/team/login',userController.loginUser)

         router.post('/user/asso/register',userController.registerAsso)

         router.post('/user/admin/register',userController.registerAdmin)

// 4 export router
module.exports = router;

