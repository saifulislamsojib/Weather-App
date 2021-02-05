const img = document.getElementById('condition');
const city = document.getElementById('city');
const countryText = document.getElementById('country');
const mainText = document.getElementById('main');
const description = document.getElementById('description');
const temperature = document.getElementById('temp');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');

const cityInput = document.getElementById('city-input');
const historyElm = document.getElementById('history');
const masterHistory = document.getElementById('master-history');

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const key = "89da619c06ec148f5c9c86f779671a75";
const iconBaseUrl = "https://openweathermap.org/img/wn/";

window.onload = () => {
    navigator.geolocation.getCurrentPosition(s => {
        getWeather(null, s.coords);
    }, e => {
        getWeather();
    })
}

cityInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.target.value ? getWeather(e.target.value) : alert("Please Write A City");
        e.target.value = "";
    }
});

function getWeather(city = "demra", coords) {
    let url = `${baseUrl}?q=${city}&units=metric&appid=${key}`;
    if (coords) {
        const {latitude, longitude} = coords;
        url = `${baseUrl}?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`
    }
    fetch(url)
        .then((res) => res.json())
        .then((data) => createWeather(data))
        .catch((err) => alert("Sorry, Location Not Found", err));
}
function createWeather(data){
    const {name, sys, weather, main} = data;
    let mainWeather = {
        name: name,
        country:sys.country,
        main:weather[0].main,
        des:weather[0].description,
        temp:main.temp,
        pre:main.pressure,
        hum:main.humidity,
        icon:weather[0].icon,
    }
    showWeather(mainWeather);
}
const showWeather = (weather) => {
    const {name, country, main, des, temp, pre, hum, icon} = weather;
    countryText.innerText = name ? country : "";
    city.innerText = name ? `${name},` : "Unknown Location!";
    mainText.innerText = main;
    description.innerText= des;
    temperature.innerText = temp;
    pressure.innerText = pre;
    humidity.innerText = hum;
    img.setAttribute('src', `${iconBaseUrl}${icon}@2x.png`);
}