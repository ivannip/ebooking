
import {execute} from "../../util/mysql.connect";
import {IUser} from "../../models/mysql/user.model";

export const userQueries = {
    findAll: `select * from users`,
    findById: `select *, "*" as password from users where Id = ?`,
    findByLoginId: `select * from users where loginId = ?`,
    createOne: `insert into users (loginId, password, email, role) values (?,?,?,?)`
};

export const findByIdService = async (id: IUser["id"]) => {
    return execute <IUser []> (userQueries.findById, [id]);
};

export const findByLoginIdService = async (loginId: IUser["loginId"]) => {
    return execute <IUser []> (userQueries.findByLoginId, [loginId]);
}

export const createOneService = async (user: IUser) => {
    const result = await execute <{affectedRows: number, insertId: any}> (userQueries.createOne, 
        [user.loginId, user.password, user.email, user.role]);
    return {id: result.insertId};
}


