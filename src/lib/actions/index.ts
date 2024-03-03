import City from "../model/cities";
import connectToDB from "../mongoose";

export async function getAllCities() {
  connectToDB();
  const cities = await City.find({});
  return cities;
}
export async function updateCityById(id: string, data: any) {
  connectToDB();
  
}
export async function getCityByName(name: string) {
  connectToDB();
  try {
    const city = await City.findOne({ name });

    if (city === null)
      throw new Error(
        "City name is not correct or is unavailable at this time"
      );
    return city;
  } catch (error) {
    console.error(error);
  }
}
