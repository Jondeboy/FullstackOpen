import { useState, useEffect } from 'react'
import axios from 'axios'


const ShowCountry = ({ country }) => {
    const [weather, setWeather] = useState('');

    axios.get(`http://wttr.in/${country.capital}?format=%C+%t`)
        .then(response => {
            console.log(response.data)
            setWeather(response.data)
        })
        .catch(error => {
            console.error('Error fetching weather', error);
        });
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>Capital: {country.capital}</div>
            <div>Area: {country.area}</div>
            <h2>Languages: </h2>
            <ul>
                {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt="Flag" width="100px" />

            <h1>Weather in {country.name.common}</h1>
            <p>{weather}</p>
        </div>
    )
}

const ShowCountries = ({ countries, searchText, setSelectedCountry }) => {
    if (searchText.length > 0 && countries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    } else if (countries.length === 1) {
        return (
            <ShowCountry country={countries[0]} />
        )
    } else if (searchText.length > 0 && countries.length === 0) {
        return (
            <div>
                <p>No matches</p>
            </div>
        )
    } else if (searchText.length === 0) {
        return (
            <div></div>
        )
    }

    return (
        <div>
            {countries.map(country => <div key={country.name.common}>{country.name.common} <button onClick={() => setSelectedCountry(country)}>Show</button></div>)}
        </div>
    )
}


function App() {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [search, setSearch] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
            .then(response => {
                setCountries(response.data)
                console.log("Countries: ", response.data)
            })
    }, [])

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        setSelectedCountry(null)
        const filteredCountriesList = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
        setFilteredCountries(filteredCountriesList)
    }

  return (
      <div>
          Find countries <input value={search} onChange={handleSearchChange} />
          <ShowCountries countries={filteredCountries} searchText={search} setSelectedCountry={setSelectedCountry} />
          {selectedCountry && <ShowCountry country={selectedCountry} />}
      </div>
  )
}

export default App
