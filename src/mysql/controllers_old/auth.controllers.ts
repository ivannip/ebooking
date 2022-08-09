import {Request, Response, RequestHandler} from "express";
//import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {IUser, ICreateOneReq, ILoginReq} from "../models/user.model";
import { createOneService, findByIdService, findByLoginIdService } from "../services/user.services";
import {logger} from "../../util/logger";
import { COOKIE_OPTIONS, getToken, verifyToken } from "../../util/authenticate";

export const register: RequestHandler = async (req: ICreateOneReq, res: Response) => {
    try {
        let newUser = req.body;
        var hashedPassword: string = bcrypt.hashSync(newUser.password, 8);
        newUser = {...newUser, password: hashedPassword};
        const result = await createOneService(newUser);
        //var token = jwt.sign({id: result.insertId}, process.env.SECRET, {expiresIn: +process.env.TOKEN_EXPIRE});
        var token = getToken({id: result.id});
        res.cookie("token", token, COOKIE_OPTIONS)   
        res.status(200).json({success: true, token: token});
    } catch (err) {
        logger.error(err);
        res.status(500).json({message: err});
    }
}

export const login: RequestHandler = async (req: ILoginReq, res: Response) => {
    try {
        const users : IUser [] = await findByLoginIdService(req.body.loginId);
        logger.debug(users);
        if (!users || users.length === 0) return res.status(404).json({message: "User not found"})
        var isValid = bcrypt.compareSync(req.body.password, users[0].password)
        if (!isValid) return res.status(404).json({message: "Password incorrect"});

        //var token = jwt.sign({id: users[0].id}, process.env.SECRET, {expiresIn: +process.env.TOKEN_EXPIRE});        
        var token = getToken({id: users[0].id});
        
        //parse the token to client cookie, require cookie-parser
        res.cookie("token", token, COOKIE_OPTIONS)   
        res.status(200).json({success: true, token: token, details: users[0]});

    } catch (err) {
        logger.error(err);
        res.status(500).json({message: err});
    }
    
}

export const retrieveUserInfo: RequestHandler = async (req: Request, res: Response) => { 
    const users: IUser[] = await findByIdService(req.body.id);
    if (!users || users.length === 0) return res.status(404).json("No user found.")
    res.status(200).json(users)    
}

export const verifyLogin: RequestHandler = async (req: Request, res: Response) => {
    const { signedCookies = {}} = req;
    const {token} = signedCookies;
    if (token) {
        try {
            const payload: any = verifyToken(token);
            if (payload) {
                const users: IUser[] = await findByIdService(payload.id);
                if (!users || users.length === 0) return res.status(404).json("No user found.")
                res.status(200).json({success:true, token: token, details: users[0]})
            }
            else
                res.status(404).json({message: "unauthorized"})
        } catch (err) {
            logger.error(err);
            res.status(404).json({message: err});
        }
        

    } else {
        res.status(404).json({message: "unauthorized"})
    }

}


export const logout: RequestHandler = (req: Request, res: Response) => {
    const { signedCookies = {}} = req;
    const {token} = signedCookies;
    console.log("Logut:"+ token);
    //var token = req.headers["x-access-token"] as string;
    res.clearCookie("token", COOKIE_OPTIONS);
    res.status(200).json({success:true});
}