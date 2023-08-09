module.exports.errorHandlerMidddleware = (err,req,res,next)=>{
    console.log(err)
    if(err.name == 'JsonWebTokenError'){
        return res.json({data : null , success : false , message : "invalid token, please log back in"})
    }
    if (err.name === "ValidationError")
    return res.status(400).json({ error: err.message })
    if (err.code === 11000)
    return res.status(400).json({ msg: "email already exists" })
    return res.status(500).json({msg:"Something went wrong"})
}