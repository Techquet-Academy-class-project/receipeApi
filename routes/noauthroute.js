
const express = require("express")
const {getRecipe,getArecipe,getAuser,signup,login, logout} = require('../Controllers/noauthcontrollers')

const router = express.Router()


router.use(express.json())

router.get('/recipe', getRecipe)

router.get('/recipe/:id', getArecipe)

router.get('/user/:id', getAuser)

router.post('/auth/signup', signup)

router.post('/auth/login', login)

router.get('/auth/logout', logout)


// router.get('/auth/logout',async function (_, res) {
//     res.cookie("authorization", "", { maxAge: 1 })
//     return res.json({ message: "Succesfully logged out", success: true })
// })


module.exports = router