const books = require('../models/bookModel')

// add books
exports.addBookController = async (req,res)=>{
    console.log("Inside controller");
    // get book details from req body
    console.log(req.body);
    
    // const {title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,uploadImages} = req.body
    // console.log(title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,uploadImages);
    // res.status(200).json("add book request received")
    
}