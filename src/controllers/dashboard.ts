import {Request, Response} from 'express';

export const getDashboard = (req: Request, res: Response): void => {
    return res.render('pages/index');
};