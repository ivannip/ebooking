import { createPool, Pool} from "mysql";
import {logger} from "./logger";

let pool: Pool;

export const connectDB = () => {
    try {
        pool = createPool({
            connectionLimit: +process.env.DB_CONNECTION_LIMIT,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        })
        logger.info("MySQL Connected!")
    } catch (err) {
        logger.error("[mysql.connector][init][Error]: ", err)
        throw new Error("Failed to connect MySQL");
    }
};

export const getConnection = () => {
    try {
        if (!pool) throw new Error("Connection pool does not existed.");

        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) reject(err);
                console.log("MySQL pool connected: threadId " + connection.threadId);
    
                const query = (sql: string, params: string [] | object) => {
                    return new Promise((resolve, reject) => {
                    connection.query(sql, params, (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                        });
                    });
                };
    
                const release = () => {
                    return new Promise ((resolve, reject) => {
                        if (err) reject(err);
                        console.log("MySQL pool released: threadId " + connection.threadId);
                        //connection.release()
                        resolve(connection.release());
                    });
                };

                resolve({ query, release });
            });
        });

    } catch (err) {
        logger.error(`[mysql.connector][execute][error]: ${err}`);
        throw new Error("Failed to get connection, pool probably not existed!");
    }        
};

export const execute = <T>(query: string, params: string [] | Object) : Promise<T> => {
    try {
        if (!pool) throw new Error("Connection pool does not existed.");

        return new Promise<T>((resolve, reject) => {
            pool.query(query, params, (err, results) => {
                if (err) reject (err);
                else resolve(results);
            });
        });
    } catch (err) {
        logger.error(`[mysql.connector][execute][error]: ${err}`);
        throw new Error("Failed to execute query");
    }
}



