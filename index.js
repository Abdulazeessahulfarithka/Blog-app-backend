import express from "express";
import * as dotenv from "dotenv";
import db from "./config/db.js";
import  create  from "./routes/createRoute.js";
import UserRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();

// Connect to the database
db()

// Middleware to parse JSON requests
app.use(express.json());

// Port configuration with a fallback to port 3000
const PORT = process.env.PORT;

// Default route
app.get('/', (req, res) => {
    res.send("HELLO WORLD");
});

//routes
app.use("/api/blog",create)
app.use("/api/user", UserRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
