/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'

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

const Persons = ({ persons }) => {
    return (
        <div>
            {persons.map(person => <Person key={person.name} person={person} />)}
        </div>
    )
}

const Person = ({ person }) => {
    return (
        <p>{person.name} {person.number}</p>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilterInput, setNewFilterInput] = useState('')

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
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
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

            <Persons persons={personsToShow} />

        </div>
    )

}

export default App