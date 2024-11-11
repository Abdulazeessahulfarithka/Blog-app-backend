import express from "express";
import * as dotenv from "dotenv";
import db from "./config/db.js";
import  create  from "./routes/createRoute.js";
import UserRouter from "./routes/userRoute.js";
import cors from "cors"
const allowedOrigins = ['http://localhost:3000', 'https://blog-app-backend-3vsi.onrender.com'];

dotenv.config();

const app = express();

// Connect to the database
db()

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
    credentials: true // Allow cookies if needed
  }));
  
app.use(express.urlencoded({ extended: false }));

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
