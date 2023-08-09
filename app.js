require("dotenv").config()
require("express-async-errors")
const {errorHandlerMidddleware} = require('./errormiddleware/errorHandler')
const cookieParser = require("cookie-parser")
const express = require("express")
const mongoose = require("mongoose")
const authMiddleware = require('./authmiddleware/auth')
const authroute = require('./routes/authroute')
const noauthroute = require('./routes/noauthroute')
const cors = require("cors")
const app = express()


app.use(cors())
app.use(cookieParser())
app.use(noauthroute)
app.use('/',authMiddleware,authroute)
app.use(errorHandlerMidddleware)



const port = process.env.PORT || 5000



mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("mongodb connected"))
app.listen(port, ()=>console.log(`Server listening on port ${port}`))