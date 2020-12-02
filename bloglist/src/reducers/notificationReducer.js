const initialNotificiationState = { message : '' }

const notificationReducer = (state =  initialNotificiationState.message, action) => {
    // console.log('state now: ', state)
    // console.log('action', action)
    switch(action.type) {
      case 'NEW_NOTIFICATION':
        return {...state.notification, message : action.data}
      case 'NEW_VOTE_NOTIFICATION':
        return {...state.notification, message : action.data.content}
      default:
        return state
    }
  }


  export const addNotification = (content) => {
    return {
      type: 'NEW_NOTIFICATION',
      data:  content 
    } 
  }

  export const addVoteNotification= (notification) => {
    return {
      type: 'NEW_VOTE_NOTIFICATION',
      data:  notification 
    }
  }

  let timeoutId;


  export const setNotification = (content) => {
    clearTimeout(timeoutId)
    return async dispatch => {
      dispatch({
        type: 'NEW_NOTIFICATION',
        data: content,
      })
      timeoutId = setTimeout(() => {
        dispatch({
          type: 'NEW_NOTIFICATION',
          data: '',
        })
      }, 5000)



    }
  }

  export default notificationReducer