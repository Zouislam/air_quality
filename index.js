const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/routes.js");
const cronJob = require("./cronJob.js");
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use("/", routes);

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

cronJob.start();
module.exports = app;
