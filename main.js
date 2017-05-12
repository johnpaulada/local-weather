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

function decorateParam(url, key, value) {
  const separator = url.includes('?') ? '&' : '?'

  return `${url}${separator}${key}=${value}`
}

function makeParameterAdder(param) {
  return function(url, value) {
    return decorateParam(url, param, value)
  }
}

/**
 * Builds a valid OpenWeatherMap API URL.
 *
 * @param {string} url The original OpenWeatherMap API URL,
 * @param {Object} coords The coordinates of
 *    the place where the weather should be taken.
 * @param {string} unitSystem The unit system of the measurements,
 *     e.g. Metric or Imperial.
 * @param {string} key The OpenWeatherMap API key.
 * @return {string} A valid OpenWeatherMap URL.
 */
function buildOpenWeatherURL(url, coords, unitSystem, key) {
  const addLatitudeParam = makeParameterAdder('lat')
  const addLongitudeParam = makeParameterAdder('lon')
  const addUnitSystemParam = makeParameterAdder('units')
  const addApiKeyParam = makeParameterAdder('APPID')

  const paramsList = [
    [addLatitudeParam, coords.latitude],
    [addLongitudeParam, coords.longitude],
    [addUnitSystemParam, unitSystem],
    [addApiKeyParam, key],
  ]

  return paramsList.reduce((url, param) => param[0](url, param[1]), url)
}

function fetchWeather(coords) {
  const url = buildOpenWeatherURL(API_URL, coords, UNIT_SYSTEM.METRIC, API_KEY)

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
