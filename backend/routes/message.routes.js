import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

/* 
    "express.Router()" --> restituisce un oggetto router che può essere utilizzato per definire le rotte i gestori
    HTTP all'interno di un'applicazione Express 
*/
const router = express.Router();

/* 
    quando viene usato questo il "path" --> "/api/messages" + "/send/:id" -->
    (res) chiamerà la funzione "sendMessage" dentro alla classe --> message.controller.js
    "protectRoute" --> serce per proteggere la "route" (e quindi il path ("/send/:id")) prima di avviare la funzione "sendMessage",
    perché non tutti gli utenti hanno il permesso di inviare un messaggio
 */
router.post("/send/:id", protectRoute, sendMessage);
//per visualizzare i messaggi tra due utenti
router.get("/:id", protectRoute, getMessages);

export default router;