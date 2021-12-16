import Part from "./Part"

const Content = (props) => {
    return (
        <>
            
            <Part part={props.parts[0]} exercise={props.exercises[0]} />
            <Part part={props.parts[1]} exercise={props.exercises[1]} />
            <Part part={props.parts[2]} exercise={props.exercises[2]} />
            
        </>
    )
}

export default Content