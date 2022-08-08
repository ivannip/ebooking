import {Document, model, Schema} from "mongoose";

export interface ICanditate extends Document {
    canditateNo: String,
    firstName: String,
    lastName: String,
    idDocNo: String,
    mobile: String,
    email: String,
    address: String
}

const canditateSchema = new Schema<ICanditate> ({
    canditateNo: String,
    firstName: String,
    lastName: String,
    idDocNo: String,
    mobile: String,
    email: String,
    address: String
})

export const Canditate = model<ICanditate>("canditate", canditateSchema);
