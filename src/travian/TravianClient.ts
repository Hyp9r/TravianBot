import CrawlerService from "../crawler/Crawler";

class TravianClient {
    private crawler: CrawlerService;

    constructor() {
        this.crawler = new CrawlerService();
    }

    async initialize(): Promise<void> {
        await this.crawler.initialize();
    }

    async readTroopCount(): Promise<string> {
        await this.crawler.navigateTo('https://pptr.dev/guides/configuration');
        const data = await this.crawler.readPageData();
        return data;
    }

    async login(): Promise<void> {
        await this.crawler.navigateTo('https://www.travian.com/international/gameworld/login')
    }
}

export default TravianClient;