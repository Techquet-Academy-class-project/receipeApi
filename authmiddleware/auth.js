require("dotenv").config()
const jwt = require("jsonwebtoken")
const {Users,Recipe} = require('../model/schema')



const authMiddleware = async(req,res,next)=>{

    const refreshtoken = req.cookies.authorization
    

if (!refreshtoken){
    return res.status(403).json({message : "Authentication failed, please log in", success : true, data : null})
}
const payload = jwt.verify(refreshtoken, process.env.JWT_TOKEN)

console.log(payload.iat * 1000)
    if(!payload){
        return res.status(401).json({msg:"Not authorized to access this route"})
    } 
    const user = await Users.findById({_id:payload.userId}).populate("recipes")
    
    if(!user) return res.json({data: user, message : "No user found", success : false})

    console.log(user.updatedAt.getTime())
    if (user.updatedAt.getTime() < payload.iat * 1000){   
      return  res.status(401).json({msg: "You are not authorized to access this profile"}) 
    }

    if(!user) return res.json({data: user, message : "No user found", success : false})
    req.user = user
    console.log(req.user)
  
    next()

   
}


module.exports= authMiddleware