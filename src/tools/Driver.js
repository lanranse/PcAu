const { _electron: electron } = require('playwright');
const os = require('os');
const path = require('path');

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
        let homeDir = os.homedir();
        let appPath = path.join(homeDir, 'AppData', 'Local', 'KOOK', 'app-0.91.3', 'KOOK.exe');
        this.app = await electron.launch({
            executablePath: appPath,
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