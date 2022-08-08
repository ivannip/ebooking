

import { Canditate, ICanditate } from "../../mongodb/models/canditate.model";

export const createOneCanditate  = async (canditate: ICanditate) => {
    // const result = await execute <{affectedRows: number, insertId: number}> (canditateQueries.createOne, [canditate.firstName, 
    //     canditate.lastName, canditate.idDocNo, canditate.mobile, canditate.email]);
    const result: ICanditate = await Canditate.create({firstName: canditate.firstName, lastName: canditate.lastName, idDocNo: canditate.idDocNo, mobile: canditate.mobile, email: canditate.email})
    return result; 
}