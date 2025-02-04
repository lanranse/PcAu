const { _electron: electron } = require('playwright');
const os = require('os');
const path = require('path');

class Driver {
    constructor() {
        this.app = null;
        this.page = null;
        this.isIninitialized = false;
        this.cookies = null;
        this.logStream = null; // 用于写入日志的文件流
    }

    async init() {
        if (this.isIninitialized) {
            console.log("already inited, skipping");
        }

        // 初始化日志文件
        const logFilePath = path.join(os.homedir(), 'electron_requests.log');
        this.logStream = fs.createWriteStream(logFilePath, { flags: 'a' }); // 追加模式
        this.logStream.write(`[${new Date().toISOString()}] Logging started\n`);

        let homeDir = os.homedir();
        let appPath = path.join(homeDir, 'AppData', 'Local', 'KOOK', 'app-0.91.4', 'KOOK.exe');
        this.app = await electron.launch({
            executablePath: appPath,
            args: ['--remote-debugging-port=9222']
        });
        this.page = await this.app.firstWindow();
        await this.page.waitForLoadState('load');
        this.isIninitialized = true;
        // this.cookies = await this.page.context().cookies();  Fail
        // this.cookies = await this.page.evaluate(() => window.electronCookies);

        console.log(this.cookies)
        console.log('Driver initialized successfully.')
    }

    _setupRequestLogging() {
        this.page.on('request', async (request) => {
            const url = request.url();
            const method = request.method();
            const contentType = request.headers['content-type'];

            // 只记录 HTTPS 请求
            if (contentType.includes('application/json')) {
                const logEntry = `[${new Date().toISOString()}] ${method} ${url}\n`;
                this.logStream.write(logEntry); // 写入日志文件
            }
        });

        this.page.on('response', async (response) => {
            const url = response.url();
            const status = response.status();

            // 只记录 HTTPS 请求的响应
            if (url.startsWith('https://')) {
                const logEntry = `[${new Date().toISOString()}] Response: ${status} ${url}\n`;
                this.logStream.write(logEntry); // 写入日志文件
            }
        });
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