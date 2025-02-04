const {request} = require('playwright');
const assert = require('node:assert');

class Requests {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.context = null;
    this.defaultHeaders = {
      'content-type': 'application/json',
      'Cookie': 'auth=-1737203168;'
    };
  }

  async init() {
    this.context = await request.newContext({
      baseURL: this.baseUrl,
    })}

  mergeHeaders(customHeaders) {
    return {
      ...this.defaultHeaders,
      ...customHeaders,
    };
  }

  async delete(path, params= {}, headers = {}) {
    if (!this.context) {
      await this.init();
    }
    const mergedHeaders = this.mergeHeaders(headers);
    const queryString = new URLSearchParams(params).toString();
    const fullPath = queryString ? `${path}?${queryString}` : path;

    const response = await this.context.delete(fullPath, {
      headers: mergedHeaders,
    });
    assert(response.ok(), `Request Failed: ${response.status()} ${response.statusText()}`);
    return response;

  }

  async post(path, params= {}, headers = {}) {
    if (!this.context) {
      await this.init();
    }
    const mergedHeaders = this.mergeHeaders(headers);
    const queryString = new URLSearchParams(params).toString();
    const fullPath = queryString ? `${path}?${queryString}` : path;

    const response = await this.context.post(fullPath, {
      headers: mergedHeaders,
    });
    assert(response.ok(), `Request Failed: ${response.status()} ${response.statusText()}`);
    return response;

  }
}

module.exports = new Requests('https://www.kookapp.cn');

// (async () => {
//   const api = require('./Requests');
//   const data = await api.delete('/api/v2/users/guild/9270012507496003');
//   console.log('DELETE Response:', data);
// })();
