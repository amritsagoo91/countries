

function CountryList({ countries, onShowClick }) {
    return <ul >
        {
            countries.map(country =>
                <li key={country.ccn3 || country.cca3 || country.name.common}>
                    {country.name.common}{" "}
                    <button onClick={() => onShowClick(country.name.common)}>show</button>
                </li>)
        }
    </ul>
}

export default CountryList;