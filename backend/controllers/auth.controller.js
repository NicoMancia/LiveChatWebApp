import User from "../models/user.model.js";
import bcrypto from "bcryptjs";
import generateTokenAndSetCookies from "../utils/generateToken.js";

/*
    async --> dichiara che una funzione è asincrona, quindi restituirà una Promise come risultato. 
    Utilizzando async, è possibile utilizzare await all'interno di quella funzione per attendere il completamento 
    di altre operazioni asincrone prima di procedere. Una "Promise" è un oggetto che rappresenta il risultato di 
    un'operazione asincrona. può essere: "pending" (in sospeso), "fulfilled" (adempita) o "rejected" (respinta).
*/
//funzione SIGNUP
export const signup = async (req, res) => {
    try {
        //parametri richiesti nel corpo del "body" quindi cone json
        const {fullname, username, password, confirmPassword, gender } = req.body;

        //check per la password
        if (password !== confirmPassword){
            return res.status(400).json({error:"Password don't match"})
        }
        
        //controllo se esiste già un username uguale nel DB
        const user = await User.findOne({username})

        //se l'username già esiste langio l'errore
        if (user){
            return res.status(400).json({error:"Username already exists"})
        }

    /* 
        crypto la password --> più il numero dentro a ".genSalt(10)" è alto più è sicuro, ma anche più lento.
        per rendere la password più sicura si svolge la "funzione di hashing" che crypta la password con tanti caratteri:
        ESEMPIO password: "password123" --> password dopo hashing: "2c6ee24b09816a6f14f95d1698b24eadfa046f8d15cf2ecc4b05663b7b7c4e6e"
        in più per renderla più sicura gli aggiungiamo il cosidetto "sale (salt)" che è un valore aggiuntivo che viene
        unito alla password prima di fare l'hashing rendendo molto più sicura la password:
        ESEMPIO password: "password123" + salt: "abc123" = password123abc123 dopo di che viene fatto l'hashing di tutta questa
        nuova passowrd --> password dopo hashing: "2c6ee24b09816a6f14f95d1698b24eadfa046f8d15cf2ecc4b05663b7b7c4e6e........." 
    */
        const salt = await bcrypto.genSalt(10);
        const hashedPassword = await bcrypto.hash(password, salt)

        //genero l'immagine profilo
        //le immagini del profilo dell'utente le va a prendere da un API online
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        //creo un nuovo utente con le informazioni che l'utente ha inserito
        const newUser = await User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            //se il gender è "male" allora prendo l'immagine del "boyProfilePic" se no della "girlProfilePic"
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            //GENERATE JWT token
            generateTokenAndSetCookies(newUser._id, res);

            //salvo nel DataBase
            await newUser.save();

            //retituisce lo stato "201" che significa che è stato creato con successo un nuovo User e restituisco i dati del nuovo User
            res.status(201).json({
                 _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
            
        } else {
            res.status(400).json({error: "Invalid user data"});
        }

    }catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

export const login = async (req, res) => {
    try {
        //parametri richiesti
        const {username, password} = req.body;

        //controllo se esiste già un username uguale nel DB
        const user = await User.findOne({username});     

        //controllo se la password corrisponde --> comparo la password data in input con quella dello user trovato in --
        //--> "User.findOne({username})". Se non esiste lo "user" quindi --> (..., user?.password" ...) non è definita o è nulla, 
        //comparo la password data in input con una stringa vuota --> (... || "");
        const isPasswordCorrect = await bcrypto.compare(password, user?.password || "");
        
        //se lo "user" non esiste o se la "password" non è corretta lancio l'errore
        if (!user || !isPasswordCorrect)
        {
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookies(user._id, res);

        //retituisce lo stato "200" che significa che è stato creato con successo un nuovo User e restituisco i dati del nuovo User
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}


