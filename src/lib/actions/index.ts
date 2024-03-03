import { scrapeAqi, scrapeWeather } from "../scraper";
import City from "../model/cities";
import connectToDB from "../mongoose";

export async function getAllCities() {
  connectToDB();
  const cities = await City.find({});
  return cities;
}

export async function getCity(name: string) {
  connectToDB();
  try {
    const city = await City.findOne({ name });

    if (city === null) throw new Error("City is unavailable at right now");
    return city;
  } catch (error) {
    console.error(error);
  }
}
export async function updateAll() {
  try {
    const cities = await getAllCities();
    let i = 1;
    for (const city of cities) {
      const aqi = await scrapeAqi(city.aqiUrl);
      const weather = await scrapeWeather(city.weatherUrl);
      await City.findByIdAndUpdate(
        { _id: city._id },
        { $set: { aqiData: aqi, weatherData: weather } }
      );
      // console.log(`${i} : done`);
    }
  } catch (error) {
    console.error("ERROR: updating daily data- " + error.message);
  }
}
export async function addEmail(city: string, email: string) {
  try {
    const document = await getCity(city);
    const emailPresent = document.emails.includes(email);
    if (emailPresent) throw new Error("Email already exists");
    await City.updateOne({ name: city }, { $push: { emails: email } });
  } catch (error) {
    console.error("ERROR: Adding Email " + error.message);
  }
}
export async function unsub(email: string) {
  try {
    connectToDB();
    await City.updateMany({}, { $pull: { emails: email } });
  } catch (error) {
    console.error("Removing Email " + error);
  }
}
