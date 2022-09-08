import {Request} from "express";

export interface ICanditate {
    id: number,
    firstName: string,
    lastName: string,
    idDocNo: string,
    mobile: string,
    email: string,
    address: string,
    lastUpdated: Date,
}

export interface INewCandidateReq extends Request {};