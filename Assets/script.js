var cardTarget = document.querySelector("#cardstart");
var boxTarget = document.querySelector(".col-md-2");
var inputTarget = document.querySelector(".list-group");
var cityRecents =[];
var fetchButton = document.querySelector(".btn");
var cityB1 = document.getElementsByClassName("city");
var timeNow = moment();
init();

function getData (cityInput) {
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
        // this builds the current weather card ==============
        var cityBlock = document.createElement("section");
        var city = document.createElement("h3");
        var dayA2 = document.createElement("img");
        var temp = document.createElement("section");
        var humid = document.createElement("section");
        var wind = document.createElement("section");
        var uv = document.createElement("section");
        var uvButt = document.createElement("button");
        boxTarget.after(cityBlock);
        cityBlock.className = "col-md-8 py-1";
        cityBlock.id = "cityblock";
        cityBlock.appendChild(city).className = "city";
        cityBlock.appendChild(temp).className = "temperature";
        cityBlock.appendChild(humid).className = "humidity";
        cityBlock.appendChild(wind).className = "windspeed";
        cityBlock.appendChild(uv).className = "uv";
        uv.textContent = "UV Index: ";
        uv.appendChild(uvButt).className = "btn";
        city.textContent = data.name + " (" + timeNow.format("MM/DD/YY") + ")";
        city.appendChild(dayA2).className = "icon";
        dayA2.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        temp.textContent = "Temperature: " + Math.round(data.main.temp) + "°F";
        humid.textContent = "Humidity: " +(data.main.humidity) + "%";
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
          // button color based on uv index range
          uvButt.textContent = dataUV.value;
          if (dataUV.value >= 0.00 && dataUV.value <= 2.99) {
            uvButt.className = "btn btn-success";
          } else if (dataUV.value >= 3.00 && dataUV.value <= 5.99) {
            uvButt.className = "btn btn-warning";
          } else {
            uvButt.className = "btn btn-danger";
          }
        });
        // 5-day fetch request ====================================
        var fiveRequest = "https://api.openweathermap.org/data/2.5/forecast?q=" + data.name + "&appid=0d2d646f1fc53c15f97082e153457db8&units=imperial";
        fetch(fiveRequest)
          .then(function (response) {
            return response.json();
          })
          .then(function (dataFive) {
            // creates the 5-day card html
            var dayTitle = document.querySelector("#dayStart");
            var dayMaker = document.createElement("section");
            dayTitle.appendChild(dayMaker);
            dayMaker.className = "h3"
            dayMaker.textContent = "5-Day Forecast:";
            for (let i = 0; i < 5; i++) {
              var dayS1 = document.createElement("section");
              var dayS2 = document.createElement("section");
              var dayH5 = document.createElement("h5");
              var dayA1 = document.createElement("img");
              var dayP1 = document.createElement("p");
              var dayP2 = document.createElement("p");
              cardTarget.appendChild(dayS1);
              dayS1.className ="card bg-primary";
              dayS1.style = "width:10rem";
              dayS1.dataset.day = "day"+[i+1];
              dayS1.appendChild(dayS2).className ="card-body py-1";
              dayS2.appendChild(dayH5).className = "card-title";
              dayS2.appendChild(dayA1).id = "icon"+ [i*8];
              dayS2.appendChild(dayP1).id = "temp" + [i*8];
              dayS2.appendChild(dayP2).id = "hum" + [i*8];
              dayH5.textContent = timeNow.add(1,'days').format("MM/DD/YY");
            }
              for (let j = 0; j < dataFive.list.length ; j++) {
                if (j % 8 === 0) {
                  var fiveIcon = "https://openweathermap.org/img/wn/" + dataFive.list[j].weather[0].icon + "@2x.png",
                  fiveTemp = dataFive.list[j].main.temp + "°F",
                  fiveHumid = dataFive.list[j].main.humidity + "%",
                  fiveDt = dataFive.list[j].dt_txt;
                  var dayIcon = document.querySelector("img#icon"+[j]),
                  dayTemp = document.querySelector("p#temp"+[j]);
                  dayHumid = document.querySelector("p#hum"+[j]),
                  dayIcon.src = fiveIcon;
                  dayTemp.textContent = fiveTemp;
                  dayHumid.textContent = fiveHumid;
                }
              }
          });
      });
    cityRecents.push(cityText);
    if (cityRecents.length > 7) {
      cityRecents.shift();
      cityRecents.length = Math.min(cityRecents.length, 7);
      cityInput.value = "";
      cityStore();
    } else {
      cityInput.value = "";
      cityStore();
    }       
  };
  recents();
  listRecent();
}
// stores recent items into localStorage
function cityStore () {
  localStorage.setItem('recentCities', JSON.stringify(cityRecents));
}
//retrieves recent items from localStorage
function init() {
  var storedCities = JSON.parse(localStorage.getItem("recentCities"));
    if (storedCities !== null) {
    cityRecents = storedCities;
    recents();
  }
}
// builds a list based on recent city searches
function recents () {
  $('li').remove();
  for (var i = 0; i < cityRecents.length; i++) {
    var liN1 = document.createElement("li");
    inputTarget.appendChild(liN1).className = "list-group-item py-2";
    liN1.textContent = cityRecents[i];
  }
}
// maintains list of recent items to 7, clicking the city name should pull up current weather and forecast for any recent searches, but this isn't working. Suggestions?
function listRecent () {
  var clickList = document.querySelectorAll("li");
  var cityClick = ""
  if (clickList.length > 0) {
    for (var i = 0; i < clickList.length; i++) {
      clickList[i].addEventListener('click', function() {
      cityClick = this.innerHTML;
      console.log(cityClick);
      getData(cityClick);
      });
    }
  }
}
listRecent();
fetchButton.addEventListener('click', getData);
