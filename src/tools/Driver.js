const { _electron: electron } = require('playwright');
const os = require('os');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

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
        let appPath = path.join(homeDir, 'AppData', 'Local', 'KOOK', 'app-0.92.0', 'KOOK.exe');
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
        this._setupRequestLogging();
        console.log('Driver initialized successfully.')
    }

    _setupRequestLogging() {
        // 记录xhs请求的 请求和响应结果 到日志
        const requestMap = new Map();

        this.page.on('request', async (request) => {
            const requestId = uuidv4();
            const url = request.url();
            const method = request.method();
            const contentType = request.headers()['content-type'] || '';
            // 只记录 XHS 请求
            if (contentType.includes('application/json')) {
                const logEntry = `[${new Date().toISOString()}] Request: ${requestId} ${method} ${url}\n`;
                this.logStream.write(logEntry); // 写入日志文件
                requestMap.set(request, requestId)

            }
        });

        this.page.on('response', async (response) => {
            const url = response.url();
            const status = response.status();
            const request = response.request();
            const res_contentType = response.headers()['content-type'] || '';
            const requestId = requestMap.get(request);
            // 只记录 XHS 请求
            if (res_contentType.includes('application/json')) {
                try {
                    const res_text = await response.text(); // 获取响应体文本
                    const logEntry = `[${new Date().toISOString()}] Response: ${requestId} ${status} ${url}\nBody: ${res_text}\n`;
                    this.logStream.write(logEntry); // 写入日志文件
                } catch (error) {
                    console.error(`无法获取响应体: ${url}`, error);
                    const logEntry = `[${new Date().toISOString()}] Response: ${requestId} ${status} ${url}\n[无法获取响应体]\n`;
                    this.logStream.write(logEntry); // 写入日志文件
                }
                requestMap.delete(request); // 清理已处理的请求
            }
        });
    }

    async close() {
        if (this.app) {
            // 关闭日志文件流
            if (this.logStream) {
                this.logStream.write(`[${new Date().toISOString()}] Logging stopped\n`);
                this.logStream.end();
                this.logStream = null;
            }
            // 关闭 Electron 应用
            await this.app.close();
            this.app = null;
            this.page = null;
            this.isIninitialized = false;
            console.log('Driver closed.')
        }
    }
}

module.exports = new Driver();