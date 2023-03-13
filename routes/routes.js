const express = require("express");
const axios = require("axios");
const AirQuality = require("../models/airQuality.js");

const router = express.Router();

router.get("/air_quality", async (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude)
    return res
      .status(500)
      .send("Error fetching air quality data , Please provide valid data.");
  const apiKey = "48f58e86-b8a3-425a-8002-54d295ee6358";
  const url = `http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    const pollution = response.data.data.current.pollution;
    const result = {
      Result: {
        Pollution: {
          ts: pollution.ts,
          aqius: pollution.aqius,
          mainus: pollution.mainus,
          aqicn: pollution.aqicn,
          maincn: pollution.maincn,
        },
      },
    };

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching air quality data");
  }
});

router.get("/most_polluted_datetime", async (req, res) => {
  try {
    const result = await AirQuality.aggregate([
      {
        $sort: { "pollution.aqius": -1 },
      },
      {
        $group: {
          _id: null,

          datetime: { $first: "$date" },
        },
      },
    ]);
    const mostPollutedDatetime = result[0].datetime;
    res.json({ datetime: mostPollutedDatetime });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
