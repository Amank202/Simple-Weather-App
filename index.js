const loc_inp = document.getElementById("loc_inp");
const loc_btn = document.getElementById("loc_btn");
const auto_loc_btn = document.getElementById("auto_loc_btn");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const time = document.getElementById("time");

async function getReport(name) {
  const promise = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=e14a8cd6cb2f45fba89160304243010&q=${name}&aqi=yes`
  );
  return await promise.json();
}

async function getAutoReport(lat, long) {
  const promise = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=e14a8cd6cb2f45fba89160304243010&q=${lat},${long}&aqi=yes`
  );
  return await promise.json();
}

loc_btn.addEventListener("click", async () => {
  const inp = loc_inp.value;
  const result = await getReport(inp);
  city_name.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
  temp.innerText = `Temperature - ${result.current.temp_c}`;
  time.innerText = `Date & Time - ${result.location.localtime}`;
});

auto_loc_btn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    async (location) => {
      const result = await getAutoReport(
        location.coords.latitude,
        location.coords.longitude
      );
      city_name.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
      temp.innerText = `Temperature - ${result.current.temp_c}`;
      time.innerText = `Date & Time - ${result.location.localtime}`;
    },
    () => {
      console.log("Something went wrong");
    }
  );
});
