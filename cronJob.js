const axios = require("axios");
const cron = require("node-cron");
const AirQuality = require("./models/airQuality.js");

const cronJob = cron.schedule("* * * * *", async () => {
  const latitude = 48.856613;
  const longitude = 2.352222;
  const apiKey = "48f58e86-b8a3-425a-8002-54d295ee6358";
  const url = `http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const pollution = response.data.data.current.pollution;
    const airQuality = new AirQuality({
      date: new Date(),
      pollution: {
        ts: pollution.ts,
        aqius: pollution.aqius,
        mainus: pollution.mainus,
        aqicn: pollution.aqicn,
        maincn: pollution.maincn,
      },
    });
    await airQuality.save();
    console.log("Air quality saved successfully");
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = cronJob;