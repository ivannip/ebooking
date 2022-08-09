import {execute, getConnection} from "../../util/mysql.connect";
import {IBooking} from "../../mysql/models/booking.model";
import { ICanditate } from "../../mysql/models/canditate.model";
import { testRecordQueries } from "./testRecord.services";
import { canditateQueries } from "./canditate.services";
import { INewBooking } from "../../mysql/models/booking.model";
import {logger} from "../../util/logger";
import {v1 as uuidv1} from "uuid";

export const bookingQueries = {
    findAll: `select * from bookings`,
    findByCanditate: `select b.id as id, firstName, lastName, idDocNo, mobile, email, selectedPlace, selectedDate, selectedTime, sampleId from canditates a, bookings b where a.id = b.canditateId and b.canditateId = ?`,
    createOne: `insert into bookings (canditateId, selectedPlace, selectedDate, selectedTime) values (?,?,?,?)`,
    findByMobile: `select b.id as id, firstName, lastName, idDocNo, mobile, email, selectedPlace, selectedDate, selectedTime, sampleId from canditates a, bookings b where a.id = b.canditateId and a.mobile = ?`,
    updateSampleById: `Update bookings set sampleId = ? where id = ?`,
};

export const findAllService = async () => {
    return execute<IBooking []> (bookingQueries.findAll, []);
}

export const createOneService = async (booking: IBooking) => {
    logger.debug(booking.selectedTime);
    const result = await execute<{affectedRows: number}> (bookingQueries.createOne, 
        [booking.canditateId, booking.selectedPlace, new Date(booking.selectedDate), booking.selectedTime]);
    return result.affectedRows > 0;
}

export const findByMobileService = async (mobile: string) => {
    return execute<INewBooking []>(bookingQueries.findByMobile, [mobile]);
}

export const updateSampleNoByIdService = async (booking: INewBooking) => {
    logger.debug(booking);
    const connection: any = await getConnection();
    try {
        await connection.query("START TRANSACTION");
        let result = await connection.query(bookingQueries.updateSampleById, [booking.sampleId, booking.id])
        const trimMobile = booking.mobile.length > 4?booking.mobile.substring(0,4):booking.mobile;
        const trimIdDocNo = booking.idDocNo.length > 4?booking.idDocNo.substring(0,4):booking.idDocNo;
        result = await connection.query(testRecordQueries.createOne, [booking.sampleId, booking.firstName, trimMobile, trimIdDocNo])
        await connection.query("COMMIT");
        return result;
    } catch (err) {
        await connection.query("ROLLBACK");
        logger.error(err);
    } finally {
        logger.debug("Release connection");
        await connection.release();
    }

}


//Transaction way
export const createNewBookingService = async (newBooking: INewBooking) => {
    let canditateId: number;
    const connection: any = await getConnection();
    try {
        await connection.query("START TRANSACTION");
        const foundCanditates: ICanditate[] = await connection.query(canditateQueries.findByMobile, [newBooking.mobile])
        
        //if canditates not exist, insert new
        if (foundCanditates.length === 0) {
            const result = await connection.query(canditateQueries.createOne, 
                [uuidv1(), newBooking.firstName, newBooking.lastName, newBooking.idDocNo, newBooking.mobile, newBooking.email, newBooking.address]);
            if (result.affectedRows >= 1) {
                canditateId = +result.insertId
            } else throw new Error ("Error on inserting canditate");      
        } else {
            canditateId = foundCanditates[0].id;
        }
        //insert new booking
        const result2 = await connection.query(bookingQueries.createOne, 
            [canditateId, newBooking.selectedPlace, new Date(newBooking.selectedDate), newBooking.selectedTime]);
        if (result2.affectedRows < 1)
            throw new Error ("Error on inserting booking");
        await connection.query("COMMIT");
        return result2;   
        
    } catch (err) {
        await connection.query("ROLLBACK");
        logger.error(err);
    } finally {
        logger.debug("Release connection");
        await connection.release();
    }
}


// export const createNewBookingService = async (newBooking: INewBooking) => {
//     logger.debug(newBooking);
//     const result = await execute<{affectedRows: number, insertId: number}> (canditateQueries.createOne, 
//         [uuidv1(), newBooking.firstName, newBooking.lastName, newBooking.mobile, newBooking.email]);
    
//     if (result.affectedRows >= 1) {
//         const result2 = await execute<{affectedRows: number}> (bookingQueries.createOne, 
//             [result.insertId, newBooking.selectedPlace, new Date(newBooking.selectedDate), newBooking.selectedTime]);
//         return result2;
//     } else {
//         throw new Error ("Error on inserting canditate");
//     }    
// }