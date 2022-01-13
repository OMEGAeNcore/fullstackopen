import React, { useState } from 'react'
import Number from './components/Number'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')

  const handleNewNumber = (event) => {
    setNewPerson(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()
    const newPersonObject = {
      id: persons.length + 1,
      name: newPerson
    }

    setPersons(persons.concat(newPersonObject))
    setNewPerson('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onClick={addNumber}>
        <div>
          <label>Name:</label>
          <input value={newPerson} onChange={handleNewNumber} />        
          <button type='submit'>Add</button>
        </div>
      </form>
      <h1>Numbers</h1>
      {
        persons.map(person => 
            <Number key={person.id} name={person.name} />
          )
      }
    </div>
  )
}

export default App;
