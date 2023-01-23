import {Request, Response, RequestHandler} from "express";
import { findAllService } from "../services/mongodb/place.services";
import { IPlace } from "../models/mongodb/place.model";
// import { findAllService } from "../services/mysql/place.services";
// import { IPlace } from "../models/mysql/place.model";
import {logger} from "../util/logger";

export const findAllPlace: RequestHandler = async (req: Request, res: Response) => {
    try {
        console.log("Call find all place controller")
        const places: IPlace[] = await findAllService();
        console.log(places);
        res.status(200).json(places);

    } catch (err) {
        logger.error(err);
        res.status(500).json(err);
    }
}