import {execute} from "../../util/mysql.connect";
//import {logger} from "../../util/logger";
import { ICanditate } from "../../mysql/models/canditate.model";

export const canditateQueries = {
    findAll: `select id, canditateNo, firstName, lastName, idDocNo, mobile, email, address from canditates`,
    findById: `select id, canditateNo, firstName, lastName, idDocNo, mobile, email, address from canditates where id = ?`,
    findByMobile: `select id, canditateNo, firstName, lastName, idDocNo, mobile, email, address from canditates where mobile = ?`,
    createOne: `insert into canditates (canditateNo, firstName, lastName, idDocNo, mobile, email, address) values (?,?,?,?,?,?,?)`
}

export const createOneCanditate  = async (canditate: ICanditate) => {
    const result = await execute <{affectedRows: number, insertId: number}> (canditateQueries.createOne, [canditate.firstName, 
        canditate.lastName, canditate.idDocNo, canditate.mobile, canditate.email]);
    return result;    
}