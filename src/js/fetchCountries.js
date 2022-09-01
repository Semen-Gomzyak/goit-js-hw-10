const BASE_URL = 'https://restcountries.com/v3.1/name/';
const BASE_OPTIONS = '?fields=name,capital,population,flags,languages'

export function fetchCountries(name) {
  return  fetch(`${BASE_URL}${name}${BASE_OPTIONS}`)
    .then(response => response.json());
}
