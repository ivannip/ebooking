import {Schema, Document, model} from "mongoose";
import {Request} from "express";

export interface IUser extends Document {
    loginId: string,
    password: string,
    email: string,
    role: string
}

const userSchema: Schema = new Schema<IUser>({
    loginId: String,
    password: String,
    email: String,
    role: String,
});

export const User = model<IUser>("user", userSchema);

export interface ILoginReq extends Request <any, any, IUser> {};
export interface ICreateOneReq extends Request {};

