import CrawlerService from "./crawler/Crawler";
import TravianClient from "./travian/TravianClient";
import express, {Request, Response } from 'express';
import TravianService from "./travian/TravianService";
import TroopsController from "./controllers/TroopsController";
import Logger from "./logging/logger";
import CropFinderController from "./controllers/CropFinderController";
import LoginController from "./controllers/LoginController";
import HomeController from "./controllers/HomeController";

class App {
    private express: express.Application;
    private crawler: CrawlerService;
    private travianService: TravianService;

    constructor() {
        Logger.info('Constructing application...');
        this.express = express();
        Logger.info('Express configured...');
    }

    public setupExpressContext() : void {
        Logger.info('Setting up express render engine...');
        this.express.set('view engine', 'ejs');
        this.express.set('views', __dirname + '/views');
        this.express.use(express.static('public'));
        this.express.use(express.static('node_modules'));
    }

    public async initialize() : Promise<void> {
        this.crawler = new CrawlerService();
        await this.crawler.initialize();
        this.travianService = new TravianService(this.crawler);
        this.configureRoutes();
    }

    private configureRoutes() {
        Logger.info('Configuring routes...');
        const troopController = new TroopsController(this.crawler);
        const cropFinderController = new CropFinderController(this.crawler);
        const loginController = new LoginController(this.crawler);
        const homeController = new HomeController();
        this.express.get('/troop-dashboard', async (req: Request, res: Response) => {
            await troopController.dashboard(req, res);
        });
        this.express.get('/sign-in', async (req: Request, res: Response) => {
            await homeController.signin(req, res);
        });
        this.express.post('/login', async (req: Request, res: Response) => {
            await loginController.login(req, res);
        });
        this.express.get('/crop-finder', async (req: Request, res: Response) => {
            await cropFinderController.home(req, res);
        });
    }

    public start() : void {
        this.express.listen(4000, () => console.log("listening on port 4000"));
    }
}

export default App;