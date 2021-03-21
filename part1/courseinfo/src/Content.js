import Part from './Part'

const Content = (props) => (
    <>
        <Part part={props.content[0].name} exercise={props.content[0].exercise} />
        <Part part={props.content[1].name} exercise={props.content[1].exercise} />
        <Part part={props.content[2].name} exercise={props.content[2].exercise} />
    </>
)

export default Content