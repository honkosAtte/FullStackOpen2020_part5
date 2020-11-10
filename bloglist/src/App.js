import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  //async await !!!
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
    setErrorMessage(`Blog with title ${blogObject.title} created!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  // const toggleImportanceOf = (id) => {
  //   const blog = blogs.find(n => n.id === id)
  //   const changedBlog = { ...blog, important: !blog.important }

  //   blogService
  //     .update(id, changedBlog)
  //     .then(returnedBlog => {
  //       setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
  //     })
  //     .catch(error => {
  //       setErrorMessage(
  //         `Blog '${blog.content}' was already removed from server` // Tässä virhe
  //       )
  //       setTimeout(() => {
  //         setErrorMessage(null)
  //       }, 5000)   
  //     })
  // }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setUsername('')
      setPassword('')
  
      setErrorMessage('logged out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div><label for='title'>Title </label>
      <input
        id='title'
        value={newTitle}
        onChange={handleTitleChange}
      />
      </div>
      <div>
      <label for='author'>Author </label>
      <input
        id='author'
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      </div>
      <div>
      <label for='url'>Url </label>
      <input
        id='url'
        value={newUrl}
        onChange={handleUrlChange}
      />
      </div>
      <button type="submit">create a new blog</button>
    </form>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
        </div>
      }

      <br/>
      <ul>
        {blogs.map((blog) =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </ul>

    </div>
  )
}

export default App 