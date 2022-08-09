import { CookieOptions } from "express";
import jwt from "jsonwebtoken";
const dev = process.env.NODE_ENV !== "production";


export const COOKIE_OPTIONS:CookieOptions = {
    httpOnly: true,
    secure: !dev,
    signed: true,
    maxAge: 25920000*1000,
};


export const getToken = (userId: {id: number | string}):string => {
    //return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: eval(process.env.SESSION_EXPIRY)})
    return jwt.sign(userId, process.env.SECRET, {expiresIn: eval(process.env.TOKEN_EXPIRE)});
};

// export const getRefreshToken = (userId: {id: number}):string => {
//     //return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY)})
//     return jwt.sign(userId, process.env.SECRET, {expiresIn: eval(process.env.TOKEN_EXPIRE)});
// };

export const verifyToken = (token: string):string | jwt.JwtPayload => {
    return jwt.verify(token, process.env.SECRET);
}

