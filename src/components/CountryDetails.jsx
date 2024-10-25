import WeatherDetails from "./WeatherDetails";

function CountryDetails({ country }) {
    if (!country || !country.name || !country.capital) {
        return null
    }
    return <>
        <h1>{country.name.common}</h1>
        <li style={{ listStyleType: 'none' }}>capital {country.capital}</li>
        <li style={{ listStyleType: 'none' }}>area {country.area}</li>
        <h3>languages:</h3>
        {
            Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)
        }
        <br />
        <img src={country.flags.png} alt={country.flags.alt} style={{ border: "1px solid grey" }}
        />
        {country.capital && <WeatherDetails city={country.capital} />}
    </>
}

export default CountryDetails;