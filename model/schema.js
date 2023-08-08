const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema( {
    name:{type:String,required:[true,"Please provide your name"]},
    username:{type:String,required:[true,"Please provide your username"]},
    email:{type:String,required:[true,"Please provide your email"],unique:[true,"email already exist"]},
    password:{type:String,minLength:[6,"Password length should be greater than 5"],required:[true,'Password must be provided']},
    recipes:[{type:mongoose.Schema.ObjectId, ref:"Recipe"}],
},
{
    timestamps:true
})

const recipeSchema = new mongoose.Schema({
    title:{type:String,required:true},
    tribe:String,
    ingredients: [String],
    process: [{step : Number,
        detail : String}],
    createdBy:{type:mongoose.Schema.ObjectId, ref:"Users",required:[true, "All recipes must be posted by the user"]},
},{
    timestamps:true
})


userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})


const Users = mongoose.model("Users",userSchema)
const Recipe = mongoose.model("Recipe",recipeSchema)



module.exports ={Users,Recipe}