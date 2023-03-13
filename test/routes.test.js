const request = require("supertest");
const  app  = require('../index');
const { describe, expect } = require('@jest/globals');


const AirQuality = require("../models/airQuality.js");


describe("Air quality routes", () => {
  describe("GET /air_quality", () => {
    it("should return air quality data for a given latitude and longitude", async () => {
      const response = await request(app)
        .get("/air_quality")
        .query({ latitude: 37.7749, longitude: -122.4194 });
      expect(response.statusCode).toBe(200);
      expect(response.body.Result.Pollution).toHaveProperty("ts");
      expect(response.body.Result.Pollution).toHaveProperty("aqius");
      expect(response.body.Result.Pollution).toHaveProperty("mainus");
      expect(response.body.Result.Pollution).toHaveProperty("aqicn");
      expect(response.body.Result.Pollution).toHaveProperty("maincn");
    });


    it("should return an error message if an error occurs while fetching air quality data", async () => {
      const response = await request(app)
        .get("/air_quality")
        .query({ latitude: "", longitude: "" });
    
      expect(response.statusCode).toBe(500);
      expect(response.text).toBe("Error fetching air quality data , Please provide valid data.");
    });
  });




  describe("GET /most_polluted_datetime", () => {
    beforeAll(async () => {
      await AirQuality.deleteMany({});
      await AirQuality.create([
        {
          pollution: { aqius: 866 },
          date: new Date("2022-06-20T00:00:00.000Z"),
        },
        {
          pollution: { aqius: 20 },
          date: new Date("2022-02-20T00:00:00.000Z"),
        },
        {
          pollution: { aqius: 4330 },
          date: new Date("2022-09-20T00:00:00.000Z"),
        },
      ]);
    }, 20000);
  
    it("should return the datetime with the highest pollution level", async () => {
      const response = await request(app).get("/most_polluted_datetime");
      expect(response.statusCode).toBe(200);
      expect(response.body.datetime).toBe("2022-09-20T00:00:00.000Z");
    });
  });
});
