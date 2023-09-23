import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import LoginForm from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [blogRender, setBlogRender] = useState(null)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (user || loggedInUser) {
      const userLogged = JSON.parse(loggedInUser)
      setUser(userLogged)
      userService
        .getBlogs(userLogged.id)
        .then((user) => {
          setBlogs(user.blogs)
        })
        .catch((error) => {
          setErrorMsg(`Error Gettting Blogs`)
          setTimeout(() => {
            setErrorMsg(null)
          }, 5000)
        })
    }
  }, [blogRender])

  const loginUser = (event) => {
    event.preventDefault()

    const userLogin = {
      username: username,
      password: password,
    }

    loginService
      .loginUser(userLogin)
      .then((response) => {
        window.localStorage.setItem('loggedInUser', JSON.stringify(response))
        setUser(response)
        setBlogRender(true)
        setUsername('')
        setPassword('')
      })
      .catch((error) => {
        setErrorMsg(`Wrong Credentials: ${error.response.data.error}`)
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
      })
  }

  const logoutUser = (event) => {
    setUser(null)
    setBlogRender(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const formHandlers = {
    username: username,
    password: password,
    handlePassword: handlePassword,
    handleUsername: handleUsername,
  }

  const errorShowcase = () => {
    return (
      <>
        <div className="errorMessage">{errorMsg}</div>
      </>
    )
  }

  const loginform = () => {
    return (
      <>
        <h2>log in to application</h2>
        {errorShowcase()}
        <LoginForm loginUser={loginUser} formHandlers={formHandlers} />
      </>
    )
  }

  const bloglist = () => {
    return (
      <>
        <h2>blogs</h2>
        <div className="userNav">
          {user.name} is logged in <br />
          <button onClick={logoutUser}>logout</button>
        </div>
        <br />
        <div className="blogList">
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </>
    )
  }

  return (
    <div>
      {user === null && loginform()}
      {user !== null && bloglist()}
    </div>
  )
}

export default App
