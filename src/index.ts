import express, { Request, Response } from "express"
import { getDashboard } from "./controllers/dashboard";
import TroopsController from "./controllers/TroopsController";

const app = express()

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.get('/', getDashboard);
app.get('/troop-dashboard', async (req: Request, res: Response) => {
    await TroopsController.dashboard(req, res);
});

app.listen(4000, () => console.log("listening on port 4000"));