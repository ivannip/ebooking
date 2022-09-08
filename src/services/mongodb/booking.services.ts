import { getConnection } from "../../util/mongodb.connect";
import {ClientSession, Connection} from "mongoose";
import {IBooking, Booking, INewBooking} from "../../models/mongodb/booking.model";
import { ICanditate, Canditate } from "../../models/mongodb/canditate.model";

import {logger} from "../../util/logger";
import {v1 as uuidv1} from "uuid";
import { TestRecord, ITestRecord } from "../../models/mongodb/testRecord.model";

export const findAllService = async () => {
    //return execute<IBooking []> (bookingQueries.findAll, []);
    const foundBookings: IBooking [] = await Booking.find({});
    return foundBookings;
}

export const createOneService = async (booking: IBooking) => {
    logger.debug(booking.selectedTime);
    // const result = await execute<{affectedRows: number}> (bookingQueries.createOne, 
    //     [booking.canditateId, booking.selectedPlace, new Date(booking.selectedDate), booking.selectedTime]);
    const newBooking: IBooking = await Booking.create(booking);
    return newBooking !== null || newBooking !== undefined;
}

export const findByMobileService = async (mobile: string) => {
    //return execute<INewBooking []>(bookingQueries.findByMobile, [mobile]);
    interface IbookingByMobile extends ICanditate {
        booking: IBooking[]
    };
    let results: INewBooking [] = [];
    const foundBookings: IbookingByMobile [] = await Canditate.aggregate([{$match: {mobile: mobile}}, 
        {$lookup: {
            from: "bookings",
            localField: "_id",
            foreignField: "canditateId",
            as: "booking"
        }}]);
    const _canditate: any = {firstName: foundBookings[0].firstName, lastName: foundBookings[0].lastName, mobile: foundBookings[0].mobile, idDocNo: foundBookings[0].idDocNo, email: foundBookings[0].email, address: foundBookings[0].address};
    foundBookings[0].booking.map( (b, idx) => {
        results.push({...b, id: b._id, ..._canditate})
    });
    return results;
}

export const updateSampleNoByIdService = async (booking: INewBooking) => {
    logger.debug(booking);
    const connection: Connection = await getConnection();
    const session:ClientSession = await connection.startSession();
    const trimMobile = booking.mobile.length > 4?booking.mobile.substring(0,4):booking.mobile;
    const trimIdDocNo = booking.idDocNo.length > 4?booking.idDocNo.substring(0,4):booking.idDocNo;
    try {
        // await connection.query("START TRANSACTION");
        // let result = await connection.query(bookingQueries.updateSampleById, [booking.sampleId, booking.id])
        
        // result = await connection.query(testRecordQueries.createOne, [booking.sampleId, booking.firstName, trimMobile, trimIdDocNo])
        // await connection.query("COMMIT");
        session.startTransaction();
        await Booking.updateOne({_id: booking.id}, {sampleId: booking.sampleId}, {session});
        const createdRecords: ITestRecord [] = await TestRecord.create([{sampleId: booking.sampleId, firstName: booking.firstName, mobile: trimMobile, idDocNo: trimIdDocNo}], {session})
        await session.commitTransaction();
        return {affectedRows: createdRecords.length};
    } catch (err) {
        await session.abortTransaction();
        logger.error(err);
    } finally {
        logger.debug("Release connection");
        await session.endSession()
    }

}


//Transaction way
export const createNewBookingService = async (newBooking: INewBooking) => {
    let canditateId: number;
    const connection: Connection = await getConnection();
    const session:ClientSession = await connection.startSession();
    try {
        session.startTransaction();
        const foundCanditates: ICanditate [] = await Canditate.find({mobile: newBooking.mobile})

        //if canditates not exist, insert new
        if (foundCanditates.length === 0) {
            const newCanditates: ICanditate []= await Canditate.create([{canditateNo: uuidv1(), firstName: newBooking.firstName, lastName: newBooking.lastName, idDocNo: newBooking.idDocNo, mobile: newBooking.mobile, email: newBooking.email, address: newBooking.address}], {session});
            if (newCanditates.length > 0) {
                canditateId = newCanditates[0]._id
            } else throw new Error ("Error on inserting canditate");      
        } else {
            canditateId = foundCanditates[0]._id;
        }
        //insert new booking
        const bookings: IBooking [] = await Booking.create([{canditateId: canditateId, selectedPlace: newBooking.selectedPlace, selectedDate: new Date(newBooking.selectedDate), selectedTime: newBooking.selectedTime}], {session});
        if (bookings.length === 0)
            throw new Error ("Error on inserting booking");
        await session.commitTransaction();
        return bookings[0];   
        
    } catch (err) {
        await session.abortTransaction();
        logger.error(err);
    } finally {
        logger.debug("Release connection");
        await session.endSession();
    }
}