import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

import person from "./services/person";

const App = () => {
  const URL = "http://localhost:3001/persons";
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");

  const hook = () => {
    person.getAll().then((initPerson) => {
      setPersons(initPerson);
    });
  };

  useEffect(hook, []);

  const handleNewPerson = (event) => {
    setNewPerson(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const addNumber = (event) => {
    event.preventDefault();
    let hasValue = false;
    let hasId = -1;
    for (let i in persons) {
      if (persons[i].name === newPerson) {
        hasValue = true;
        hasId = persons[i].id;
        break;
      }
    }
    if (
      hasValue &&
      window.confirm(
        `${newPerson} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const findPerson = persons.find((person) => person.id == hasId);
      const changedPersonObject = { ...findPerson, number: newNumber };
      person.update(hasId, changedPersonObject).then((updated) => {
        setPersons(
          persons.map((person) =>
            person.id === hasId
              ? {
                  ...person,
                  number: newNumber,
                }
              : person
          )
        );
      });
    } else {
      const newPersonObject = {
        id: persons.length + 1,
        name: newPerson,
        number: newNumber,
      };
      person.create(newPersonObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
      });
    }

    setNewPerson("");
    setNewNumber("");
  };

  const deleteNumber = (event) => {
    const id = event.target.id;
    const getPerson = persons.filter((person) => person.id == id);

    if (window.confirm(`Delete ${getPerson[0].name}?`)) {
      person.deleteNumber(id).then((deleted) => {
        setPersons(persons.filter((person) => person.id != id));
      });
    }
  };

  const formHandlers = {
    newPerson: newPerson,
    newNumber: newNumber,
    handleNewPerson: handleNewPerson,
    handleNewNumber: handleNewNumber,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new</h3>
      <PersonForm addNumber={addNumber} formHandlers={formHandlers} />

      <h3>Numbers</h3>
      <Person persons={persons} filter={filter} handleDelete={deleteNumber} />
    </div>
  );
};

export default App;
