import Logger from "../../logging/logger";
import { Request, Response } from 'express';
import Login from "../model/Login";

class AuthenticationController {
    private authenticationService: AuthenticationService;

    constructor(authService: AuthenticationService) {
        this.authenticationService = authService;
    }

    public async loginPage(req: Request, res: Response): Promise<void> {
        Logger.info('Log in page...');
        return res.render('pages/login');
    }

    public async registerPage(req: Request, res: Response): Promise<void> {
        Logger.info('Register page...');
        return res.render('pages/register');
    }

    public async login(req: Request, res: Response): Promise<void> {
        Logger.info('Login endpoint...');
        const payload = req.body;
        const login: Login = JSON.parse(payload);
        Logger.info("Logged in");
        return res.render('pages/home');
    }
}

export default AuthenticationController;