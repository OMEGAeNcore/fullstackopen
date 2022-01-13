import React, { useState } from 'react'
import Number from './components/Number'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewPerson = (event) => {
    setNewPerson(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
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

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addNumber}>
        <div>
          <div>name: <input value={newPerson} onChange={handleNewPerson} /></div>
          <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
          <div><button type="submit">add</button></div>
        </div>
      </form>
      <h1>Numbers</h1>
      {
        persons.map(person => 
            <Number key={person.id} person={person} />
          )
      }
    </div>
  )
}

export default App;
