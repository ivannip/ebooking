import mongoose, {Connection} from "mongoose";
import {logger} from "./logger";

let conn: Connection;

export const connectDB = () => {
    
    mongoose.connect(process.env.MONGODB_URL);

    conn = mongoose.connection;

    conn.on("open", () => {
        logger.info("Connected to Mongo Database")
    });

    conn.on("error", (error) => {
        logger.error("Mongoose Connection Error: "+ error);
    });
}


export const getConnection = () => {
    return conn;
}


