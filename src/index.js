import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');
import { fetchCountries } from './js/fetchCountries';
import {refs} from './js/refs'

const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', debounce(serchCountry, DEBOUNCE_DELAY));


function serchCountry(evt) {
    const countryName = refs.inputEl.value.trim();

    refs.countryListEl.innerHTML = '';
    refs.countryInfoEl.innerHTML = ''
    
    if (countryName === "") {
        return
    }

    if (countryName.length)
        fetchCountries(countryName)
            .then(renderSearchCountrysList)
            .catch(notFoundCountry)
    
    
}


function renderSearchCountrysList(country) {
    if (country.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
    }
    
    const countrysList = country.map(({ flags: { svg }, name: { common } }) => {
        return `<li class="country__item"><img src="${svg}" alt="${common}" width="60" height="40" class="country__img"/><span class ="country__text">${common}</span></li>`;
      })
        .join('');
    
    if (country.length === 1) {
       return      renderOneCountry(country)
    }
    console.log(country)
    return refs.countryListEl.insertAdjacentHTML('beforeend', countrysList)
    
}


function renderOneCountry(country) {
    const countryCard = country.map(({ flags: { svg }, name: { common }, capital, population, }) => {
        const languages = Object.values(country[0].languages).join(', ');
        
        return `<li class="country-card__item"><div class="country-card__container"><img src="${svg}" alt="${common}" width="60" height="40" class="country-card__img"/><h2 class ="country-card__title">${common}</h2></div>
     <p class="country-card__text">Capital:<span class="country-card__color">${capital}</span></p>
    <p class="country-card__text">Population:<span class="country-card__color">${population}</span></p>
    <p class="country-card__text">Languages:<span class="country-card__color">${languages}</span></p>`;
    }).join('');
    
    Notify.success('The country you were looking for was found');
        
    return refs.countryInfoEl.insertAdjacentHTML('beforeend', countryCard)
}

function notFoundCountry() {
    Notify.failure('Oops, there is no country with that name');
}
// fetchCountries("sw")
