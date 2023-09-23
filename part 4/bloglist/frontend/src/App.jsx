import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [blogRender, setBlogRender] = useState(null)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (user || loggedInUser) {
      const userLogged = JSON.parse(loggedInUser)
      setUser(userLogged)
      blogService.setToken(userLogged.token)
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
        blogService.setToken(response.token)
        setBlogRender(response)
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
    blogService.setToken('')
    window.localStorage.removeItem('loggedInUser')
  }

  const postBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
      userId: user.id
    }


    blogService.create(newBlog).then((response) => {
      setSuccessMsg(`Successfully added new blog - ${response.title} by ${response.author}`)
      setTimeout(() => {
          setSuccessMsg(null)
        }, 5000)
      setBlogRender(response)
      setTitle('')
      setAuthor('')
      setUrl('')
    }).catch((error) => {
      setErrorMsg(`Blog Creation Failed: ${error.response.data.error}`)
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
    })
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }
  const handleTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrl = (event) => {
    setUrl(event.target.value)
  }

  const formHandlers = {
    username: username,
    password: password,
    title: title,
    author: author,
    url: url,
    handlePassword: handlePassword,
    handleUsername: handleUsername,
    handleTitle: handleTitle,
    handleAuthor: handleAuthor,
    handleUrl: handleUrl,
  }

  const errorShowcase = () => {
    return (
      <>
        <div className="errorMessage">{errorMsg}</div>
      </>
    )
  }

  const successShowcase = () => {
    return (
      <>
        <div className="successMessage">{successMsg}</div>
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

  const blogcreate = () => {
    return (
      <>
        <h2>create new</h2>
        {errorShowcase()}
        <BlogForm postBlog={postBlog} formHandlers={formHandlers} />
      </>
    )
  }

  const bloglist = () => {
    return (
      <>
        <h2>blogs</h2>
        {successShowcase()}
        <br />
        <div className="userNav">
          {user.name} is logged in <br />
          <button onClick={logoutUser}>logout</button>
        </div>
        <br />
        {blogcreate()}
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
