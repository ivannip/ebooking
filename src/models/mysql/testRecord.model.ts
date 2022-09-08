import {Request} from "express";

export interface ITestRecord {
    id: number,
    sampleId: string,
    firstName: string,
    mobile: string,
    idDocNo: string,
    result: string
}

export interface ICreateOneTestRecordReq extends Request <any, any, ITestRecord> {};
export interface IFindBySampleIdReq extends Request <{sampleId: ITestRecord["sampleId"]}> {};
export interface IUpdateOneReq extends Request <any, any, ITestRecord> {};