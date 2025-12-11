const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwtMiddleware");
    // login to verify token
    // get toke - req headers
    const token = req.headers["authorization"].split(" ")[1]
    // console.log(token);
    // verify token
    if(token){
        try{
        const jwtResponse = jwt.verify(token,process.env.JSWSECRET)
        console.log(jwtResponse);
        req.payload = jwtResponse.userMail
        next()
    
        }catch(error){
            res.status(401).json("Authorisation failed!! Invalid Token")
        }
        }else{
            res.status(401).json("Authorisation failed!! Token missing")
        } 
}

module.exports = jwtMiddleware