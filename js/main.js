//today data
let todayName = document.getElementById('today-name');
let todayDateNumber = document.getElementById('today-date-number');
let todayDateMonth = document.getElementById('today-date-month');
let todayLocation = document.getElementById('today-location');
let todayTemp = document.getElementById('today-temp');
let todayConditionImg = document.getElementById('today-condition-img');
let todayConditionText = document.getElementById('today-condition-text');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let windDirection = document.getElementById('wind-direction');


//next data
let nextName = document.getElementsByClassName('next-day-name');
let nextConditionImg = document.getElementsByClassName('next-condition-img');
let nextMaxTemp = document.getElementsByClassName('next-max-temp');
let nextMinTemp = document.getElementsByClassName('next-min-temp');
let nextConditionText = document.getElementsByClassName('next-condition-text');



// search 
var searchInput = document.getElementById('search-input');


//fetch data
async function getWeatherData(cityName){
   let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=75fed95c209742729c421149241107&q=${cityName}&days=3`);
   let weatherData = await weatherResponse.json();
   return weatherData
}


// display today data
function displayTodayData(data){
    //date
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday: "long"})
    todayDateNumber.innerHTML = todayDate.getDate()
    todayDateMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month: "long"})
    //rest data
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c + '°C'
    todayConditionImg.setAttribute("src", data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + "%"
    wind.innerHTML = data.current.wind_kph + "km/h"
    windDirection.innerHTML = data.current.wind_dir

}

//display next data

function displayNextData(data){
    let forecastData = data.forecast.forecastday
    // console.log(forecastData)
    
    // console.log(nextDate)
    for(let i = 0; i < 2 ; i++){
        //date
        let nextDate = new Date(forecastData[i+1].date)
        nextName[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday: "long"})
       
        // console.log(nextDate)
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
        nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
    }
}

//start all functions
async function start(cityName = "Cairo"){
    let weatherData = await getWeatherData(cityName)
    if(!weatherData.error){
        displayTodayData(weatherData)
        displayNextData(weatherData)
    }
}
// start()

//search
searchInput.addEventListener("input",function(){
    // console.log(searchInput.value)
    start(searchInput.value)
})

