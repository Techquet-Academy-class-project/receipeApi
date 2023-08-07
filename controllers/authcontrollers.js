const fs = require("fs/promises")
const uuid = require("uuid")
const bcrypt = require("bcryptjs")

module.exports.createNewRecipe = async(req,res)=>{
    const recipee = JSON.parse(await fs.readFile('./db/recipe.json', 'utf-8'))
    const user = JSON.parse(await fs.readFile('./db/user.json', 'utf-8'))
    const check = user.find(value=> req.user._id === req.body.createdBy)
    if(!check){
        res.status(404).json({message:"You can't post"})
    }
    const {title,ingredients,tribe,process,createdBy,postedOn} = req.body
    if (!createdBy){
       return res.status(404).json({message:"Please provide your id"})
    }
    
    if(!postedOn){
       req.body.postedOn = new Date()
    }
    if (!title || !tribe || !process || !createdBy){
        res.status(404).json({message:"Every user should fill the fields"})
    }
    res.status(200).json({message: 'recipee created successfully'})
    recipee.push({_id:uuid.v4(),...req.body,ingredients,process})
    
    const c = user.map(value=>{   
        if(value._id===req.user._id){
          return value.recipes.push({_id:uuid.v4()})
        }
    })
        await fs.writeFile('./db/user.json', JSON.stringify(user))
        await fs.writeFile('./db/recipe.json', JSON.stringify(recipee))
    
    }

    module.exports.mymeals = async(req,res)=>{
        const user = JSON.parse(await fs.readFile('./db/user.json', 'utf-8'))
        const recipee = JSON.parse(await fs.readFile('./db/recipe.json', 'utf-8'))
        const recipe = recipee.filter(value=>{
        if(value.createdBy === req.user._id)
        return value
    })
    res.status(200).json(recipe) 
    if(!recipe){
        res.status(404).json({message:"You have no recipe"})
    }
    }

    module.exports.deleteRecipeId = async(req,res)=>{
        const user = JSON.parse(await fs.readFile('./db/user.json', 'utf-8'))
        const recipee = JSON.parse(await fs.readFile('./db/recipe.json', 'utf-8'))
        const check = recipee.find(value=>{
            if(value.createdBy === req.user._id && value._id===req.params.id ){
                return value
            } 
            })
    console.log(check)
    if(check){
    const c = recipee.indexOf(check)
         console.log(c)
    recipee.splice(c,1)
    await fs.writeFile('./db/recipe.json', JSON.stringify(recipee))
    return res.status(200).json({message:"Successfully deleted"})
    }
    return res.status(404).json({message:"You cannot delete this recipe"})
    }

    module.exports.editRecipeId = async(req,res)=>{
        const users = JSON.parse(await fs.readFile('./db/user.json', 'utf-8'))
        const recipee = JSON.parse(await fs.readFile('./db/recipe.json', 'utf-8'))
        const {title,createdBy, ...others} = req.body
        if(title){
           return res.status(200).json({message : "You cannot edit title"})  
        }
        if (!createdBy){
           return res.status(404).json({message:"Please provide your id"})
        }
        const check = recipee.find(value=>{
            if(value.createdBy === req.user._id && value._id===req.params.id ){
                return value
            } 
            })
    console.log(check)
    if(check){
    const c = recipee.indexOf(check)
         console.log(c)
    recipee.splice(c,1,{_id:check._id,title:check.title,createdBy,...others})
    await fs.writeFile('./db/recipe.json', JSON.stringify(recipee))
    return res.status(200).json({message:"Successfully updated"})
    }
    return res.status(404).json({message:"You cannot update this recipe"})
    }

    module.exports.getUsersProfile = async(req,res)=>{
        const users = JSON.parse(await fs.readFile('./db/user.json', 'utf-8'))
        const check = users.find(value=>{
            if(value._id === req.user._id){
                return value
            } 
            })
            console.log(check)
        const NumberofMeals = check.recipes.length 
        const {recipes,...others} = check
        if(check){
           return res.status(200).json({...others,NumberofMeals:NumberofMeals})
        } 
        return res.status(404).json("Invalid")
        }

        module.exports.editUsersProfile = async(req,res)=>{
            const users = JSON.parse(await fs.readFile('./db/user.json', 'utf-8'))
            const {password,createdOn,recipes, ...others} = req.body
            if(password || createdOn){
                res.status(200).json({message : "You cannot edit password or createdOn"})  
            }
            const check = users.find(value=>{
                if(value._id === req.user._id){
                    return value
                } 
                })
        console.log(check)
        if(check){
        const c = users.indexOf(check)
             console.log(c)
                let updatedOn =new Date()
              
        users.splice(c,1,{_id:check._id,password:check.password,createdOn:check.createdOn,recipes:check.recipes,updatedOn:updatedOn,...others})
        await fs.writeFile('./db/user.json', JSON.stringify(users))
        return res.status(200).json({message:"Successfully updated"})
        }
        return res.status(404).json({message:"You cannot update this profile"})
        }

        module.exports.changePassword = async(req,res)=>{
            const users = JSON.parse(await fs.readFile('./db/user.json', 'utf-8'))
        if(req.body.password.length<6){
            return res.status(401).json({message:"Password must be greater than 5"})
        }
        if(req.body.password>6){
        const check = users.find(value=>{
            if(value._id === req.user._id){
                return value
            } 
            })
    console.log(check)
    
        if(check){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        let c = users.indexOf(check)
        users[c].password = hashedPassword
     await fs.writeFile('./db/user.json', JSON.stringify(users))
        return res.cookie("access_token", "", { maxAge: 1 }).status(200).json({message:"Password changed sucessfully"})
        }
    }
        }