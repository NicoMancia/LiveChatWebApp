//package imports
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//file imports
import authRoutes from "./routes/auth.routes.js";
import messagesRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

import helmet from "helmet";
//This package helps validate and sanitize incoming request data to prevent injection attacks and other security vulnerabilities.
import { body, validationResult } from "express-validator";
import mongoSanitize from "express-mongo-sanitize";
import csurf from "csurf";
import rateLimit from "express-rate-limit";



//variables
const PORT = process.env.PORT || 5000;

const __dirname= path.resolve();

dotenv.config();

app.use(express.json());//parse requests from req.body on auth.controller.js
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messagesRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname, "/frontEnd/dist")));

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname,"frontEnd","dist","index.html"));
})



//Helmet helps secure Express.js apps by setting various HTTP headers. 
//These headers can mitigate certain kinds of attacks, such as cross-site scripting (XSS), clickjacking, and other code injection attacks.
app.use(helmet());


//sanitize user input to prevent NoSQL injection attacks.
app.use(mongoSanitize());

// Implement CSRF (Cross-Site Request Forgery) protection to prevent unauthorized commands sent by a user that the web application trusts.
app.use(csurf());

//Implement rate limiting to prevent brute force attacks or abuse of your APIs.
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500 // limit each IP to 500 requests per windowMs
});
app.use(limiter);



server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
});