// to do - still can't get the 5-day to populate, it's populating backwards (after) array to retrieve 5-day data needs to compare a certain time for validation
// list items need to be populated
// how to limit size of cityRecents array to top 5
// also need the weather icon in the daily forecastgit
// need to account for errors in user input search field
// some styling

var cardTarget = document.querySelector("#cardstart");
var boxTarget = document.querySelector(".col-md-2");
var inputTarget = document.querySelector(".list-group");
var dayArray = ["day1", "day2", "day3", "day4", "day5"];
var cityRecents =[];
var fetchButton = document.querySelector(".btn");
var cityB1 = document.getElementsByClassName("city");
var timeNow = moment();
init();


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
        var dayA2 = document.createElement("img");
        var temp = document.createElement("section");
        var wind = document.createElement("section");
        var uv = document.createElement("section");
        boxTarget.after(cityBlock);
        cityBlock.className = "col-md-8";
        cityBlock.id = "cityblock";
        cityBlock.appendChild(city).className = "city";
        cityBlock.appendChild(dayA2).className = "icon";
        cityBlock.appendChild(temp).className = "temperature";
        cityBlock.appendChild(wind).className = "windspeed";
        cityBlock.appendChild(uv).className = "uvindex";
        city.textContent = data.name + " (" + timeNow.format("MM/DD/YY") + ")";
        dayA2.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
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

            for (let i = 0; i < 5; i++) {
              var dayS1 = document.createElement("section");
              var dayS2 = document.createElement("section");
              var dayH5 = document.createElement("h5");
              var dayA1 = document.createElement("img");
              var dayP1 = document.createElement("p");
              var dayP2 = document.createElement("p");
              var dayP3 = document.createElement("p");
              cardTarget.appendChild(dayS1);
              dayS1.className ="card bg-primary";
              dayS1.style = "width:10rem";
              dayS1.dataset.day = "day"+[i+1];
              dayS1.appendChild(dayS2).className ="card-body";
              dayS2.appendChild(dayH5).className = "card-title";
              dayS2.appendChild(dayA1).id = "icon"+ [i*8];
              dayS2.appendChild(dayP1).id = "temp" + [i*8];
              dayS2.appendChild(dayP2).id = "hum" + [i*8];
              dayS2.appendChild(dayP3).id = "dtTxt" + [i*8];
              console.log(i*8)

              dayH5.textContent = timeNow.add(1,'days').format("MM/DD/YY");
              // console.log(dayP1);
              // console.log(fiveTemp);
              // console.log(i);
            }
              for (let j = 0; j < dataFive.list.length ; j++) {
                if (j % 8 === 0) {
                  var fiveIcon = "http://openweathermap.org/img/wn/" + dataFive.list[j].weather[0].icon + "@2x.png",
                  fiveTemp = dataFive.list[j].main.temp + "°F",
                  fiveHumid = dataFive.list[j].main.humidity + "%",
                  fiveDt = dataFive.list[j].dt_txt;
                  // console.log(fiveTemp);
                  // console.log(fiveHumid);
                  // console.log(fiveDt);

                  var dayIcon = document.getElementsByClassName("img#icon"+[j]),
                  dayTemp = document.querySelector("p#temp"+[j]);
                  dayHumid = document.querySelector("p#hum"+[j]),
                  dayDt = document.querySelector("p#dtTxt"+[j]);
                  // dayIcon.setAttribute.src = fiveIcon;
                  dayTemp.textContent = fiveTemp;
                  dayHumid.textContent = fiveHumid;
                  dayDt.textContent = fiveDt;
                  console.log(fiveTemp);
                  console.log(fiveDt);
                  console.log(j);
                }
                
              }
             
           
            
              
          });

         recents();   
      });
        cityRecents.push(cityText);
          if (cityRecents.length > 7) {
          cityRecents.shift();
          cityRecents.length = Math.min(cityRecents.length, 7);
          cityInput.value = "";
          cityStore();
          }
          
      };
}  

  

function cityStore () {
  localStorage.setItem('recentCities', JSON.stringify(cityRecents));
}

function init() {
  var storedCities = JSON.parse(localStorage.getItem("recentCities"));
    if (storedCities !== null) {
    cityRecents = storedCities;
    recents();
  }
}

function error () {
  // some function to prevents errors from mistyped city names

}

// this function should build a list based on recent city searches
function recents () {
  $('li').remove();
  for (var i = 0; i < cityRecents.length; i++) {
    var liN1 = document.createElement("li");
    inputTarget.appendChild(liN1).className = "list-group-item py-2";
    liN1.textContent = cityRecents[i];
  }
}
var clickList = document.querySelectorAll("li");

function listRecent () {
  if (clickList.length > 0) {
    for (var i = 0; i < clickList.length; i++) {
      clickList[i].addEventListener('click', function() {
      console.log(clickList[0].textContent);
      });
    }
  }
}
listRecent();

// event listeners ===============================

fetchButton.addEventListener('click', getData);

// modulo reference https://stackoverflow.com/questions/2821006/find-if-variable-is-divisible-by-2
            // for (let j = 0; j < dataFive.list.length ; j++) {
            //   if (j % 8 === 0) { 
            //   dayH5.textContent = timeNow.add(1,'days').format("MM/DD/YY");
            //   console.log((Math.round(dataFive.list[j].main.temp)) + "°F");
            //   console.log(dataFive.list[j].main.humidity + "%");
            //   console.log(dataFive.list[j].dt_txt);
            //   console.log(j);
            //   }
            // }
          // console.log(dataFive.list[4].dt_txt);
          // console.log(dataFive.list[12].dt_txt);
          // console.log(dataFive.list[20].dt_txt);
          // console.log(dataFive.list[28].dt_txt);
          // console.log(dataFive.list[36].dt_txt);