/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, addNewBlogREDUX as addNewBlog } from './reducers/blogReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const blogsFromRedux = useSelector(state => state.blogs)


  useEffect(() => {
    dispatch(initializeBlogs()) 
  },[dispatch]) 

  // useEffect(() => {
  //   blogService
  //     .getAll()
  //     .then(initialBlogs => {
  //       setBlogs(initialBlogs)
  //     })
  // }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()


  const deleteBlog = id => {
    try {
      blogService.deleteOne(id).then(x => setBlogs(blogs.filter(row => row.id !== id)))
      
      dispatch(setNotification('Item deleted!'))
    } catch (excepton) {
      dispatch(setNotification('You do not have permission to delete this'))
    }
    

    
  
  }

  const addBlog = (blogObject) => {
    dispatch(addNewBlog(blogObject))
    blogFormRef.current.toggleVisibility()
    dispatch(setNotification(`Blog with title ${blogObject.title} created!`))
  }

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
      dispatch(setNotification('wrong credentials'))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
    dispatch(setNotification('logged out'))
  }



  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button 
      id="login-button"
      type="submit">login</button>
    </form>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button id='logout' onClick={handleLogout}>logout</button>
          <Togglable buttonLabel='new note' ref={blogFormRef} >
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      }

      <br />
      <ul>
        {blogsFromRedux.map((blog) =>
          <Blog
            key={blog.id}
            blog={blog}
            deleteBlog={deleteBlog}
          />
        )}
      </ul>

    </div>
  )
}

export default App