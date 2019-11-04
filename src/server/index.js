

const fetch = require("node-fetch");

var DarkSky = require("forecast.io");

const express = require("express");

const bodyParser = require("body-parser");
/* Start up an instance of app */
const app = express();

const dotenv = require("dotenv");

dotenv.config();

var options = {
    APIKey: process.env.DARKSKY_API_KEY
  },
  darksky = new DarkSky(options);

var apiKeyPixyBay = process.env.PIXY_BAY_API_KEY;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

console.log("__dirname");
console.log(__dirname);

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

// Setup Server
app.listen(process.env.PORT || 8083, function() {
  console.log("Example app listening on 8083 !");
});

app.post("/destination", function(req, res) {
  darksky.get(req.body.latitude, req.body.longitude, req.body.time, function(
    err,
    response,
    data
  ) {
    if (err) throw err;
    res.send(response.body);
  });
});

app.post("/destination-pic", function(req, res) {
  fetch(
    "https://pixabay.com/api/?key=" +
      apiKeyPixyBay +
      "&q=" +
      req.body.destination +
      "&image_type=" +
      req.body.image_type +
      "&category=" +
      req.body.category,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      //console.log(json);
      res.send(json);
    });
});
