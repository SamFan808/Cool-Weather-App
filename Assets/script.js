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

// var requestUrl = 'api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}';

// var responseText = document.getElementById('response-text');

var cardTarget = document.getElementById("cardstart");
var boxTarget = document.querySelector(".col-md-2");
var inputTarget = document.querySelector(".list-group");
var dayArray = ["day1", "day2", "day3", "day4", "day5"];
var cityRecents =[];
var fetchButton = document.querySelector(".btn");
var cityB1 = document.getElementsByClassName("city");

fetchButton.addEventListener('click', function(event) {
  event.preventDefault(); {
  var cityInput = document.querySelector("input");
  var cityText = cityInput.value;
  var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityText +"&appid=0d2d646f1fc53c15f97082e153457db8&units=imperial";
  if (cityText === "") {
    return;
  } else {
    // clear the currentWeather and the daycards
    fetch(requestUrl) 
      .then(function (response) {
        return response.json();
      })
      .then(function (data) { 
        cityB1.textContent = data.name;
        console.log(data);
        console.log(cityInput);
        console.log(cityText);
        console.log(requestUrl);
        console.log(data.main.temp);
      })
    }
  }
  currentWeather();
  dayCard();
});
// this function should build a list based on recent city searches
function recents () {
  var liN1 = document.createElement("li");
  inputTarget.appendChild(liN1).className = "list-group-item py-2";
}
// this function builds the current weather card
function currentWeather () {
  var cityBlock = document.createElement("article"); 
  var city = document.createElement("article");
  var temp = document.createElement("article");
  var wind = document.createElement("article");
  var uv = document.createElement("article");
  boxTarget.after(cityBlock);
  cityBlock.className = "col-md-8";
  cityBlock.id = "cityblock";
  cityBlock.appendChild(city).className = "city";
  cityBlock.appendChild(temp).className = "temperature";
  cityBlock.appendChild(wind).className = "windspeed";
  cityBlock.appendChild(uv).className = "uvindex";
  city.textContent = "City";
  temp.textContent = "temperature";
  wind.textContent = "windspeed";
  uv.textContent = "uv placeholder";
}
// https://stackoverflow.com/a/15643868/14244725 - uhh, put the variables inside the loop/function
// creates the 5-day card html ==============================
function dayCard () {
  var dayTitle = document.querySelector("#daytitle");
  dayTitle.textContent = "5-Day Forecast:";
  for (i = 0; i < dayArray.length; i++) {
    var dayS1 = document.createElement("article");
    var dayS2 = document.createElement("article");
    var dayH5 = document.createElement("h5");
    var dayP1 = document.createElement("p");
    cardTarget.after(dayS1);
    dayS1.className ="card bg-primary";
    dayS1.style = "width:10rem";
    dayS1.dataset.day = "day"+[i+1];
    dayS1.appendChild(dayS2).className ="card-body";
    dayS2.appendChild(dayH5).className = "card-title";
    dayS2.appendChild(dayP1).className = "card-text";
  }
}

recents();