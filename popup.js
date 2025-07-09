const btn = document.getElementById("fetchBtn");
const loading = document.getElementById("loading");
const infoBox = document.querySelector(".weather-info");
const icon = document.getElementById("icon");
const locationText = document.getElementById("location");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const todayText = document.getElementById("todayText");
const celsius = document.getElementById("celsius");
const fahrenheit = document.getElementById("fahrenheit");

const apiKey = "eb270393ad5105cb70b19556ef695be8";

btn.addEventListener("click", () => {
  infoBox.style.display = "none";
  loading.style.display = "block";

  let unit = celsius.checked ? "metric" : "imperial";

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

    try {
      const response = await fetch(apiURL);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();

      const place = `${data.name}, ${data.sys.country}`;
      const temp = data.main.temp;
      const condition = data.weather[0].main.toLowerCase();
      const detail = data.weather[0].description;

      let iconName = "default.png";
      let todayMessage = "Weather is normal today.";

      if (condition.includes("clear")) {
        iconName = "sun.png";
        todayMessage = "Today is sunny ☀️";
      } else if (condition.includes("cloud")) {
        iconName = "cloud.png";
        todayMessage = "Today is cloudy ☁️";
      } else if (condition.includes("rain")) {
        iconName = "heavy-rain.png";
        todayMessage = "Today is rainy 🌧️";
      } else if (condition.includes("snow")) {
        iconName = "snow.png";
        todayMessage = "Today is snowy ❄️";
      } else if (condition.includes("fog") || condition.includes("mist")) {
        iconName = "fog.png";
        todayMessage = "It’s foggy outside 🌫️";
      } else if (condition.includes("thunder")) {
        iconName = "thunder.png";
        todayMessage = "Expect thunder today ⛈️";
      }

      icon.src = `icons/${iconName}`;
      locationText.textContent = place;
      temperature.textContent = `${temp}° ${unit === "metric" ? "C" : "F"}`;
      description.textContent = detail;
      todayText.textContent = todayMessage;

      loading.style.display = "none";
      infoBox.style.display = "block";
    } catch (err) {
      console.error("Error:", err);
      loading.style.display = "none";
      alert("Something went wrong while fetching weather info.");
    }
  }, () => {
    loading.style.display = "none";
    alert("Please allow location access to get the weather.");
  });
});

celsius.addEventListener("change", () => btn.click());
fahrenheit.addEventListener("change", () => btn.click());