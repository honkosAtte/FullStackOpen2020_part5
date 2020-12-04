import blogService from '../services/blogs'



const blogReducer = (state = [], action) => {
    switch(action.type) {
      case 'NEW_BLOG':
        return [...state, action.data]
      case 'NEW_BLOG_COMMENT':
        const blogid = action.data.blogId
        const blogToChange1 = state.find(n => n.id === blogid.toString())
        const changedBlog1 = { 
          ...blogToChange1, comments: blogToChange1.comments.concat(action.data.newComment) } 
        return state.map(blog =>
          blog.id !== blogid ? blog : changedBlog1)
      case 'INIT_BLOGS':
        return action.data
      case 'NEW_LIKE':
        return state.map(blog =>
          blog.id !== action.data.blogId ? blog : action.data.updatedBlog)
      case 'DELETE_BLOG':
        const deleteId = action.data
        return state.filter(blog => blog.id !== deleteId)
      default:
        return state
    }
  }

export const addNewBlogREDUX = (newBlog) => {
    return async dispatch => {
    const blog = await blogService.create(newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: blog,
    })
  }
}

export const addNewBlogComment = (comment, id) => {
  return async dispatch => {
  const blogComment = await blogService.createComment(comment, id)
  dispatch({
    type: 'NEW_BLOG_COMMENT',
    data: {newComment: blogComment, blogId: id}
  })
}
}

export const addNewLikeForBlog = (newBlog, id) => {

  const blogToUpdate = {
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
    likes: newBlog.likes +1
  }
  return async dispatch => {
  const updatedBlog = await blogService.update(blogToUpdate, id)
  dispatch({
    type: 'NEW_LIKE',
    data: {updatedBlog: updatedBlog, blogId: id}
  })
}
}



export const setDeleteBlog = (id) => {
  return async dispatch => {
  const deleteOne = await blogService.deleteOne(id)

  dispatch({
    type: 'DELETE_BLOG',
    data: id
})
  }
}


export const initializeBlogs = () => {
      return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs,
      })
    }
  }
  

  export default blogReducer
