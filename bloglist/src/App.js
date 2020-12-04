/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, addNewBlogREDUX as addNewBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeCurrentUser, loginCurrentUser, logoutCurrentUser } from './reducers/currentUserReducer'
import {
  Switch, Route, useRouteMatch
} from "react-router-dom"
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import Menu from './components/Menu'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const blogsFromRedux = useSelector(state => state.blogs)
  const usersFromRedux = useSelector(state => state.users)
  const currentUserFromRedux = useSelector(state => state.currentUser)


  useEffect(() => {
    dispatch(initializeBlogs()) 
  },[dispatch]) 

  useEffect(() => {
    dispatch(initializeUsers()) 
  },[dispatch]) 

  useEffect(() => {
    dispatch(initializeCurrentUser()) 
  }, [])

  const blogFormRef = useRef()
  
  const userMatch = useRouteMatch('/users/:id')
  const userById = (id) => usersFromRedux.find(a => a.id === id)
  const detailedUser = userMatch ? userById(userMatch.params.id.toString()) : null
  
  const blogMatch = useRouteMatch('/blogs/:id')
  const blogById = (id) => blogsFromRedux.find(a => a.id === id)
  const detailedBlog = blogMatch ? blogById(blogMatch.params.id.toString()) : null


  
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
      dispatch(loginCurrentUser(user)) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong credentials'))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logoutCurrentUser()) 
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
      <Menu />

      {currentUserFromRedux === null ?
        loginForm() :
        <div>
          <p>{currentUserFromRedux.name} logged in</p>
          <button id='logout' onClick={handleLogout}>logout</button>
          <Togglable buttonLabel='new note' ref={blogFormRef} >
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      }
      <br />
<Switch>
<Route path='/blogs/:id'>
        <BlogDetails detailedBlog={detailedBlog}/>
  </Route>
  <Route path='/users/:id'>
        <UserDetails detailedUser={detailedUser}/>
  </Route>
  <Route path='/users'>
<Users/>
  </Route>
  <Route path='/'>
  <ul>
        {blogsFromRedux.sort((a, b) => b.likes - a.likes).map((blog) =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </ul>
</Route>
</Switch>

    </div>
  )
}

export default App