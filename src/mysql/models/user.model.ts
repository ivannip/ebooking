import {Request} from "express";

export interface IUser {
    id: number;
    loginId: string,
    password: string,
    email: string,
    role: string
};

export interface IFindAllReq extends Request {};
export interface IFindByIdReq extends Request <{id: IUser["id"]}> {};
export interface ILoginReq extends Request <any, any, IUser> {};
export interface ICreateOneReq extends Request {};
export interface IVerifyReq extends Request <{id: IUser["id"]}> {};