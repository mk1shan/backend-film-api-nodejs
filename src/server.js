import express from "express"
import {config} from "dotenv";
import { connectDB,disconnectDB } from "./config/db.js";

//import routes
import movieRoutes from "./routes/movieRoutes.js";

config()
connectDB();
const app = express()

//api routes

app.use("/movies",movieRoutes)

app.get('/hello',(req,res)=>{
    res.json({message:"hello world"})
})

const PORT =5000;

const server = app.listen(PORT,()=>{
    console.log(`server runing on ${PORT}`)
})


// 1. Handle "Unhandled Rejections" (errors you forgot to catch)
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...:",err);
  console.log(err.name, err.message);
  
  // Close the server first, then the DB
  server.close(async () => {
    await disconnectDB(); // This is the function from his DB.js
    process.exit(1);      // Exit with an error code
  });
});

// 2. Handle "Uncaught Exceptions" (bugs in your code)
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...:",err);
  console.log(err.name, err.message);
  process.exit(1);
});

// 3. Handle "SIGTERM" (When the hosting provider stops your app)
process.on("SIGTERM", () => {
  console.error("👋 SIGTERM RECEIVED. Shutting down gracefully:", err);
  server.close(async () => {
    await disconnectDB();
     process.exit(0);
  
  });
});
