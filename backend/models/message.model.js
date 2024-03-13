import mongoose from "mongoose";

//creamo lo modello per il messaggio --> cioè che attributi ha ogni messaggio: senderId, receiverID, ecc..
const messageSchema = new mongoose.Schema({
        senderId:{
            //il "sendereId" deve essere di tipo "mongoose.Schema.Types.ObjectId" facendo riferimento allo "User" 
            //quindi deve essere l'Id dello "User"
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            //non opzionale
            require: true
        },

        receiverId:{
            //il "receiverId" deve essere di tipo "mongoose.Schema.Types.ObjectId" facendo riferimento allo "User" 
            //quindi deve essere l'Id dello "User"
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            //non opzionale
            require: true
        },
        
        message:{
            type: String,
            required: true
        }

    }, 
    
    // "timestamps: true" --> dice quando è stato creato il messaggio o quando è stato modificato
    {
        timestamps: true
    }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;