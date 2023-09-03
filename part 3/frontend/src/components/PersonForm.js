const PersonForm = (props) => {
    return (
        <form onSubmit={props.addNumber}>
            <div>
                <div>name: <input value={props.formHandlers.newPerson} onChange={props.formHandlers.handleNewPerson} /></div>
                <div>number: <input value={props.formHandlers.newNumber} onChange={props.formHandlers.handleNewNumber} /></div>
                <div><button type="submit">add</button></div>
            </div>
        </form>
    )
}

export default PersonForm