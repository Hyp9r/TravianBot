import CrawlerService from "../crawler/Crawler";
import Login from "./model/Login";
import TroopDistribution from "./model/TroopDistribution";

class TravianClient {
    private crawler: CrawlerService;

    constructor(crawler: CrawlerService) {
        this.crawler = crawler;
    }

    async readTroopCount(): Promise<TroopDistribution> {
        await this.crawler.navigateTo('https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_TypeScript');
        const data = await this.crawler.locateElement('figure');
        const troops:TroopDistribution = {troops: [5300, 0, 1, 0, 30, 451, 0, 233, 0, 0], total: 6015};
        return troops;
    }

    async login(username:string, password:string): Promise<void> {
        const login: Login = {
            gameworld: {
                uuid: '803b5800-f00c-11ed-6409-000000000000',
                domain: 'international',
                region: 'international',
                name: 'International 9',
                url: 'https://ts9.x1.international.travian.com/',
                registrationClosed: false,
                registrationKeyRequired: false,
                hidden: false,
                start: 1683817200,
                end: null,
                mainpageBackground: '',
                subtitle: '',
                speed: '1',
                mainpageGroups: ["international","com","us","nz","uk","au","mx","ar","cl","br","ae","eg","sa","arabia","id","my","vn","hk","tw","jp","ba","bg","hr","rs","si","ee","il","gr","hu","it","lt","lv","pl","ro","cz","sk","fr","de","es","pt","dk","fi","nl","no","se","ru","tr"],
            },
            username: 'Hellow',
            password: '1234567890',
            w: '1920:1080',
        };
        const payload = JSON.stringify(login);
        console.log(payload);
        
        await this.crawler.navigateTo('https://www.travian.com/international/gameworld/login');
    }
}

export default TravianClient;