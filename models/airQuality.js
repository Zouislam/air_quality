const mongoose = require('mongoose');



const AirQualitySchema = new mongoose.Schema({
  date: Date,
  pollution: {
    ts: String,
    aqius: Number,
    mainus: String,
    aqicn: Number,
    maincn: String,
  },
});

const AirQuality = mongoose.model("AirQuality", AirQualitySchema);


module.exports = AirQuality;