import express, { Request, Response } from "express"
import { getDashboard } from "./controllers/dashboard";

const app = express()

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.get('/', getDashboard);

app.listen(4000, () => console.log("listening on port 4000"));