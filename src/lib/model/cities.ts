import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    weatherUrl: { type: String, required: true, unique: true },
    aqiUrl: { type: String, required: true, unique: true },
    emails: [{ type: String, required: true, unique: true }],
    aqiData: {
      quality: {
        scale: { type: String, required: true },
        index: { type: String, required: true },
        description: { type: String, required: true },
      },
      pollutants: {
        no2: {
          value: { type: String, required: true },
          description: { type: String, required: true },
          conclusion: { type: String, required: true },
        },
        "pm2.5": {
          value: { type: String, required: true },
          description: { type: String, required: true },
          conclusion: { type: String, required: true },
        },
        pm10: {
          value: { type: String, required: true },
          description: { type: String, required: true },
          conclusion: { type: String, required: true },
        },
        o3: {
          value: { type: String, required: true },
          description: { type: String, required: true },
          conclusion: { type: String, required: true },
        },
      },
    },
    weatherData: {
      today: { type: String, required: true },
      tonight: { type: String, required: true },
      current: {
        temperature: { type: String, required: true },
        weather: { type: String, required: true },
      },
      wind: { type: String, required: true },
      collectionTime: { type: String, required: true },
    },
  },
  { collection: "cities" }
);

const City = mongoose.models.City || mongoose.model("City", citySchema);
export default City;
