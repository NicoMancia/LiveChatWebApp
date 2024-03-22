 import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

/*
    async --> dichiara che una funzione è asincrona, quindi restituirà una Promise come risultato. 
    Utilizzando async, è possibile utilizzare await all'interno di quella funzione per attendere il completamento 
    di altre operazioni asincrone prima di procedere. Una "Promise" è un oggetto che rappresenta il risultato di 
    un'operazione asincrona. può essere: "pending" (in sospeso), "fulfilled" (adempita) o "rejected" (respinta).
*/
export const sendMessage = async (req, res) => {
    try {
        //parametro richiesto nel corpo
        const {message} = req.body;
        //parametro richiesto nel URL
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{ $all: [senderId,receiverId]},
        });

        //se non esiste già una conversazione, la creo
        if(!conversation){
            conversation= await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        //creo un nuovo messaggio opo aver creato/trovato la conversazione
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        //se c'è un nuovo messaggio, lo inserisco dentro all'array dei messaggi tramite "conversation.message.push(newMessage._id);"
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        //salvo nel database
        //esegue entrambe le linee di codice in parallelo ed è più veloce
        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            //io.to(<socket_id>).emit() è usato per inviare eventi ad un singolo client
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        //stampo il messaggio che ho appena creato e salvato
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            //io.to(<socket_id>).emit() è usato per inviare eventi ad un singolo client
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage);
    }catch(error){
        console.log("Errore del controller sul sendMessage\n", error.message);
        res.status(500).json({error:"Errore del server interno"});
    }
};
export const getMessages = async (req,res) => {
    try{
        //parametro richiesto nel URL        
        const {id:userToChatId}= req.params;
        const senderId=req.user._id;
        //trovo la conversazione tra i 2 utenti attraverso gli ID        
        const conversation= await Conversation.findOne({
            participants: {$all:[senderId,userToChatId]},
        //con il metodo fornito da mongoose --> .populate("messages") possiamo visualizzare i contenuti dei messaggi e non i riferimenti          
        }).populate("messages");
        
        if(!conversation) return res.status(200).json([]);
        
        const messages= conversation.messages;
        
        res.status(200).json(messages);
    }catch(error){
        console.log("Errore del controller sul sendMessage\n", error.message);
        res.status(500).json({error:"Errore del server interno"});
    }
}