const express = require("express")
const router = express.Router()
const{ getRecipe, getRecipeId, getUserId, signup, login} = require('../controllers/noauthcontrollers')


router.use(express.json())


router.get('/recipe', getRecipe)

router.get( '/recipe/:id', getRecipeId)

router.get('/user/:id', getUserId)

router.post('/auth/signup', signup)
 
router.post('/auth/login', login)



module.exports = router