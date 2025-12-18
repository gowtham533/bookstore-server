const books = require('../models/bookModel')

// add books
exports.addBookController = async (req,res)=>{
    console.log("Inside controller");
    // get book details from req body, uploads file from request file & seller mail from req payload
    const {title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category} = req.body
    const uploadImages = req.files.map(item=>item.filename)
    const sellerMail = req.payload
    console.log(title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,uploadImages,sellerMail);

    
    try{
        //  check book already exist
        const existingBook = await books.findOne({title,sellerMail})
        if(existingBook){
            res.status(401).json("uploaded book is already exist...Request failed")
        }else{
            const newBook = await books.create({
                title,author,pages,price,discountPrice,imageURL,abstract,language,publisher,isbn,category,uploadImages,sellerMail
            })
            res.status(200).json(newBook)
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

// get home books
exports.getHomePageBooksController = async (req,res)=>{
    console.log("inside getHomePageBooksController");
    try{
        // get newly added 4 books from db
        const homeBook = await books.find().sort({_id:1}).limit(4)
        res.status(200).json(homeBook)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//get all book - user
exports.getUserAllBookPageController = async (req,res)=>{
    console.log("inside getUserAllBookPageController");
    // get query from req
    const searchKey = req.query.search
    console.log(searchKey);
    
    // get login user mail from token
    const loginUserMail = req.payload
    try{
        // get all books from db except logged in user
        const allBooks = await books.find({sellerMail:{$ne:loginUserMail},title:{$regex:searchKey,$options:'i'}})
        res.status(200).json(allBooks)
    }catch(error){
        console.log(Error);
        res.status(500).json(error)
    }
    
}

//get all user upload books
exports.getUserUploadProfilePageController = async (req,res)=>{
    console.log("inside getUserUploadProfilePageController");
    // get login user mail from token
    const loginUserMail = req.payload
    try{
        // get all books from db except logged in user
        const allUserBooks = await books.find({sellerMail:{$ne:loginUserMail}})
        res.status(200).json(allUserBooks)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
    
}
// get all users bought books
exports.getUserBoughtBookProfilePageController = async (req,res)=>{
    console.log("inside getUserBoughtBookProfilePageController");
    // get login user mail from token
    const loginUserMail = req.payload
    try{
        // get all books from db except logged in user
        const allUserPurchaseBooks = await books.find({buyerMail:loginUserMail})
        res.status(200).json(allUserPurchaseBooks)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
    
}