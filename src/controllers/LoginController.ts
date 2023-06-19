import {Request, Response} from 'express';
import Logger from '../logging/logger';
import TravianClient from '../travian/TravianClient';
import Tribe from '../travian/model/Tribe';
import Teuton from '../travian/model/Teuton';
import TravianService from '../travian/TravianService';
import CrawlerService from '../crawler/Crawler';

class LoginController {
    private travianService: TravianService;

    constructor(crawler: CrawlerService) {
        this.travianService = new TravianService(crawler);
    }

    public async login(req: Request, res: Response): Promise<void> {
        Logger.info('Login endpoint...');
        const payload = req.body;
        const login: Login = JSON.parse(payload);
        await this.travianService.login(login.username, login.password);
        Logger.info("Logged in");
        return res.render('pages/home');
    }
}

export default LoginController;