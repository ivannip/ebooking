import mongoose, {Schema, Document, model} from "mongoose";
import {Request} from "express";

export interface INewBooking extends Document {
    firstName: string,
    lastName: string,
    idDocNo: string,
    mobile: string,
    email: string,
    address: string,
    selectedPlace: string,
    selectedDate: string,
    selectedTime: string,
    sampleId: {
        type: string,
        default: null}
} 

export interface IBooking extends Document {
    canditateId: Number,
    selectedPlace: String,
    selectedDate: Date,
    selectedTime: String,
    sampleId: {
        type: String,
        default: null }
}

const bookingSchema = new Schema<IBooking> ({
    canditateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    selectedPlace: String,
    selectedDate: Date,
    selectedTime: String,
    sampleId: {
        type: String,
        default: null}
})

export const Booking = model<IBooking>("booking", bookingSchema);

export interface IFindAllReq extends Request{};
export interface IFindbyMobileReq extends Request <any, any, INewBooking> {};
export interface IFindByUserIdReq extends Request<{canditateId: IBooking["canditateId"]}> {};
export interface ICreateOneBookingReq extends Request{};
export interface IUpdateOneReq extends Request<any, any, IBooking> {};
export interface IDeleteOneReq extends Request<{id: IBooking["id"]}> {};
export interface INewBookingReq extends Request <any, any, INewBooking> {};