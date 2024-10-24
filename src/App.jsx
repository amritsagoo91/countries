import { useState, useEffect } from 'react';
import axios from 'axios';


function CountryDetails({ country }) {
  if (!country || !country.name) {
    return null
  }
  return <>
    <h1>{country.name.common}</h1>
    <li>{country.capital}</li>
    <li>{country.area}</li>
    <h3>languages</h3>
    {
      Object.entries(country.languages).map(([_, value]) => <li>{value}</li>)
    }
    <img src={country.flags.png} alt={country.flags.alt} style={{ border: "1px solid grey" }}
    />
  </>
}

function CountryList({ countries, onShowClick }) {
  return <ul >
    {
      countries.map(country => <li key={country.name.common}>{country.name.common}{" "}<button onClick={() => onShowClick(country.name.common)}>show</button></li>)
    }
  </ul>
}



function Countries({ countries, onShowClick, selectCountry }) {

  return <>
    {
      countries.length === 1
        ? <CountryDetails country={countries[0]} />
        : <CountryList countries={countries} onShowClick={onShowClick} />
    }
    <CountryDetails country={selectCountry} />
  </>


}


function App() {
  const [name, setName] = useState('');
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState(countries);
  const [selectCountry, setSelectCountry] = useState({});
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
    setSelectCountry(null)
  }

  const handleShow = (countryName) => {
    const foundObjByName = filterCountries.find(country => country.name.common === countryName)
    setSelectCountry(foundObjByName)
  }


  return (
    <>
      <form>
        <input value={name} onChange={(e) => handleChange(e.target.value)} />
      </form>
      {
        name === ''
          ? null
          : filterCountries.length >= 10
            ? <p>{message}</p>
            : <Countries countries={filterCountries} onShowClick={handleShow} selectCountry={selectCountry} />}


    </>
  );
}

export default App;

