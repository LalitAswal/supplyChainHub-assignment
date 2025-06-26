const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

const dbConnection = require("./config/dbConnection");

//routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");



dotenv.config({ path: "./config/.env" });
dbConnection()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//routes

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) console.log("Error starting server:", err);
  else console.log(`App is listening on port ${PORT}`);
});
