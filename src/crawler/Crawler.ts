import puppeteer, { Browser,Page } from "puppeteer";
import Logger from "../logging/logger";

class CrawlerService {
    private browser: Browser | null;
    private page: Page | null;

    constructor() {
        this.browser = null;
        this.page = null;
    }

    async initialize() :Promise<void>{
        Logger.info('Initializing puppeteer');
        this.browser = await puppeteer.launch({
            headless: true,
            executablePath: '/usr/bin/google-chrome-stable',
            args: [
                "--disable-gpu",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--headler=new",
            ],
            timeout: 10000,
        });
        this.page = await this.browser.newPage();
    }

    async navigateTo(url: string): Promise<void> {
        if (!this.page) {
            throw new Error('Page is not initialized');
        }
        await this.page.goto(url);
    }

    async close(): Promise<void> {
        if(this.browser) {
            await this.browser.close();
        }
    }

    async readPageData(): Promise<string> {
        if (!this.page) {
            throw new Error('Page is not initialized');
        }
        const pageContent = await this.page.content();
        return pageContent;
    }

    async performPostRequest(url: string, jsonData: Record<string, any>): Promise<void> {
        if (!this.page) {
          throw new Error('Page is not initialized');
        }
        await this.page.evaluate(async (url, jsonData) => {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
          });
    
          // You can handle the response here if needed
          // For example, you can check the response status code or parse the JSON response
          console.log(response.status);
          const result = await response.json();
          console.log(result);
        }, url, jsonData);
    }
}

export default CrawlerService;