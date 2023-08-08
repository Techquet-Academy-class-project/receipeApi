const express = require("express")
const {createNewRecipe, mymeals,deleteId, editId, getProfile, editProfile, changePassword} = require('../Controllers/authcontrollers')

const router = express.Router()



router.use(express.json())

router.post('/createNewRecipe', createNewRecipe)

router.get('/mymeals', mymeals)

router.delete('/receipe/:id/', deleteId)

router.put('/receipe/:id', editId)

router.get('/users/profile', getProfile)

router.put('/users/profile', editProfile)

router.put('/users/settings', changePassword) 




module.exports = router