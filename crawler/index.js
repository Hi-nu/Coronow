const path = require("path");
const fs = require("fs");

const ApiClient = require("./api-client");
const { crawlAndUpdateStat } = require("./stat-updater");
//const { crawlAndUpdateDomestic2 } = require('./location-updater');
//const { crawlAndUpdateLocalStat } = require('./local-updater');

async function main() {
  const outputPath = path.join(process.cwd(), "output");

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  const apiClient = new ApiClient();

  try {
    console.log("crawlAndUpdateStat started");
    await crawlAndUpdateStat(outputPath, apiClient);
    //await crawlAndUpdateDomestic2(outputPath, apiClient);
    //await crawlAndUpdateLocalStat(outputPath, apiClient);
  } catch (e) {
    console.error("crawlAndUpdateStat failed", e);
  }
}

main();
