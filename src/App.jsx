import { useState, useEffect } from 'react';
import axios from 'axios';

function Countries({ countries }) {
  return (
    <>
      {

        countries.length === 1
          ? <div>
            <h2>{countries[0].name.common}</h2>
            <p>capital: {countries[0].capital}</p>
            <p>Area: {countries[0].area}</p>
            <h3>Languages</h3>
            <ul>
              {Object.entries(countries[0].languages).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}

            </ul>
            <img src={countries[0].flags.png} />
          </div >
          : countries.map(country => (
            <li key={country.cca3}>{country.name.common}</li>
          ))

      }
    </>
  );
}

function App() {
  const [name, setName] = useState('');
  const [countries, setCountries] = useState(null);
  const [filterCountries, setFilterCountries] = useState(countries);
  const [message, setMessage] = useState("too many countries");

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      setCountries(response.data);
      setFilterCountries(response.data);
    });
  }, []);

  const handleChange = (filterName) => {
    setName(filterName);
    const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(filterName.toLowerCase())
    );
    setFilterCountries(filteredCountries);
  };

  return (
    <>
      <form>
        <input value={name} onChange={(e) => handleChange(e.target.value)} />
      </form>
      {name === ''
        ? null
        : (filterCountries.length >= 10
          ? <p>{message}</p>
          : <ul style={{ "listStyleType": "none" }}><Countries countries={filterCountries} /></ul>)}
    </>
  );
}

export default App;
