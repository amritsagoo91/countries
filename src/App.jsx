import { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

function App() {
  const [name, setName] = useState('');
  const [countries, setCountries] = useState([]);
  const [filterCountries, setFilterCountries] = useState(countries);
  const [selectCountry, setSelectCountry] = useState(null);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        setCountries(response.data);
        setFilterCountries(response.data);
      } catch (error) {
        console.log(error)
        setError(error.message)
      }
    }
    fetchCountries();
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
    const foundObjByName = filterCountries.find(country => country.name.common.toLowerCase() === countryName.toLowerCase())
    setSelectCountry(foundObjByName)

  }
  if (error) {
    return <p>{error}</p>
  }
  return (
    <>
      <form>
        find countries <input value={name} onChange={(e) => handleChange(e.target.value)} />
      </form>
      {
        name === ''
          ? null
          : filterCountries.length >= 10
            ? <p>{"Too many matches, specify another filter"}</p>
            : <Countries countries={filterCountries} onShowClick={handleShow} selectCountry={selectCountry} />}
    </>
  );
}

export default App;

