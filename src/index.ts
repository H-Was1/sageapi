import connectToDB from "./lib/mongoose";
import { getAllCities, getCityByName } from "./lib/actions";
import { scrapeAqi, scrapeWeather } from "./lib/scraper";
import { arr } from "./constants";
const array = [];
(async function () {
  // const cities = await getAllCities();
  const cities = arr;

  for (const city of cities) {
    const aqi = await scrapeAqi(city.aqiUrl);
    const weather = await scrapeWeather(city.weatherUrl);
    const newcity = {
      name: city.name,
      weatherUrl: city.weatherUrl,
      aqiUrl: city.aqiUrl,
      aqiData: aqi,
      weatherData: weather,
      emails: [] as string[],
    };
    array.push(newcity);
  }
  console.log(array);
})();
