import {IUser, User} from "../../models/mongodb/user.model";
import {logger} from "../../util/logger"

export const findByIdService = async (id: IUser["id"]) => {
    //return execute <IUser []> (userQueries.findById, [id]);
    const foundUsers: IUser [] = await User.find({_id: id});
    return foundUsers
};

export const findByLoginIdService = async (loginId: IUser["loginId"]) => {
    //return execute <IUser []> (userQueries.findByLoginId, [loginId]);
    const foundUsers: IUser [] = await User.find({loginId: loginId});
    return foundUsers;
}

export const createOneService = async (user: IUser)  => {
    //const result = await execute <{affectedRows: number, insertId: number}> (userQueries.createOne, [user.loginId, user.password, user.email, user.role]);
    //return result;
    const savedUser: IUser = await User.create(user);
    return {id: savedUser._id};
    
}