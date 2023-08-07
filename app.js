require("dotenv").config()
require("express-async-errors")
const express = require("express")
const cookieParser = require("cookie-parser")
const authMiddleware = require('./authentications/authorization')
const app = express()
const noauthRouter = require('./routes/noauthroute')
const authRouter = require('./routes/authroute')



app.use(cookieParser())
app.use('/',noauthRouter)
app.use('/',authMiddleware,authRouter)




port = process.env.PORT || 3000






app.listen(port, ()=> console.log("Server running on port 3000"))