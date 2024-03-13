import  express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

//stiamo assegnando un valore alla variabile PORT: 
//gli assegnamo il volere che sta dentro il file ".env" --> (8000) || (oopure) 5000;
const PORT = process.env.PORT || 5000;

dotenv.config();

//per dichiarare che la richiesta che verrà caricata sarà un file ".json" da req.body
app.use(express.json());
app.use(cookieParser());

//quando viene usato questo "path" viene fatta una chiamata alla classe auth.routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
//chiamata esempio per mostrare un messaggio a video nella route --> "/"
// req = richiesta ; res = risposta
//app.get("/", (req, res) => {
    //root route http://localhost:5000/
//    res.send("hello word!!!");
//});

//imposto come porta di ascolto del server la numero "PORT"; 
//richiamo la funzione "connectToMongoDB()" per la connessione
//invio un messaggio di conferma con "console.log" 
app.listen (PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port: ${PORT}`)
});