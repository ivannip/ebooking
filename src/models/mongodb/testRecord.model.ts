import {Document, model, Schema} from "mongoose";
import {Request} from "express";

export interface ITestRecord extends Document {
    sampleId: String,
    firstName: String,
    mobile: String,
    idDocNo: String,
    result: String
}

const testRecordSchema = new Schema<ITestRecord> ({
    sampleId: String,
    firstName: String,
    mobile: String,
    idDocNo: String,
    result: String
})

export const TestRecord = model<ITestRecord>("testRecord", testRecordSchema);

export interface ICreateOneTestRecordReq extends Request <any, any, ITestRecord> {};
export interface IFindBySampleIdReq extends Request <{sampleId: ITestRecord["sampleId"]}> {};
export interface IUpdateOneReq extends Request <any, any, ITestRecord> {};