const axios = require("axios");

class ApiClient {
  constructor() {
    const client = axios.create({
      baseURL: process.env.CB_API_BASE_URL || "http://localhost:8000",
    });

    client.interceptors.response.use((resp) => {
      return resp.data;
    });

    this.client = client;
  }

  async upsertStat(data) {
    return await this.client.post("stats", data);
  }

  /*async upsertLocalStats(data) {
    return await this.client.post('localstat', data);
  }*/

 // async upsertLocalStat(data) {
 //   return await this.client.post('stats', data);
 // }

  async findAllStat() {
    return await this.client.get("stats");
  }
  /*
  async findKeyValue(key) {
    return await this.client.get(`key-value/${key}`);
  }

  async findLocalStats(key) {
    return await this.client.get(`local-stats/${key}`);
  }*/
  /*async findLocalStats() {
    return await this.client.get(`localstat`);
  }*/
}

module.exports = ApiClient;
