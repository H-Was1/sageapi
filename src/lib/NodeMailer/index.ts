import { Collection } from "mongoose";
import { CITY } from "../types/types";
import nodemailer from "nodemailer";
require("dotenv").config();
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EMAIL?: string;
      EMAIL_PASSWORD: string;
    }
  }
}

const Notification = {
  Welcome: "Welcome",
  Data: "Data",
};

export async function generateEmailBody(city: CITY, type: string) {
  let subject = "";
  let body = "";
  switch (type) {
    case Notification.Welcome:
      subject = `Welcome to AirSage, Tracking for ${city.name}`;
      body = `<div >
      <h2>Welcome to AirSage 🚀</h2>
      <p>Here's an example of how you'll receive updates:</p>
      <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">
      <h2 style="font-size: 20px; margin-bottom: 10px;">Weather and AQI Update for <span style="text-transform: capitalize;">${city.name}</span></h2>
      <p>
          <strong>Today's Weather:</strong>${city.weatherData.today}
          <br>
          <strong>Tonight's Weather:</strong>${city.weatherData.tonight}
          <br>
          <strong>Current Weather:</strong>${city.weatherData.current.weather}, ${city.weatherData.current.temperature}
      </p>
      <p>
          <strong>Wind:</strong> ${city.weatherData.wind}
          <br>
          <strong>Collection Time:</strong> ${city.weatherData.collectionTime}
      </p>
      <h3 style="font-size: 18px; margin-top: 20px;">Air Quality Index (AQI)</h3>
      <p>
          <strong>Quality:</strong> ${city.aqiData.quality.scale}
          <br>
          <strong>Index:</strong> ${city.aqiData.quality.index}
          <br>
          <strong>Description:</strong> ${city.aqiData.quality.description}
      </p>
      <h4 style="font-size: 16px; margin-top: 10px;">Pollutants</h4>
      <li style="margin-bottom: 5px;">
      <strong style="color: #007BFF;">PM2.5:</strong> Value ${city.aqiData.pollutants.pm25.value}, ${city.aqiData.pollutants.pm25.conclusion}
      <br>
         <li style="margin-bottom: 5px;">
               <strong style="color: #007BFF;">NO2:</strong> Value ${city.aqiData.pollutants.no2.value}, ${city.aqiData.pollutants.no2.conclusion}
               <br>
               <em>Description:</em> Breathing in high levels of Nitrogen Dioxide increases the risk of respiratory problems.
           </li>
           <li style="margin-bottom: 5px;">
               <em>Description:</em> Fine Particulate Matter are inhalable pollutant particles with a diameter less than 2.5 micrometers that can enter the lungs and bloodstream, resulting in serious health issues.
           </li>
           <li style="margin-bottom: 5px;">
               <strong style="color: #007BFF;">PM10:</strong> Value ${city.aqiData.pollutants.pm10.value}, ${city.aqiData.pollutants.pm10.conclusion}
               <br>
               <em>Description:</em> Particulate Matter are inhalable pollutant particles with a diameter less than 10 micrometers.
           </li>
           <li style="margin-bottom: 5px;">
               <strong style="color: #007BFF;">O3:</strong> Value ${city.aqiData.pollutants.o3.value}, ${city.aqiData.pollutants.o3.conclusion}
               <br>
               <em>Description:</em> Ground-level Ozone can aggravate existing respiratory diseases and also lead to throat irritation, headaches, and chest pain.
           </li>
      <p style="margin-top: 20px;">For more detailed information, please visit: <a href="https://airsage.vercel.app/${city.name}" target="_blank">
      AirSage
    </a></p>
      <p style="font-size: 12px; color: #666; margin-top: 20px;">This email was sent to you because you have subscribed to receive updates about <span style="text-transform: capitalize;">${city.name}</span>'s weather and air quality. If you wish to unsubscribe, <a href="https://airsage.vercel.app/unsub" target="_blank">
      Click Here!
    </a></p>
  </div>`;
      break;
    case Notification.Data:
      subject = `Your Daily Air Quality Update For City: ${city.name}`;
      body = `<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 5px; background: linear-gradient(to right, #f9f9f9, #e9e9e9);">
      <h2 style="font-size: 24px; margin-bottom: 10px; color: #007BFF; text-shadow: 1px 1px 2px #007BFF;">Weather and AQI Update for <span style="text-transform: capitalize; color: #007BFF;">${city.name}</span></h2>
      <p>
           <strong style="color: #007BFF;">Today's Weather:</strong>${city.weatherData.today}
           <br>
           <strong style="color: #007BFF;">Tonight's Weather:</strong>${city.weatherData.tonight}
           <br>
           <strong style="color: #007BFF;">Current Weather:</strong>${city.weatherData.current.weather}, ${city.weatherData.current.temperature}
      </p>
      <p>
           <strong style="color: #007BFF;">Wind:</strong> ${city.weatherData.wind}
           <br>
           <strong style="color: #007BFF;">Collection Time:</strong> ${city.weatherData.collectionTime}
      </p>
      <h3 style="font-size: 18px; margin-top: 20px; color: #007BFF;">Air Quality Index (AQI)</h3>
      <p>
           <strong style="color: #007BFF;">Quality:</strong> ${city.aqiData.quality.scale}
           <br>
           <strong style="color: #007BFF;">Index:</strong> ${city.aqiData.quality.index}
           <br>
           <strong style="color: #007BFF;">Description:</strong> ${city.aqiData.quality.description}
      </p>
      <h4 style="font-size: 16px; margin-top: 10px; color: #007BFF;">Pollutants</h4>
      <ul style="list-style-type: disc; margin-left: 20px; color: #333;">
           <li style="margin-bottom: 5px;">
               <strong style="color: #007BFF;">NO2:</strong> Value ${city.aqiData.pollutants.no2.value}, ${city.aqiData.pollutants.no2.conclusion}
               <br>
               <em>Description:</em> Breathing in high levels of Nitrogen Dioxide increases the risk of respiratory problems.
           </li>
           <li style="margin-bottom: 5px;">
               <strong style="color: #007BFF;">PM2.5:</strong> Value ${city.aqiData.pollutants.pm25.value}, ${city.aqiData.pollutants.pm25.conclusion}
               <br>
               <em>Description:</em> Fine Particulate Matter are inhalable pollutant particles with a diameter less than 2.5 micrometers that can enter the lungs and bloodstream, resulting in serious health issues.
           </li>
           <li style="margin-bottom: 5px;">
               <strong style="color: #007BFF;">PM10:</strong> Value ${city.aqiData.pollutants.pm10.value}, ${city.aqiData.pollutants.pm10.conclusion}
               <br>
               <em>Description:</em> Particulate Matter are inhalable pollutant particles with a diameter less than 10 micrometers.
           </li>
           <li style="margin-bottom: 5px;">
               <strong style="color: #007BFF;">O3:</strong> Value ${city.aqiData.pollutants.o3.value}, ${city.aqiData.pollutants.o3.conclusion}
               <br>
               <em>Description:</em> Ground-level Ozone can aggravate existing respiratory diseases and also lead to throat irritation, headaches, and chest pain.
           </li>
      </ul>
      <p style="margin-top: 20px; color: #333;">For more detailed information, please visit: <a href="https://airsage.vercel.app/${city.name}" target="_blank" style="color: #007BFF; text-decoration: none;">AirSage</a></p>
      <p style="font-size: 12px; color: #666; margin-top: 20px;">This email was sent to you because you have subscribed to receive updates about <span style="text-transform: capitalize;">${city.name}</span>'s weather and air quality. If you wish to unsubscribe, <a href="https://airsage.vercel.app/unsub" target="_blank" style="color: #007BFF; text-decoration: none;">Click Here!</a></p>
     </div>
     `;
      break;

    default:
      throw new Error("Invalid notification type.");
  }
  return { subject, body };
}
const transporter = nodemailer.createTransport({
  pool: true,
  // service: "hotmail",
  //   host: "outlook",
  // port: 2525,
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  maxConnections: 1,
});
export async function sendEmail(
  emailContent: { subject: string; body: string },
  sendTo: string[]
) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };
  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) console.log(err);
    console.log(info);
  });
}
