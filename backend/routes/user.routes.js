import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";
 

/* 
    "express.Router()" --> restituisce un oggetto router che può essere utilizzato per definire le rotte i gestori
    HTTP all'interno di un'applicazione Express 
*/
const router = express.Router();

/* 
    quando viene usato questo il "path" --> "/api/users" + "/" -->
    (res) chiamerà la funzione "getUsersForSidebar" dentro alla classe --> message.controller.js;
    "protectRoute" --> serve per proteggere la "route" (e quindi il path ("/")) prima di avviare la funzione "getUsersForSidebar",
    perché non tutti hanno il permesso di accedere alla funzione "getUsersForSidebar"
 */
router.get("/", protectRoute, getUsersForSidebar);

export default router;