/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div><label htmlFor='title'>Title </label>
        <input
          id='title'
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor='author'>Author </label>
        <input
          id='author'
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        <label htmlFor='url'>Url </label>
        <input
          id='url'
          value={newUrl}
          onChange={handleUrlChange}
        />
      </div>
      <button id='submitForm' type="submit">create a new blog</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm