import CrawlerService from "../crawler/Crawler";
import TravianClient from "./TravianClient";
import TroopDistribution from "./model/TroopDistribution";

class TravianService {
    private client: TravianClient;

    constructor(crawler: CrawlerService) {
        this.client = new TravianClient(crawler);
    }

    async readTroopDetails() : Promise<TroopDistribution>{
        const troops = await this.client.readTroopCount();
        return troops;
    }

    async login(username:string, password:string): Promise<void> {
        await this.client.login(username, password);
    }
}

export default TravianService;