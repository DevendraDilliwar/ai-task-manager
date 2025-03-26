const express = require("express");
const connectDb = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors"); 
const nodemailer = require("nodemailer");
const errorHandler = require("./middleware/errorMiddleware");  

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();


// Connect to database
connectDb();

//error handler Middleware
app.use(errorHandler);

// Middleware
app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/ai",require('./routes/aiRoutes'))



// server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
