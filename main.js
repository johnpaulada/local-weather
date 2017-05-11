const API_KEY   = 'b2709083cba938ec2aba09a017e2285d'
const API_URL   = 'http://api.openweathermap.org/data/2.5/weather'
let lat = 0
let lon = 0

function setCoordinates(callback) {

  // TODO: Add loader
  console.log('Loading...')
  
  navigator.geolocation.getCurrentPosition(
    (position) => {

      // TODO: Remove loader
      console.log('Coordinates loaded.')

      const {latitude, longitude} = position.coords
      lat = latitude
      lon = longitude
      callback()
    },
    (error) => console.log(error)
  );
}

function buildOpenWeatherURL(lat, lon, key) {
  return `${API_URL}?lat=${lat}&lon=${lon}&APPID=${API_KEY}`
}

function fetchWeather() {

  // TODO: Add loader
  console.log('Loading...')

  fetch(buildOpenWeatherURL(lat, lon, API_KEY))
    .then((res) => res.json())
    .then((data) => {

      // TODO: Remove loader
      console.log('Weather loaded.')

      // TODO: Display Data

      console.log(data)
    })
}

setCoordinates(fetchWeather)
