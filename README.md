
# Air Quality API Documentation
 # Overview
This API provides information about air quality based on the user's geographic location. The API retrieves data from the AirVisual API and returns information about the current air quality index (AQI) and the date and time of the most polluted reading for a given location. This documentation provides information on how to use the API and its endpoints.

# Getting Started
**Clone the repository**

`git clone https://github.com/Zouislam/air_quality.git`

**Install dependencies**

`cd air_quality`

`npm install`

**Start the server**

`node index.js`.

Test the API using an HTTP client like Postman or cURL. 

# Base URL

http://localhost:5001/

# Authentication
This API does not require authentication.

# Endpoints
# GET /air_quality

This endpoint retrieves the current air quality index (AQI) for a given location.

**Query Parameters:**

| Parameter   | Description                                    | Required | Valid Range   |
| ----------- | ---------------------------------------------- | -------- | ------------- |
| latitude    | The latitude of the location                   | Yes      | -90 to 90     |
| longitude   | The longitude of the location                  | Yes      | -180 to 180   |

**Request Example:**

```json
GET http://localhost:5001/api/air_quality?latitude=40.712776&longitude=-74.005974
```
**Response Example:**

```json
HTTP/1.1 200 OK
{
    "Result": {
        "Pollution": {
            "ts": "2023-03-12T05:30:00.000Z",
            "aqius": 27,
            "mainus": "p2",
            "aqicn": 22,
            "maincn": "p2"
        }
    }
}
```

#  GET /most_polluted_datetime

This endpoint retrieves the date and time where the paris zone is the most polluted

**Request Example:**
```json
GET http://localhost:5001/api/most_polluted_datetime
```


**Response Example:**
```json
HTTP/1.1 200 OK
{
    "datetime": "2023-03-12T00:00:00.000Z"
}

```

**Error Responses:**


```json
500 Internal Server Error: An error occurred while fetching air quality data or performing a database query.

```

# Run Tests

A unit test suits has been made using jest :
```json
npm test
```

# Conclusion
This API provides a simple way to retrieve air quality data based on geographic location. By using this API, you can easily integrate air quality data into your applications or services.
