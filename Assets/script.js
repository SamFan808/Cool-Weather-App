// Weather dashboard
// search field - fetch query
// list of recent city searches below, should be active links that can be clicked, taking to the search query results for that city
// City name and date with current weather icon (cloud, sun, etc...)
// Temp, humidity, wind speed, UV index with a color icon background indicating scale of favorable, moderate, severe
// 5-day forecast for the city w/weather condition icon, temp and humidity
// api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

// target the search input
// fetch data for 5-day forecast, return into 5 cards and .city
// create recent items list, with a href links going back to the previous search item for each item
// localStorage will store recent city, state, country names in an index
// 

var requestUrl = 'api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}';

var responseText = document.getElementById('response-text');

function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {})
    .then(function (data) {
      console.log(data);
    });
}

getApi(requestUrl);
var cardTarget = document.getElementById("#cardstart")
var dayDiv1 = document.createElement("div");
var dayId = document.createAttribute("id", "date[i]");
var dayStyle = document.setAttribute("style", "width:12rem");
var dayDiv2 = document.createElement("div");
var fiveDay = ["dayOne", "dayTwo", "dayThree", "dayFour", "dayFive"];

// creates the 5-day card html ==============================
function fiveDay () {
    
    for (i = 0; i < fiveDay.length; i++) {
