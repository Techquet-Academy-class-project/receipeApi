require("dotenv").config()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require("fs/promises")
const uuid = require("uuid")

module.exports.getRecipe = async(req,res)=>{
    const recipe = await fs.readFile('./db/recipe.json', 'utf-8')
    const recipes = JSON.parse(recipe)
    res.status(200).json(recipes)
}

module.exports.getRecipeId = async(req,res)=>{
    const recipe = await fs.readFile('./db/recipe.json', 'utf-8')
    const recipeId = JSON.parse(recipe)
    const recipee = recipeId.find(value=>{
        if(value._id === req.params.id){
            return value
        }
    })
    res.status(200).json(recipee)
}

module.exports.getUserId = async(req,res)=>{
    const user = JSON.parse(await fs.readFile('./db/user.json', 'utf-8'))
    const recipee = JSON.parse(await fs.readFile('./db/recipe.json', 'utf-8'))
   const userObj = user.find(value=>{
    if(value._id===req.params.id){
        return value
    }
   })
   const recipe = recipee.filter(value=>{
    if(value.createdBy===userObj._id){
       return {title:value.title,_id:value._id,tribe:value.tribe, ingredients:value.ingredients}
    }
   })
   const z = {email:userObj.email, username:userObj.name,recipe}
      res.status(200).json(z)
}

module.exports.signup = async(req,res)=>{
    const {username,password, name, email,createdOn} = req.body
    if(!username || !password || !name || !email){
      return res.status(404).json("All fields are required")
    } 
    if(!createdOn || !updatedOn){
      req.body.createdOn = new Date()
      req.body.updatedOn = new Date()
    } 
    const user = await fs.readFile('./db/user.json', 'utf-8')
    const userObj = JSON.parse(user)
    const check = userObj.find(value=>value.email===req.body.email)
      if (check) return res.status(404).json({msg:"email already exists"})
    if(password)
    hashedPassword = await bcrypt.hash(password,10)
    let _id=uuid.v4()
    
    userObj.push({_id:_id,...req.body,password:hashedPassword,recipes:[]})
    const token = jwt.sign({userId:_id}, process.env.JWT_TOKEN,{expiresIn:'7d'})

    await fs.writeFile('./db/user.json', JSON.stringify(userObj))
    res.cookie('access_token', token,{httpOnly:true, secure:true,sameSite:'None', maxAge: 30*24*60*60*1000})
    return res.status(200).json({message:"Created successfully"})
  }

  module.exports.login = async(req,res)=>{
    const user = await fs.readFile('./db/user.json', 'utf-8')
    const userObj = JSON.parse(user)
    const  {username, password} = req.body

    const check = userObj.find(value=>{
        if(value.username===username)
        return value
        })
        console.log(check)
        if(await bcrypt.compare(password,check.password)){
          const token = jwt.sign({userId:check._id}, process.env.JWT_TOKEN,{expiresIn:'7d'})

         res.cookie('access_token', token,{httpOnly:true, secure:true,sameSite:'None', maxAge: 30*24*60*60*1000})
         return res.status(200).json({message :"succesfully logged in", success: true})
        }
        res.status(404).json({message:"Incorrect username or password"}) 
}