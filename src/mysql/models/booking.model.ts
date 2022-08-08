import { Request } from "express";

export interface IBooking {
    id: number,
    canditateId: number,
    selectedPlace: string,
    selectedDate: string,
    selectedTime: string,
    sampleId: string,
    lastUpdated: Date
};

export interface INewBooking {
    id: number,
    firstName: string,
    lastName: string,
    idDocNo: string,
    mobile: string,
    email: string,
    address: string,
    selectedPlace: string,
    selectedDate: string,
    selectedTime: string,
    sampleId: string,
} 

export interface IFindAllReq extends Request{};
export interface IFindbyMobileReq extends Request <any, any, INewBooking> {};
export interface IFindByUserIdReq extends Request<{canditateId: IBooking["canditateId"]}> {};
export interface ICreateOneBookingReq extends Request{};
//export interface IUpdateOneReq extends Request<{id: IBooking["id"]}, any, IBooking> {};
export interface IUpdateOneReq extends Request<any, any, IBooking> {};
export interface IDeleteOneReq extends Request<{id: IBooking["id"]}> {};
export interface INewBookingReq extends Request <any, any, INewBooking> {};

