const API_KEY = "2a619823e22b84fc30f584e94822043f";

function renderWeatherInfor(data) {

    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`
    document.body.appendChild(newPara);

}

async function fetchWeatherDetails() {

    try {
        // latitude = 14.3333;
        // longitude = 74.0833;

        let city = "goa";

        // const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=14.33&lon=17.66&appid=2a619823e22b84fc30f584e94822043f&units=metric`);
        const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=14.33&lon=17.66&appid=2a619823e22b84fc30f584e94822043f&units=metric`);


        const data = await responce.json();
        console.log("Weather data --> ", data);

        // let newPara = document.createElement('p');
        // newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`
        // document.body.appendChild(newPara);

        renderWeatherInfor(data);
    } catch (err) {

        // handle the error here

    }
}


async function getCustomWeatherDetails() {

    try {

        let lat = 15.6333;
        let lon = 18.333;

        let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

        let data = await result.json();

        console.log(data);


    } catch (err) {

        console.log("Error Found: ", err);

    }
}



// to find my current latitude and longitude (current location)

// create function

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("no geoLocation support");
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let longi = position.coords.longitude;

    console.log(lat);
    console.log(longi);
}