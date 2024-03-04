const puppeteerExtra = require("puppeteer-extra");
const Stealth = require("puppeteer-extra-plugin-stealth");
import { Page } from "puppeteer";
import { extractAqi, extractWeather } from "./extractData";

puppeteerExtra.use(Stealth());

const presets = {
  viewport: {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  },
  geo: { latitude: 51.1657, longitude: 10.4515 },
  useragents:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
};

export const scrapeWeather = async (weatherUrl: string) => {
  const browser = await puppeteerExtra.launch({
    // headless: false,
  });
  const Page = await browser.newPage();
  await Page.setGeolocation(presets.geo);
  await Page.setUserAgent(presets.useragents);
  await Page.setDefaultNavigationTimeout(0);
  await Page.goto(weatherUrl);
  const Content = await Page.content();
  await browser.close();

  const data = await extractWeather(Content);
  return data;
};

export const scrapeAqi = async (aqiUrl: string) => {
  const browser = await puppeteerExtra.launch({
    // headless: false,
  });
  const Page = await browser.newPage();
  await Page.setGeolocation(presets.geo);
  await Page.setUserAgent(presets.useragents);
  await Page.setDefaultNavigationTimeout(0);
  await Page.setDefaultNavigationTimeout(0);
  await Page.goto(aqiUrl);
  const Content = await Page.content();

  await browser.close();

  const data = await extractAqi(Content);
  return data;
};
