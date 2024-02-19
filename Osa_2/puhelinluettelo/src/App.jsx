/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'
import numberService from './services/numbers'

const Filter = ({ value, onChange }) => {
    return (
        <div>
            Filter shown with <input placeholder="Search" value={value} onChange={onChange} />
        </div>
    )
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addNumber }) => {
    return (
        <form onSubmit={addNumber}>
            <div>
                name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
            </div>
            <div>
                number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = ({ persons, deleteNumber }) => {
    return (
        <div>
            {persons.map(person => <Person key={person.name} person={person} deleteNumber={deleteNumber} />)}
        </div>
    )
}

const Person = ({ person, deleteNumber }) => {
    return (
        <p>
            {person.name} {person.number}
            <button style={{ marginLeft: '10px' }} onClick={() => deleteNumber(person.id, person.name)}>Delete</button>
        </p>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilterInput, setNewFilterInput] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

    console.log('render', persons.length, 'persons')

    const addNumber = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        numberService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
            })
    }

    const deleteNumber = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            numberService
                .deletePerson(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
    }

    const personsToShow = !newFilterInput
        ? persons
        : persons.filter(person =>
            person.name.toLowerCase().includes(newFilterInput.toLowerCase()) ||
            person.number.includes(newFilterInput)
        );


    return (
        <div>
            <h2>Phonebook</h2>

            <Filter value={newFilterInput} onChange={(event) => setNewFilterInput(event.target.value)} />

            <h2>Add a new</h2>

            <PersonForm
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                addNumber={addNumber}
            />

            <h2>Numbers</h2>

            <Persons persons={personsToShow} deleteNumber={deleteNumber} />

        </div>
    )

}

export default App