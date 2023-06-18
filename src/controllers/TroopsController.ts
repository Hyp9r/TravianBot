import {Request, Response} from 'express';
import Logger from '../logging/logger';
import TravianClient from '../travian/TravianClient';

class TroopsController {
    private client: TravianClient;

    constructor() {
        this.client = new TravianClient();
    }

    public static async dashboard(req: Request, res: Response) : Promise<void> {
        const client = new TravianClient();
        await client.initialize();
        Logger.info('Initializing done, reading data now...');
        const data = await client.readTroopCount();
        Logger.info("Data:" + data);
        Logger.info("Rendering troops dashboard");
        console.log(data);
        return res.render('pages/troops');
    }
}

export default TroopsController;