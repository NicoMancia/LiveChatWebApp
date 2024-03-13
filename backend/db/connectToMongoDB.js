import mongoose from "mongoose";

//Funione per la connessione con il database
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI,)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message)
    }
};

//esporto la funizone per poterla utilizzare in altre parti
export default connectToMongoDB;