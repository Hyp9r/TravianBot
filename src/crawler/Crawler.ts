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

    async locateElement(selector : string): Promise<void> {
        if (!this.page) {
            throw new Error('Page is not initialized');
        }
        const element = await this.page.waitForSelector(selector);
        const tableElement = await element?.$('table');
        const tableData = await this.page.evaluate((table) => {
            const rows = table?.querySelectorAll('tr');
            const data = [];
            if (rows === undefined) {
                return [];
            }
            for (const row of rows) {
                const columns = row.querySelectorAll('td');
                const rowData = [];
        
                for (const column of columns) {
                    const columnContent = column.textContent;
                  rowData.push(columnContent?.trim());
                }
          
                data.push(rowData);
              }
            return data;
        }, tableElement);
        console.log(tableData);
    }

    async readPageData(): Promise<string> {
        if (!this.page) {
            throw new Error('Page is not initialized');
        }
        const pageContent = await this.page.content();
        return pageContent;
    }

    async postRequest(payload: string) {
        if (!this.page) {
            throw new Error('Page is not initialized');
        }
        await this.page.setRequestInterception(true);

        this.page.once('request', request => {
            var data = {
                'method': 'POST',
                'postData': payload,
                'headers': {
                    ...request.headers(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
        };

        request.continue(data);

        // Immediately disable setRequestInterception, or all other requests will hang
        if (!this.page) {
            throw new Error('Page is not initialized');
        }
        this.page.setRequestInterception(false);
});
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