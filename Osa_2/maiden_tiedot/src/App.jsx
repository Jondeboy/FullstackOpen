import { useState, useEffect } from 'react'
import axios from 'axios'


const ShowCountry = ({ country }) => {
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
        </div>
    )
}

const ShowCountries = ({ countries, searchText }) => {
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
            {countries.map(country => <div key={country.name.common}>{country.name.common}</div>)}
        </div>
    )
}


function App() {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [search, setSearch] = useState('')

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
        const filteredCountriesList = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
        setFilteredCountries(filteredCountriesList)
    }

  return (
      <div>
          Find countries <input value={search} onChange={handleSearchChange} />
          <ShowCountries countries={filteredCountries} searchText={search} />
      </div>
  )
}

export default App