import User from "../models/user.model.js";

export const getUsersForSidebar = async (req,res) =>{

    try {
        
        const loggedInUserId = req.user._id;

        /*
            trova ogni utente nel database ("User.find(...)"), tranne ("$ne") quello che corrisponde (":") a ("loggedInUserId"), 
            tranne la password (".select("-password");") 
        */
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId }}).select("-password");

        //stampa
        res.status(200).json(filteredUsers);



    } catch (error) {
        console.error("Error in getUsersForSidebar controller: ", error.message)
        res.status(500).json({error: "internal serve error"});
    }
}