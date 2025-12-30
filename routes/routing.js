// import express
const express = require('express')
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

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
// get one book view
router.get('/book/:id/view',jwtMiddleware,bookController.viewBookController)
// User Edit - 
router.put('/user/:id/edit',jwtMiddleware,multerMiddleware.single('picture'),userController.updateUserProfileController)
// delete book
router.delete('/books/:id',jwtMiddleware,bookController.deleteBookController)

// -------------------------authorized admin---------------------------

// get all books by admin
router.get('/admin-books/all',adminMiddleware,bookController.getAllBooksController)
// get all login users by admin
router.get('/admin-users/all',adminMiddleware,userController.getAllUsersController)
// update book status
router.put('/books/:id/update',adminMiddleware,bookController.updateBookStatusController)

module.exports = router