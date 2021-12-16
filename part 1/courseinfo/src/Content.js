import Part from "./Part"

const Content = (props) => {
    return (
        <>
            {/* {console.log(props.parts[0].exercises)} */}
            <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
            <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
            <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
            
        </>
    )
}

export default Content