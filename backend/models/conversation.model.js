import mongoose from "mongoose";

//creamo lo modello per il conversazione --> cioè che attributi ha ogni conversazione: senderId, receiverID, ecc..
const conversationSchema = new mongoose.Schema(
    {        
        //creo un vettore di partecipanti
        participants: [
            //ogni partecipante deve essere così:

            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        //creo un vettore di messaggi
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
                //inizialmente il messaggio è vuoto
                default: [],
            },
        ],
    },
    // "timestamps: true" --> dice quando è stata creata la conversazione o quando è stata modificata
    { timestamps: true } 
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;