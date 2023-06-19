import {Request, Response} from 'express';
import Logger from '../logging/logger';
import TravianService from '../travian/TravianService';
import CrawlerService from '../crawler/Crawler';

class HomeController {
    constructor() {
    }

    public async home(req: Request, res: Response) : Promise<void> {
        Logger.info('Initializing done, reading data now...');
        Logger.info("Rendering map dashboard");
        return res.render('pages/dashboard');
    }

    public async signin(req: Request, res: Response) : Promise<void> {
        Logger.info('Sign in page...');
        return res.render('pages/signin');
    }
}

export default HomeController;