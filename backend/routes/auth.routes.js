import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

//"express.Router()" --> restituisce un oggetto router che può essere utilizzato per definire le rotte i gestori
//HTTP all'interno di un'applicazione Express
const router = express.Router();

//quando viene usato questo il "path" --> "/api/auth" + "/signup" || "/login" || "/logout" -->
//(res) chiamerà la funzione "signup" || "login" || "logout" dentro alla classe --> auth.controller.js
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

//esporto la funizone per poterla utilizzare in altre parti
export default router;