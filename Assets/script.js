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
// var dayArray = ["day1", "day2", "day3", "day4", "day5"];
var cityRecents =[];
var fetchButton = document.querySelector(".btn");
var cityB1 = document.getElementsByClassName("city");
var timeNow = moment();

function getData () {
  // clear the currentWeather and the daycards
  $('section').remove();

  var cityInput = document.querySelector("input");
  var cityText = cityInput.value;
  var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityText +"&appid=0d2d646f1fc53c15f97082e153457db8&units=imperial";

  if (cityText === "") {
    return;
  } else {
    // current weather fetch request ===============================
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
      .then(function (data) { 
        // this builds the current weather card
        var cityBlock = document.createElement("section");
        var city = document.createElement("section");
        var temp = document.createElement("section");
        var wind = document.createElement("section");
        var uv = document.createElement("section");
        boxTarget.after(cityBlock);
        cityBlock.className = "col-md-8";
        cityBlock.id = "cityblock";
        cityBlock.appendChild(city).className = "city";
        cityBlock.appendChild(temp).className = "temperature";
        cityBlock.appendChild(wind).className = "windspeed";
        cityBlock.appendChild(uv).className = "uvindex";
        city.textContent = data.name + " (" + timeNow.format("MM/DD/YY") + ")";
        // spanB1.textContent = "(" + timeNow.format("dddd, MMMM Do") + ")";
        temp.textContent = "Temperature: " + Math.round(data.main.temp) + "°F";
        wind.textContent = "Windspeed: " + data.wind.speed + " MPH";
        // UV index fetch request ================================
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var uvRequest = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=0d2d646f1fc53c15f97082e153457db8&open"
        fetch(uvRequest)
        .then(function (response) {
          return response.json();
        })
        .then(function (dataUV) { 
          uv.textContent = "UV Index " + dataUV.value;
          // button color based on some # < or > some uv index #
        });
        // https://stackoverflow.com/a/15643868/14244725 - uhh, put the variables inside the loop/function
        // 5-day fetch request ====================================
        var fiveRequest = "https://api.openweathermap.org/data/2.5/forecast?q=" + data.name + "&appid=0d2d646f1fc53c15f97082e153457db8&units=imperial";
        fetch(fiveRequest)
          .then(function (response) {
            return response.json();
          })
          .then(function (dataFive) {
                   
            // creates the 5-day card html
            var dayTitle = document.querySelector("#daytitle");
            dayTitle.textContent = "5-Day Forecast:";

            for (i = 0; i < 5; i++) {
              var dayS1 = document.createElement("section");
              var dayS2 = document.createElement("section");
              var dayH5 = document.createElement("h5");
              var dayP1 = document.createElement("p");
              var dayP2 = document.createElement("p");
              cardTarget.after(dayS1);
              dayS1.className ="card bg-primary";
              dayS1.style = "width:10rem";
              dayS1.dataset.day = "day"+[i+1];
              dayS1.appendChild(dayS2).className ="card-body";
              dayS2.appendChild(dayH5).className = "card-title";
              dayS2.appendChild(dayP1).className = "card-text";
              dayS2.appendChild(dayP2).className = "card-text";

              // modulo reference https://stackoverflow.com/questions/2821006/find-if-variable-is-divisible-by-2
              
              
            }
            for (j = 0; j < dataFive.list.length ; j++) {
                if (j % 8 === 0) { 
                console.log(timeNow.add(1,'days').format("MM/DD/YY"));
                console.log(dataFive.list[j].main.temp + "°F");
                console.log(dataFive.list[j].main.humidity + "%");
                console.log(dataFive.list[j].dt_txt);
                console.log(j);
                }
              }
            var dayPlus1 = dataFive.list[4].main;
            var dayPlus2 = dataFive.list[12].main;
            var dayPlus3 = dataFive.list[20].main;
            var dayPlus4 = dataFive.list[28].main;
            var dayPlus5 = dataFive.list[36].main;

          // console.log(dataFive.list[4].dt_txt);
          // console.log(dataFive.list[12].dt_txt);
          // console.log(dataFive.list[20].dt_txt);
          // console.log(dataFive.list[28].dt_txt);
          // console.log(dataFive.list[36].dt_txt);
          });
      })
  }
}

// this function should build a list based on recent city searches
function recents () {
  var liN1 = document.createElement("li");
  inputTarget.appendChild(liN1).className = "list-group-item py-2";
}

fetchButton.addEventListener('click', getData);

recents();