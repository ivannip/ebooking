import { createOneService, findBySampleIdService, updateResultByIdService } from "../services/mongodb/testRecord.services";
import { ICreateOneTestRecordReq, IFindBySampleIdReq, ITestRecord, IUpdateOneReq } from "../models/mongodb/testRecord.model";
//import { createOneService, findBySampleIdService, updateResultByIdService } from "../services/mysql/testRecord.services";
//import { ICreateOneTestRecordReq, IFindBySampleIdReq, ITestRecord, IUpdateOneReq } from "../models/mysql/testRecord.model";
import {Response, RequestHandler} from "express";
import {logger} from "../util/logger";


export const findBySampleId = async (req: IFindBySampleIdReq, res: Response) => {
    try {
        const testRecords: ITestRecord[] = await findBySampleIdService(req.params.sampleId);
        res.status(200).json(testRecords);
    } catch (err) {
        logger.error(err);
        res.status(500).json({message: err})
    }
}

export const createOneTestRecord: RequestHandler = async (req: ICreateOneTestRecordReq, res: Response) => {
    try {
        const newTestRecord: ITestRecord = req.body;
        const result = await createOneService(newTestRecord);
        res.status(200).json(result);
    } catch (err) {
        logger.error(err);
        res.status(500).json({message: err});
    }
}

export const updateResult: RequestHandler = async (req: IUpdateOneReq, res: Response) => {
    try {
        const testRecord: ITestRecord = req.body;
        const result = await updateResultByIdService(testRecord);
        res.status(200).json(result);
    } catch (err) {
        logger.error(err);
        res.status(500).json({message: err});
    }
}