// import express
const express = require('express')
const userController = require('../controllers/userController')

// create router object
const router = new express.Router()

//  define path for client api request
// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)


module.exports = router