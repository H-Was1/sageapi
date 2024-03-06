import { scrapeAqi, scrapeWeather } from "../scraper";
import City from "../model/cities";
import connectToDB from "../mongoose";
import { generateEmailBody, sendEmail } from "../NodeMailer";

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

    for (const city of cities) {
      const aqi = await scrapeAqi(city.aqiUrl);
      const weather = await scrapeWeather(city.weatherUrl);
      await City.findByIdAndUpdate(
        { _id: city._id },
        { $set: { aqiData: aqi, weatherData: weather } }
      );
    }
    return 1;
  } catch (error) {
    console.error("ERROR: updating daily data- " + error.message);
    return null;
  }
}
// export async function updateAll() {
//   try {
//     const cities = await getAllCities();

//     await scrapeAqi(cities[0].aqiUrl);

//     return 1;
//   } catch (error) {
//     console.error("ERROR: updating daily data- " + error.message);
//   }
// }
export async function sendAll() {
  try {
    const cities = await getAllCities();

    for (const city of cities) {
      const emails = city.emails;
      if (emails.length > 0) {
        const body = await generateEmailBody(city, "Data");
        await sendEmail(body, emails);
      }
    }
    return 1;
  } catch (error) {
    console.error("ERROR: sending Emails " + error.message);
    return null;
  }
}

export async function subscribe(city: string, email: string) {
  try {
    const document = await getCity(city);
    const emailPresent = document.emails.includes(email);
    if (emailPresent) return undefined as undefined;

    await City.updateOne({ name: city }, { $push: { emails: email } });
    const data = await generateEmailBody(document, "Welcome");
    sendEmail(data, [email]);
    return 1;
  } catch (error) {
    console.error("ERROR: Adding Email " + error.message);
  }
}

export async function unsubscribe(email: string) {
  try {
    connectToDB();
    await City.updateMany({}, { $pull: { emails: email } });
    return 1;
  } catch (error) {
    console.error("Removing Email " + error);
  }
}

// for testing purposes

//
// export async function createCity(
//   city: string,
//   aqi: string,
//   weather: string
// ): Promise<any> {
//   const document = await getCity( city:string, aqiUrl:strin, weatherUrl );
//   if (document) return null;
//   const aqi = await scrapeAqi(aqiUrl);
//   const weather = await scrapeWeather(weatherUrl);
// }

//
