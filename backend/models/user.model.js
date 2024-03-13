import mongoose from "mongoose";

//creamo il modello per l'utente --> cioè ceh attributi ha ogni utente: fullname, username, ecc..
const userSchema = new mongoose.Schema({
        //dichiaro l'attributo
        fullname:{
            //tipologia dell'attributo
            type: String,
            //non può essere vuoto, lo richiede per forza
            required:true
        },
        username:{
            type: String,
            required:true,
            //deve essere unico: chiave primaria
            unique:true
        },
        password:{
            type: String,
            required:true,
            //lughezza minima
            minlength:6
        },
        gender:{
            type: String,
            required:true,
            //può essere --> maschio o femmina
            enum:["male", "female"]
        },
        profilePic:{
            type: String,
            //inizialmente è una stringa vuota
            default:""
        }
    },

    // "timestamps: true" --> dice quando è stata creata la conversazione o quando è stata modificata
    {
        timestamps: true
    }
);

//creo un nuovo modello nel database che si chiama "User" ed è composto come lo "userSchema"
const User = mongoose.model("User", userSchema);

//per poter usare questo modello in altri file
export default User;