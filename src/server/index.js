// Setup empty JS object to act as endpoint for all routes
let cityData= new Object();

var path = require('path')

var DarkSky = require('forecast.io');

const express = require("express");

const bodyParser = require("body-parser");
/* Start up an instance of app */
const app = express();

const dotenv = require('dotenv');

dotenv.config();

var options = {
  APIKey: process.env.DARKSKY_API_KEY,
},
darksky = new DarkSky(options);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.use(express.static('dist'))

console.log('__dirname')
console.log(__dirname)

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})


// Setup Server
app.listen(process.env.PORT || 8083, function () {
  console.log('Example app listening on 8083 !')
})




app.post('/destination'),function(req, res){

  console.log('HI!!');
  var htmlData = 'Hello:';
  console.log(htmlData);
  console.log(req);
  
  //res.sendStatus(200);
   console.log('req');
  console.log(req);
  console.log(res)
  darksky.get( 
    req.body.latitude, 
    req.body.longitude, 
      function (err, response, data) {
        if (err) throw err;
        //console.log(response);
        res.send(response)
      });  
}
//post route
/* app.post("/generate-data", (req, res) => {
  console.log('req');
  console.log(req);
  res.end();
}); */
