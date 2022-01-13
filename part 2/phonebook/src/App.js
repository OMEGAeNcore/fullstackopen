import React, { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  const handleNewPerson = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()
    let hasValue = false
    for(let i in persons){
      if(persons[i].name === newPerson){
        hasValue = true
        break
      }
    }
    if(hasValue){
      window.alert(`${newPerson} is already added to phonebook`)
      setNewPerson('')
      setNewNumber('')
    } else {
        const newPersonObject = {
          id: persons.length + 1,
          name: newPerson,
          number: newNumber
        }
    
        setPersons(persons.concat(newPersonObject))
        setNewPerson('')
        setNewNumber('')
    }
  }

  const formHandlers = {
    newPerson: newPerson,
    newNumber: newNumber,
    handleNewPerson: handleNewPerson,
    handleNewNumber: handleNewNumber
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new</h3> 
      <PersonForm addNumber={addNumber} formHandlers={formHandlers} />
      
      <h3>Numbers</h3>
      <Person persons={persons} filter={filter}/>
      
    </div>
  )
}

export default App;
