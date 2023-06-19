import {Request, Response} from 'express';
import Logger from '../logging/logger';
import TravianClient from '../travian/TravianClient';
import Tribe from '../travian/model/Tribe';
import Teuton from '../travian/model/Teuton';
import TravianService from '../travian/TravianService';
import CrawlerService from '../crawler/Crawler';

class CropFinderController {
    private travianService: TravianService;

    constructor(crawler: CrawlerService) {
        this.travianService = new TravianService(crawler);
    }

    public async home(req: Request, res: Response) : Promise<void> {
        Logger.info('Initializing done, reading data now...');
        const troopDistribution = await this.travianService.readTroopDetails();
        Logger.info("Rendering map dashboard");
        return res.render('pages/crop-finder');
    }
}

export default CropFinderController;