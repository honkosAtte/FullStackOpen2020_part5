import blogService from '../services/blogs'

const currentUserReducer = (state = null, action) => {
    switch(action.type) {
      case 'INIT_CURRENT_USER':
      return action.data
        
      default:
        return state
    }
  }


export const initializeCurrentUser = () => {
      return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        let user = null
        if (loggedUserJSON) {
          user = JSON.parse(loggedUserJSON)
          blogService.setToken(user.token)
        }
        console.log('INIT UUSERi', user)

      dispatch({
        type: 'INIT_CURRENT_USER',
        data: user,
      })
    }
  }


export const loginCurrentUser = (user) => {
  return async dispatch => {
    console.log('LOGIN UUSERi', user)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
  dispatch({
    type: 'INIT_CURRENT_USER',
    data: user,
  })
}
}



export const logoutCurrentUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
  dispatch({
    type: 'INIT_CURRENT_USER',
    data: null,
  })
}
}



  export default currentUserReducer