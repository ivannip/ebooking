import {Request} from "express";

export interface IPlace {
    id: number,
    name: string,
    address: string,
    open: boolean
}

export interface IFindAllReq extends Request {};