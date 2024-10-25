import CountryDetails from "./CountryDetails";
import CountryList from "./CountryList";

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
export default Countries;