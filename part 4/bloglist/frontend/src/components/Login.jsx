const LoginForm = (props) => {
    return (
        <form onSubmit={props.loginUser}>
            <div>
                <div>username: <input value={props.formHandlers.username} onChange={props.formHandlers.handleUsername} /></div>
                <div>password: <input type="password" value={props.formHandlers.password} onChange={props.formHandlers.handlePassword} /></div>
                <div><button type="submit">login</button></div>
            </div>
        </form>
    )
}

export default LoginForm