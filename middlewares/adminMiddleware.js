const jwt = require('jsonwebtoken')

const adminMiddleware = (req,res,next)=>{
    console.log("inside adminMiddleware");
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    
    // verify token
    if(token){
        try{
            const jwtResponse = jwt.verify(token,process.env.JSWSECRET)
            console.log(jwtResponse);
            req.payload = jwtResponse.userMail
            req.role = jwtResponse.role
            if(jwtResponse.role =="admin"){
                next()
            }else{
                res.status(401).json("Authorisation failed!! invalid user...")
            }
        }catch(error){
            res.status(401).json("Authorisation failed!! invalid token...")
        }
    }else{
        res.status(401).json("Authorisation failed!! Token missing...")
    }
}

module.exports = adminMiddleware