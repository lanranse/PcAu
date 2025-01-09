const {defineConfig} = require('playwright/test');

module.exports = defineConfig({
  reporter: [['html', { open: 'always' }]],
  testDir: './src/tests',
  forbidOnly: true,
  use: {
    screenshot: 'only-on-failure', // 捕获失败时的截图
  },
});
