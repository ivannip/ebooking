import { canditateQueries } from "./canditate.queries";
import {execute} from "../../util/mysql.connect";
//import {logger} from "../../util/logger";
import { ICanditate } from "../../mysql/models/canditate.model";

export const createOneCanditate  = async (canditate: ICanditate) => {
    const result = await execute <{affectedRows: number, insertId: number}> (canditateQueries.createOne, [canditate.firstName, 
        canditate.lastName, canditate.idDocNo, canditate.mobile, canditate.email]);
    return result;    
}