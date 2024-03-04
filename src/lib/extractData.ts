import * as cheerio from "cheerio";
const aqiDataSelectors = {
  quality: {
    index:
      "#current > div > div > div.content-wrapper > div.particle-chart > div > div > div > div.aq-number",
    scale:
      "#current > div > div > div.content-wrapper > div.air-quality-data-wrapper > h3 > p.category-text",
    description:
      "#current > div > div > div.content-wrapper > div.air-quality-data-wrapper > h3 > p.statement",
  },
  pollutants: {
    NO2: {
      value:
        "#pollutants > div:nth-child(1) > div.column.desktop-left > div.pollutant-index",
      description: "#pollutants > div:nth-child(1) > h4 > div > div.statement",
      conclusion: "#pollutants > div:nth-child(1) > h3 > div.category",
    },
    ["PM2.5"]: {
      value:
        "#pollutants > div:nth-child(2) > div.column.desktop-left > div.pollutant-index",
      description: "#pollutants > div:nth-child(2) > h4 > div > div.statement",
      conclusion: "#pollutants > div:nth-child(2) > h3 > div.category",
    },
    PM10: {
      value:
        "#pollutants > div:nth-child(3) > div.column.desktop-left > div.pollutant-index",
      description: "#pollutants > div:nth-child(3) > h4 > div > div.statement",
      conclusion: "#pollutants > div:nth-child(3) > h3 > div.category",
    },
    O3: {
      value:
        "#pollutants > div:nth-child(4) > div.column.desktop-left > div.pollutant-index",
      description: "#pollutants > div:nth-child(4) > h4 > div > div.statement",
      conclusion: "#pollutants > div:nth-child(4) > h3 > div.category",
    },
  },
};
const weatherDataSelectors = {
  today:
    "body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div.today-forecast-card.content-module > a > div.body > div:nth-child(1) > p",
  tonight:
    "body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div.today-forecast-card.content-module > a > div.body > div:nth-child(2) > p",
  current: {
    temperature:
      "body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.lbar-panel.content-module > div.cur-con-weather-card__body > div:nth-child(1) > div.forecast-container > div > div.temp",
    weather:
      "body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.lbar-panel.content-module > div.cur-con-weather-card__body > div:nth-child(1) > div:nth-child(2) > span.phrase",
  },
  wind: "body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.lbar-panel.content-module > div.cur-con-weather-card__body > div.cur-con-weather-card__panel.details-container > div:nth-child(2) > span.value",
  collectionTime:
    "body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.lbar-panel.content-module > div.title-container > p",
};

export async function extractWeather(data: string) {
  const $ = cheerio.load(data);
  const $today = $(weatherDataSelectors.today)
    .text()
    .replace(/\t/g, "")
    .replace(/\n/g, "")
    .replace(/Hi.*$/, "");
  const $tonight = $(weatherDataSelectors.tonight)
    .text()
    .replace(/\t/g, "")
    .replace(/\n/g, "")
    .replace(/Lo.*$/, "")
    .replace("Tonight:", "");

  const $temperature = $(weatherDataSelectors.current.temperature).text();
  const $weather = $(weatherDataSelectors.current.weather).text();
  const $wind = $(weatherDataSelectors.wind).text();
  const $collectionTime = $(weatherDataSelectors.collectionTime).text().trim();
  const weatherData = {
    today: $today,
    tonight: $tonight,
    current: {
      temperature: $temperature,
      weather: $weather,
    },
    wind: $wind,
    collectionTime: $collectionTime,
  };
  return weatherData;
}
export async function extractAqi(data: string) {
  const $ = cheerio.load(data);
  const $scale = $(aqiDataSelectors.quality.scale).text();
  const $description = $(aqiDataSelectors.quality.description).text().trim();
  const $index = $(aqiDataSelectors.quality.index).text().match(/\d+/)[0];
  //NO2

  //

  const $no2Value = $(aqiDataSelectors.pollutants.NO2.value).text();
  const $no2description = $(aqiDataSelectors.pollutants.NO2.description)
    .text()
    .replace(/\t/g, "")
    .replace(/\n/g, "")
    .replace("   ", "");
  const $no2conclusion = $(aqiDataSelectors.pollutants.NO2.conclusion).text();
  //PM2.5

  //

  const $pm2Value = $(aqiDataSelectors.pollutants["PM2.5"].value).text();
  const $pm2description = $(aqiDataSelectors.pollutants["PM2.5"].description)
    .text()
    .replace(/\t/g, "")
    .replace(/\n/g, "")
    .replace("   ", "");
  const $pm2conclusion = $(
    aqiDataSelectors.pollutants["PM2.5"].conclusion
  ).text();
  //PM10

  //

  const $pm10Value = $(aqiDataSelectors.pollutants.PM10.value).text();
  const $pm10description = $(aqiDataSelectors.pollutants.PM10.description)
    .text()
    .replace(/\t/g, "")
    .replace(/\n/g, "")
    .replace("   ", "");
  const $pm10conclusion = $(aqiDataSelectors.pollutants.PM10.conclusion).text();
  //O3

  //

  const $o3Value = $(aqiDataSelectors.pollutants.O3.value).text();
  const $o3description = $(aqiDataSelectors.pollutants.O3.description)
    .text()
    .replace(/\t/g, "")
    .replace(/\n/g, "")
    .replace("   ", "");
  const $o3conclusion = $(aqiDataSelectors.pollutants.O3.conclusion).text();
  //Data

  //

  const aqiData = {
    quality: { scale: $scale, index: $index, description: $description },
    pollutants: {
      no2: {
        value: $no2Value,
        description: $no2description,
        conclusion: $no2conclusion,
      },
      ["pm2.5"]: {
        value: $pm2Value,
        description: $pm2description,
        conclusion: $pm2conclusion,
      },
      pm10: {
        value: $pm10Value,
        description: $pm10description,
        conclusion: $pm10conclusion,
      },
      o3: {
        value: $o3Value,
        description: $o3description,
        conclusion: $o3conclusion,
      },
    },
  };
  return aqiData;
}
