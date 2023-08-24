const Person = ({ persons, filter, handleDelete }) => {
    return (
        <div>
            {
                persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => 
                    <div key={person.id}> {person.name} {person.number} 
                    <button onClick={handleDelete} id={person.id} >delete</button>
                    </div>
                )
            }
        </div>    
    )
}

export default Person