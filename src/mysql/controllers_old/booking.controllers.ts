import { Request, Response, RequestHandler } from "express";
//import { ICanditate } from "../models/canditate.model";
import { IBooking, IFindAllReq, ICreateOneBookingReq, INewBooking, INewBookingReq} from "../models/booking.model"
import {findAllService, createOneService, createNewBookingService, findByMobileService, updateSampleNoByIdService} from "../services/booking.services";
import {logger} from "../../util/logger";
//import { createOneCanditate } from "../services/canditate.services";

export const findAllBooking: RequestHandler = async (req: IFindAllReq, res: Response) => {
    try {
        const bookings: IBooking [] = await findAllService();
        res.status(200).json(bookings);
    } catch (err) {
        logger.error(err);
        res.status(500).json({message: err});
    }   
};

export const findByMobile: RequestHandler = async (req: Request, res: Response) => {
    try {
        
        const bookings: INewBooking [] = await findByMobileService(req.body.mobile);
        res.status(200).json(bookings);
    } catch (err) {
        logger.error(err);
        res.status(500).json({message: err});
    }

}

export const createOneBooking: RequestHandler = async (req: ICreateOneBookingReq, res: Response) => {
    try {
        const newBooking: IBooking = req.body;
        const result = await createOneService(newBooking);
        res.status(200).json(result); 
    } catch (err) {
        logger.error(err);
        res.status(500).json({message: err})
    }
}

export const createNewBooking: RequestHandler = async (req: INewBookingReq, res: Response) => {
    try {
        const newBooking: INewBooking = req.body;
        console.log(newBooking);
        const result = await createNewBookingService(newBooking);
        res.status(200).json(result);
    } catch (err) {
        logger.error(err);
        res.status(500).json({message: err});
    }
}

export const updateSampleNo: RequestHandler = async (req: INewBookingReq, res: Response) => {
    try {
        const booking: INewBooking = req.body;
        const result = await updateSampleNoByIdService(booking);
        if (result.affectedRows === 1)
            res.status(200).json({message: "update success"});
        else
            res.status(404).json({message:"record no found for update"});
    } catch (err) {
        logger.error(err);
        res.status(500).json({message: err})
    }
}