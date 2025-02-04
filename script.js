let allCountries = [];
function getCountries() {
  $.ajax({
    url: 'https://restcountries.com/v3.1/all',
    type: 'GET',
    success: function (response) {
      allCountries = response;
      displayCountries(response);
    },
    error: function (xhr, status, error) {
      console.error('Error fetching country data:', error);
    },
  });
}

function displayCountries(countries) {
  const countriesList = $('#countries-list');
  countriesList.empty();

  countries.forEach((country) => {
    const countryCard = `
      <div class="country-card" onclick="showCountryDetail('${country.cca3}')">
        <img src="${country.flags.png}" alt="Bendera ${country.name.common}">
        <h3>${country.name.common}</h3>
        <p><strong>Ibukota:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Wilayah:</strong> ${country.region}</p>
        <p><strong>Populasi:</strong> ${country.population.toLocaleString()}</p>
      </div>
    `;
    countriesList.append(countryCard);
  });
}

function getContinents() {
  const continents = ['Asia', 'Africa', 'Europe', 'Oceania', 'Americas'];
  const countriesList = $('#countries-list');
  countriesList.empty();

  continents.forEach((continent) => {
    const continentCard = `
      <div class="country-card" onclick="filterByContinent('${continent}')">
        <h3>${continent}</h3>
      </div>
    `;
    countriesList.append(continentCard);
  });
}

function filterByContinent(continent) {
  const filteredCountries = allCountries.filter((country) => country.region === continent);
  displayCountries(filteredCountries);
}

function showCountryDetail(countryCode) {
  const country = allCountries.find((c) => c.cca3 === countryCode);

  if (country) {
    const countryDetail = `
      <div id="country-detail">
        <img src="${country.flags.png}" alt="Bendera ${country.name.common}">
        <h3>${country.name.common}</h3>
        <p><strong>Ibukota:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Wilayah:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion ? country.subregion : 'N/A'}</p>
        <p><strong>Populasi:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Luas:</strong> ${country.area.toLocaleString()} km²</p>
        <p><strong>Bahasa:</strong> ${Object.values(country.languages || {}).join(', ')}</p>
        <p><strong>Mata Uang:</strong> ${Object.values(country.currencies || {})
          .map((c) => c.name)
          .join(', ')}</p>
      </div>
    `;

    const countriesList = $('#countries-list');
    countriesList.empty();
    countriesList.append(countryDetail);
  } else {
    console.error('Negara tidak ditemukan.');
  }
}

function searchCountries() {
  const query = $('#search-input').val().toLowerCase();
  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(query)
  );
  displayCountries(filteredCountries);
}
