import {Request, Response} from 'express';
import Logger from '../logging/logger';

export const getDashboard = (req: Request, res: Response): void => {
    Logger.info("Rendering dashboard");
    return res.render('pages/dashboard');
};