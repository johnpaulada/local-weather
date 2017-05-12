const {buildURL} = ParamHelpers
const API_KEY   = 'b2709083cba938ec2aba09a017e2285d'
const API_URL   = 'http://api.openweathermap.org/data/2.5/weather'
const UNIT_SYSTEM = {
  METRIC: 'metric',
  IMPERIAL: 'imperial'
}

function setCoordinates(callback) {

  // TODO: Add loader
  console.log('Loading...')

  navigator.geolocation.getCurrentPosition(
    (position) => {

      // TODO: Remove loader
      console.log('Coordinates loaded.')
      callback(position.coords)
    },
    (error) => console.log(error)
  );
}

function fetchWeather({latitude, longitude}) {
  const url = buildURL(API_URL, {
    'lat': latitude,
    'lon': longitude,
    'units': UNIT_SYSTEM.METRIC,
    'APPID': API_KEY
  })

  // TODO: Add loader
  console.log('Loading...')

  fetch(url)
    .then((res) => res.json())
    .then((data) => {

      // TODO: Remove loader
      console.log('Weather loaded.')

      // TODO: Display Data
      console.log(data)
    })
}

setCoordinates(fetchWeather)
