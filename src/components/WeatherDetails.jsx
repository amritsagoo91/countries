import { useState, useEffect } from "react"
import axios from "axios"

function WeatherDetails({ city }) {
    const api_key = import.meta.env.VITE_SOME_KEY
    const [weather, setWeather] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        setWeather(null)
        setError(null)
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
                setWeather(response.data)
            } catch (error) {
                setError(error)
                console.log(error)
            }
        }
        fetchCountries()

    }, [city, api_key])
    if (error) {
        return <p>{error.message}</p>
    }
    if (!weather || !weather.main || !weather.weather) {
        return null;
    }

    return <>
        <h3>Weather in {city}</h3>
        <p>temperature {((weather.main.temp) - 273.15).toFixed(2)} Celcius</p>
        <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
        />
        <p>wind {weather.wind.speed} m/s</p>
    </>

}

export default WeatherDetails;