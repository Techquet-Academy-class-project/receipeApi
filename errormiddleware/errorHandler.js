module.exports.errorHandlerMidddleware = (err,req,res,next)=>{
    console.log(err)
    if(err.name == 'JsonWebTokenError'){
        return res.json({data : null , success : false , message : "invalid token, please log back in"})
    }
    return res.status(500).json({msg:"Something went wrong"})
}