const { _electron: electron } = require('playwright');

class Driver {
    constructor() {
        this.app = null;
        this.page = null;
        this.isIninitialized = false;
    }

    async init() {
        if (this.isIninitialized) {
            console.log("already inited, skipping");
        }
        this.app = await electron.launch({
            executablePath: 'C:\\Users\\wyx07\\AppData\\Local\\KOOK\\app-0.90.1\\KOOK.exe',
            args: ['--remote-debugging-port=9222']
        });
        this.page = await this.app.firstWindow();
        await this.page.waitForLoadState('load');
        this.isIninitialized = true;
        console.log('Driver initialized successfully.')
    }

    async close() {
        if (this.app) {
            await this.app.close();
            this.app = null;
            this.page = null;
            this.isIninitialized = false;
            console.log('Driver closed.')
        }
    }
}

module.exports = new Driver();