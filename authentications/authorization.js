require("dotenv").config()
const jwt = require("jsonwebtoken")
const fs = require("fs/promises")




const authMiddleware = async(req,res,next)=>{
    const user = JSON.parse(await fs.readFile('./db/user.json', 'utf-8'))

    const refreshtoken = req.cookies.access_token
    

if (!refreshtoken){
    res.status(403).json({message : "Authentication failed, please log in", success : true, data : null})
}
const payload = jwt.verify(refreshtoken, process.env.JWT_TOKEN)

// console.log(payload.iat*1000)
    if(!payload){
        return res.status(401).json({msg:"Not authorized to access this route"})
    } 
    const users = await user.find(value=>value._id==payload.userId)
    
    if(!users) return res.json({data: users, message : "No user found", success : false})

    // console.log(Date.now(users.updatedOn))
    if (Date.now(users.updatedOn) < payload.iat * 1000){   
      return  res.status(401).json({msg: "You are not authorized to access this profile"}) 
    }

    if(!user) return res.json({data: users, message : "No user found", success : false})
    req.user = users
    // console.log(req.user)
  
    next()

   
}


module.exports= authMiddleware