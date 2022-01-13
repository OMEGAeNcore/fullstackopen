const Person = ({ persons, filter }) => {
    return (
        <div>
            {
                persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => 
                    <div> {person.name} {person.number} </div>
                )
            }
        </div>    
    )
}

export default Person