const express = require("express");

const app = express();
require("dotenv").config();

require("./config/dbConnection");

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/v1/auth", require("./routes/authRoutes"));

app.use("/api/v1/recipes", require("./routes/recipeRoutes"));

app.use("/api/v1/users", require("./routes/userRoutes"));



app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
