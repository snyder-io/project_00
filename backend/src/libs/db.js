import mongoose from "mongoose";

export const connectDB = async () => { 
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB}`);
        console.log(`\n MongoDB connected! \n Host:${connection.connection.host} \n Port:${connection.connection.port}`);
    } catch (error) {
       console.error(`\n MongoDB connection error:\n ${error}`);
        
    }
}