import {Request, Response} from 'express';
import Logger from '../logging/logger';
import TravianClient from '../travian/TravianClient';
import Tribe from '../travian/model/Tribe';
import Teuton from '../travian/model/Teuton';
import TravianService from '../travian/TravianService';
import CrawlerService from '../crawler/Crawler';

class TroopsController {
    private travianService: TravianService;

    constructor(crawler: CrawlerService) {
        this.travianService = new TravianService(crawler);
    }

    public async dashboard(req: Request, res: Response) : Promise<void> {
        Logger.info('Initializing done, reading data now...');
        const troopDistribution = await this.travianService.readTroopDetails();
        Logger.info("Rendering troops dashboard");
        return res.render('pages/troops', {
            tribe: Tribe.Teutons,
            tribeTroops: Object.values(Teuton),
            troops: troopDistribution.troops,
            total: troopDistribution.total,
        });
    }

    public async login(req: Request, res: Response) : Promise<Response> {
        Logger.info('Login handler');
        const username = 'Hellow';
        const password = '1234567890';
        const troopDistribution = await this.travianService.login(username, password);
        Logger.info("Rendering troops dashboard");
        return res.json({
            message: 'loggedin'
        });
    }
}

export default TroopsController;