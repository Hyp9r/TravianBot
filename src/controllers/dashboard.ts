import {Request, Response} from 'express';

export const getDashboard = (req: Request, res: Response): Response => {
    return res.json({
        status: "success",
    });
};