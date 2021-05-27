import "./CSS/reset.css";
import "./CSS/style.css";

const search = document.querySelector("#search");
const city = document.querySelector("#city");
const dataDisplay = document.querySelector("#dataDisplay");
const cityName = document.querySelector("#cityName");
const country = document.querySelector("#country");
const weatherIcon = document.querySelector("#weatherIcon");
const description = document.querySelector("#description");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function displayInfo(
    nameData,
    countryData,
    descriptionData,
    tempData,
    humidityData,
    iconData
) {
    cityName.textContent = nameData;
    country.textContent = countryData;
    weatherIcon.src = `http://openweathermap.org/img/wn/${iconData}@2x.png`;
    description.textContent = capitalizeFirstLetter(descriptionData);
    temp.textContent = `${tempData}º`;
    humidity.textContent = `${humidityData}%`;
    dataDisplay.style.visibility = "visible";
    dataDisplay.style.opacity = 1;
    dataDisplay.style.boxShadow = "5px 5px 15px 5px #023047";
}

function selectInfo(cityData) {
    const {
        name: nameData,
        sys: { country: countryData },
        weather: [{ description: descriptionData }],
        main: { temp: tempData },
        main: { humidity: humidityData },
        weather: [{ icon: iconData }],
    } = cityData;
    displayInfo(
        nameData,
        countryData,
        descriptionData,
        tempData,
        humidityData,
        iconData
    );
}

async function getData(citySearch) {
    try {
        const weatherRequest = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=f80d0d62401314cbe03dcaaeacf05b56`,
            { mode: "cors" }
        );
        if (!weatherRequest.ok) throw Error(weatherRequest.statusText);
        const cityData = await weatherRequest.json();
        selectInfo(cityData);
    } catch (error) {
        city.value = "";
        city.placeholder = "Invalid";
        city.style.borderColor = "red";
    }
}

search.addEventListener("click", () => {
    getData(city.value);
});
