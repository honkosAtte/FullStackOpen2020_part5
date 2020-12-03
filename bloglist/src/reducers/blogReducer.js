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
          blog.id !== blogid ? blog : changedBlog1) //Tämä ei ole vielä valmis, pitää refreshata selain että toimii
      case 'INIT_BLOGS':
        return action.data
      case 'NEW_LIKE':
        const id = action.data.blog.id
        const blogToChange = state.find(n => n.id === id)
        const changedBlog = { 
          ...blogToChange, votes: blogToChange.votes +1 } 
  
        return state.map(blog =>
          blog.id !== id ? blog : changedBlog)
        
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

export const addNewBlogComment = (newBlog, id) => {
  return async dispatch => {
  const blogComment = await blogService.createComment(newBlog, id)
  dispatch({
    type: 'NEW_BLOG_COMMENT',
    data: {newComment: blogComment, blogId: id}
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
//delete actiondispatcher myös