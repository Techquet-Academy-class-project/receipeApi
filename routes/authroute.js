const express = require("express")
const {createNewRecipe, mymeals, editRecipeId, getUsersProfile, editUsersProfile, changePassword} = require('../controllers/authcontrollers')

const router = express.Router()
router.use(express.json())


router.post('/createNewRecipe', createNewRecipe)


router.get('/mymeals',mymeals)

router.delete('/recipe/:id', mymeals)


router.put('/recipe/:id', editRecipeId)

router.get('/users/profile',getUsersProfile)


router.put('/users/profile', editUsersProfile)


router.put('/users/settings', changePassword)


module.exports = router


