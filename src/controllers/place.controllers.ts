import {Request, Response, RequestHandler} from "express";
import { findAllService } from "../services/mongodb/place.services";
import { IPlace } from "../models/mongodb/place.model";
//import { findAllService } from "../mysql/services/place.services";
//import { IPlace } from "../mysql/models/place.model";
import {logger} from "../util/logger";

export const findAllPlace: RequestHandler = async (req: Request, res: Response) => {
    try {
        const places: IPlace[] = await findAllService();
        res.status(200).json(places);

    } catch (err) {
        logger.error(err);
        res.status(500).json(err);
    }
}