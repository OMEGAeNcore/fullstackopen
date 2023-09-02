import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

import person from "./services/person";

const App = () => {
  const URL = "http://localhost:3001/persons";
  const [persons, setPersons] = useState(null);
  const [newPerson, setNewPerson] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);
  const [personIds, setPersonIds] = useState(0);

  const hook = () => {
    person.getAll().then((initPerson) => {
      setPersons(initPerson);
      setPersonIds(initPerson.length);
    });
  };

  useEffect(hook, []);

  if(!persons){
    return null
  }

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
      person
        .update(hasId, changedPersonObject)
        .then((updated) => {
          setMessage(
            `Updated 
            ${changedPersonObject.name}`
          );
          setType("UPDATED");
          setTimeout(() => {
            setMessage(null);
            setType(null);
          }, 5000);
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

          setNewPerson("");
          setNewNumber("");
        })
        .catch((error) => {
          setMessage(
            `Information of  
            ${changedPersonObject.name} has already been removed from server`
          );
          setType("NO_DATA");
          setTimeout(() => {
            setMessage(null);
            setType(null);
          }, 5000);
        });
    } else {
      const newPersonObject = {
        id: personIds + 1,
        name: newPerson,
        number: newNumber,
      };
      setPersonIds(personIds + 1);

      person.create(newPersonObject).then((newPerson) => {
        setMessage(
          `Added 
            ${newPersonObject.name}`
        );
        setType("ADDED");
        setTimeout(() => {
          setMessage(null);
          setType(null);
        }, 5000);
        setPersons(persons.concat(newPerson));

        setNewPerson("");
        setNewNumber("");
      });
    }
  };

  const deleteNumber = (event) => {
    const id = event.target.id;
    const getPerson = persons.filter((person) => person.id == id);

    if (window.confirm(`Delete ${getPerson[0].name}?`)) {
      person.deleteNumber(id).then((deleted) => {
        setMessage(
          `Deleted 
            ${getPerson[0].name}`
        );
        setType("DELETED");
        setTimeout(() => {
          setMessage(null);
          setType(null);
        }, 5000);
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
      <Notification message={message} type={type} />
      <Filter filter={filter} handleFilter={handleFilter} />

      <h3>Add a new</h3>
      <PersonForm addNumber={addNumber} formHandlers={formHandlers} />

      <h3>Numbers</h3>
      <Person persons={persons} filter={filter} handleDelete={deleteNumber} />
    </div>
  );
};

export default App;
