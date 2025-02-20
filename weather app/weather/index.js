const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");

const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

// initial veriable need ??


let currentTab = userTab;
// const API_KEY = "2a619823e22b84fc30f584e94822043f";
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");
getfromSessionStorage();


function switchTab(clickedTab) {
    if (clickedTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        clickedTab.classList.add("current-tab");

        if (!searchForm.classList.contains("active")) {
            // kya search vala tab invisible , if yes then make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");

        } else {
            // mai pahale search vale tab per tha , ab your weater tab visble karna h
            searchForm.classList.remove("active");
            userInfoContainer.classList.add("active");

            //ab main your weather tab me aagya hun , tho weather bhi display karna padhega , so let'check local storage first
            //for coordinates , if we haved saved them there.
            getfromSessionStorage();

        }

    }
}

userTab.addEventListener('click', () => {
    //pass clicked tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener('click', () => {
    //pass clicked tab as input parameter
    switchTab(searchTab);
});

//check if cordinates are already present in session storage
function getfromSessionStorage() {

    const localCoordinates = sessionStorage.getItem("user-coordinates");
    console.log("local coordinate", localCoordinates);
    if (!localCoordinates) {
        //agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");


    } else {
        // const coordinates = json.parse(localCoordinates);
        fetchUserWeatherInfoByCoordinate(localCoordinates);

    }

}

async function fetchUserWeatherInfoByCoordinate(coordinates) {
    console.log("coordinate");
    const { lat, lon } = JSON.parse(coordinates);
    console.log("latitude and longituee", JSON.parse(coordinates).lon);
    //make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");


    // API CALL
    try {
        const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}${lon}&appid=${API_KEY}&units=metric`);
        const data = await responce.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (err) {
        loadingScreen.classList.remove("active");
    }
}


function renderWeatherInfo(weatherInfo) {
    //first we have feched the element

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    // fetch vlaues from weatherINFO object and put it UI elements

    cityName.innerText = weatherInfo.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo.weather[0].description;
    weatherIcon.src = `https:openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = weatherInfo.main.temp;
    windspeed.innerText = weatherInfo.wind.speed;
    humidity.innerText = weatherInfo.main.humidity;
    cloudiness.innerText = weatherInfo.clouds.all;

}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("geolocation are not present");
    }
}

function showPosition(position) {
    //create an object to get a current lattitude and longitude

    let userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfoByCoordinate(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

const CitySearch = document.querySelector("#CitySearch");
const Searchbutton = document.querySelector("#SearchButtun");
Searchbutton.addEventListener("click", (e) => {
    let cityName = CitySearch.target.value;
    console.log("cityName ", cityName, Searchbutton);


    if (cityName === "")
        return;
    else
        fetchSearchWeatherInfo(cityName);

});

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    console.log("city", city);

    try {
        const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await responce.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (err) {
        loadingScreen.classList.remove("active");
    }
}