const express = require("express");

const app = express();
require("dotenv").config();

require("./config/dbConnection");



const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/recipes", require("./routes/recipeRoutes"));

app.use("/api/users", require("./routes/userRoutes"));




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});