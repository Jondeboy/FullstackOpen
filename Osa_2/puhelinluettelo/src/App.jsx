/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'
import numberService from './services/numbers'

const SuccessNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="success">
            {message}
        </div>
    )
}

const ErrorNotification = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}

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
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

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
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const person = persons.find(person => person.name === newName)
                const changedPerson = { ...person, number: newNumber }
                numberService
                    .update(person.id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
                        setSuccessMessage(`Updated ${person.name}`)
                        setTimeout(() => {
                            setSuccessMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setErrorMessage(`Information of ${person.name} has already been removed from server`)
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                        setPersons(persons.filter(p => p.id !== person.id))
                    })
                    
            }
        } else {
            numberService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setSuccessMessage(`Added ${returnedPerson.name}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
                })
        }

        setNewName('')
        setNewNumber('')
        
    }

    const deleteNumber = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            numberService
                .deletePerson(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                    setSuccessMessage(`Deleted ${name}`)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000)
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

            <SuccessNotification message={successMessage} />
            <ErrorNotification message={errorMessage} />

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