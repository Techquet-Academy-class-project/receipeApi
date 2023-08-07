require("dotenv").config()
const bcrypt = require("bcryptjs")
const {Users,Recipe} = require('../model/schema')
const jwt = require("jsonwebtoken")

module.exports.createNewRecipe = async(req,res)=>{
    req.user._id = req.body.createdBy
    
     const recipe = await Recipe.create({...req.body,userId:req.user._id})
     if(recipe)  
     await Users.updateOne({_id:req.user._id},{$push: {recipes:recipe}})
     res.status(200).json({message : "successfully created", success : true, recipe})
 }

 module.exports.mymeals = async(req,res)=>{
    users = await Users.findById({_id:req.user._id}).select("recipes -_id").populate("recipes")
res.status(200).json({message:users})
}

module.exports.deleteId = async(req,res)=>{
    const recipe = await Recipe.findOneAndDelete({_id:req.params.id, createdBy:req.user._id})
    if(!recipe){
        return res.status(404).json({message:"You cannot delete this recipe"})
    }
    res.status(200).json({message : "successfully deleted"})

}

module.exports.editId = async (req,res)=>{
    const {title, ...others} = req.body
    const recipe = await Recipe.updateOne({_id:req.params.id, createdBy:req.user._id}, {...others})
    if(!recipe){
        return res.status(404).json({message:"You cannot edit this recipe"})
    }
    if(title){
        res.status(200).json({message : "You cannot edit title"})  
    }
    res.status(200).json({message : "successfully updated"})
   
}

module.exports.getProfile = async(req,res)=>{
    //    const NumberofMeals = req.user.recipes.count()
        const user = await Users.find({_id:req.user._id}).select("recipes -_id")
        return res.status(200).json(user)
    }

module.exports.editProfile = async(req,res)=>{
    const {_id,password, createdAt, role, ...others} = req.body
    const user = await Users.updateOne({_id:req.user._id}, {...others})
    if(password || createdAt || updatedAt || _id){
        res.status(401).json({message:"You cannot edit password or createdAt or updatedAt or id"})
    }
    return res.status(200).json({message:"Successfully Updated"})
}

module.exports.changePassword = async(req,res)=>{
    const {password, ...others} = req.body
    if(password<6){
        res.status(401).json({message:"Password must be greater than 5"})
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const user = await Users.updateOne({_id:req.user._id},{password:hashedPassword})
    return res.cookie("authorization", "", { maxAge: 1 }).status(200).json({message:"Password changed suucessfully"})
}

