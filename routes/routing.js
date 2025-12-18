// import express
const express = require('express')
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

// create router object
const router = new express.Router()

//  define path for client api request
// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)
// google login
router.post('/google/sign-in',userController.googleLoginController)
// get home books
router.get('/books/home',bookController.getHomePageBooksController)

// --------------------authorised user---------------------------
// add book request body content is form data
router.post('/user/book/add',jwtMiddleware,multerMiddleware.array('uploadImages',3),bookController.addBookController)
// get all books page
router.get('/books/all',jwtMiddleware,bookController.getUserAllBookPageController)
// get all user upload books page
router.get('/user-books/all',jwtMiddleware,bookController.getUserUploadProfilePageController)
// get all book purchase
router.get('/user-buy/all',jwtMiddleware,bookController.getUserBoughtBookProfilePageController)

module.exports = router