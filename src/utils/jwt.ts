import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'

interface TokenPayload {
    _id: any;
    email: string;
    role: string;
}


export const createAccessToken = async (res: Response , payload: TokenPayload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
        expiresIn: '30m',
        algorithm: 'HS256'
    });
    res.cookie('accessToken', accessToken, { 
        httpOnly: true,
        secure: false,
        maxAge: 30 * 60 * 1000, // 30 mins
        sameSite: 'strict',
        path: '/'
    });
    return accessToken
}

export const createRefreshToken = async (res: Response , payload: TokenPayload) => {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: "10d",
        algorithm: 'HS256'
    });
    res.cookie('refreshToken', refreshToken, { 
        httpOnly: true,
        secure: false,
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
        sameSite: 'strict',
        path: '/'
    });
}

export const clearRefreshToken = (res: Response) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/'
    });
};

export const clearAccessToken = (res: Response) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/'
    });
};


export const decodeToken = async(req: Request): Promise<any> => {
    const token = req.cookies?.refreshToken;
    return jwt.decode(token);
}
