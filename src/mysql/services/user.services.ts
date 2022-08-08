import { userQueries } from "./user.queries";
import {execute} from "../../util/mysql.connect";
import {IUser} from "../models/user.model";

export const findByIdService = async (id: IUser["id"]) => {
    return execute <IUser []> (userQueries.findById, [id]);
};

export const findByLoginIdService = async (loginId: IUser["loginId"]) => {
    return execute <IUser []> (userQueries.findByLoginId, [loginId]);
}

export const createOneService = async (user: IUser) => {
    const result = await execute <{affectedRows: number, insertId: number}> (userQueries.createOne, 
        [user.loginId, user.password, user.email, user.role]);
    return result;
}


