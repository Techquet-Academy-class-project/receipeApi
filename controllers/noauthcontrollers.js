require("dotenv").config()
const {Users,Recipe} = require('../model/schema')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports.getRecipe = async(req,res)=>{
    const recipe = await Recipe.find()
    return res.status(200).json({data:recipe,success:true})
}

module.exports.getArecipe = async(req,res)=>{
    const recipe = await Recipe.findOne({_id:req.params.id}).populate("createdBy","-password")
    return res.status(200).json(recipe)
}

module.exports.getAuser = async (req,res)=>{
    const user = await Users.findOne({_id:req.params.id},"-password -_id -name").populate("recipes")
    return res.status(200).json({data:user, success:true})
}

module.exports.signup = async(req,res)=>{
    const user = await Users.create({...req.body})
    const token = jwt.sign({userId:user._id}, process.env.JWT_TOKEN)
    res.cookie('authorization', token,{httpOnly:true, secure:true,sameSite:'None', maxAge: 30*24*60*60*1000})
    return res.status(200).json({message:"Created successfully"})
}

module.exports.login = async(req,res)=>{
    const {username,password} = req.body
    const user = await Users.findOne({username})
    if(!user){
        return res.status(404).json({message : "No user found", success : false})
    }
    if(await bcrypt.compare(password,user.password)){
    const token = jwt.sign({userId:user._id}, process.env.JWT_TOKEN)
    res.cookie('authorization', token,{httpOnly:true, secure:true,sameSite:'None', maxAge: 30*24*60*60*1000})
    console.log(user.updatedAt)
    return res.status(200).json({message :"succesfully logged in", success: true})

    }
    return res.status(404).json({data : null, message : "Invalid password", success : false})
}

module.exports.logout = async(req,res)=>{
    return res.cookie("authorization", "", { maxAge: 1 }).status(200).json({message:"Successfully logged out"})
}