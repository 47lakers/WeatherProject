const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  const query = req.body.cityName
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=f11bdb7259db000cc7c14a12d2755f26&units=imperial#"
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + description + "<p>");
      res.write("<h1>The temp in " + query + " is " + temp + " F </h1>");
      res.write("<img src=" + imageURL + ">")
      res.send();
    })
  })
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
})
