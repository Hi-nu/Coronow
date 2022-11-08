const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const { format, utcToZonedTime } = require("date-fns-tz");
const StatCrawler = require("./stat-crawler");

async function crawlAndUpdateStat(outputPath, apiClient) {
  let prevData = {};
  const domesticStatPath = path.join(outputPath, "stat.json");
  try {
    
    prevData = JSON.parse(fs.readFileSync(domesticStatPath, "utf-8"));
  } catch (e) {
    console.log("previous Stat not found");
  }

  const statCrawler = new StatCrawler();

  
  const now = new Date();
  const timeZone = "Asia/Seoul";
  const crawledDate = format(utcToZonedTime(now, timeZone), "yyyy-MM-dd");

  const newData = {
    crawledDate,
    domesticStat: await statCrawler.crawlStat(),
  };

  
  if (_.isEqual(newData, prevData)) {
    console.log("Stat has not been changed");
    return;
  }

  // 크롤링 된 최신 값을 파일에 저장해 둠
  fs.writeFileSync(domesticStatPath, JSON.stringify(newData));

  const newDomesticStat = newData.domesticStat;
  const { confirmed } = newDomesticStat.basicStats;
  const { prev_confirmed } = newDomesticStat.basicStats;
  const { prev_confirmed1 } = newDomesticStat.basicStats;
  const { prev_confirmed2 } = newDomesticStat.basicStats;
  const { prev_confirmed3 } = newDomesticStat.basicStats;
  const { prev_confirmed4 } = newDomesticStat.basicStats;
  const { prev_confirmed5 } = newDomesticStat.basicStats;
  const { hospital } = newDomesticStat.basicStats1;
  const { prev_hospital } = newDomesticStat.basicStats1;
  const { critical } = newDomesticStat.basicStats2;
  const { prev_critical } = newDomesticStat.basicStats2;
  const { death } = newDomesticStat.basicStats3;
  const { prev_death } = newDomesticStat.basicStats3;

  await apiClient.upsertStat({
    date: crawledDate,
    confirmed,
    death,
    hospital,
    critical,
    prev_confirmed,
    prev_confirmed1,
    prev_confirmed2,
    prev_confirmed3,
    prev_confirmed4,
    prev_confirmed5,
    prev_death,
    prev_hospital,
    prev_critical,
  });

  console.log("domesticStat updated successfully");
}

module.exports = { crawlAndUpdateStat };
