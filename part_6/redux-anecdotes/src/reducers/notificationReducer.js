const initialNotificiationState = { message : 'alkuarvo' }

const notificationReducer = (state =  initialNotificiationState.message, action) => {
    //console.log('state now: ', state)
    //console.log('action', action)
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

  export const setNotification = (content, timeOutTime) => {
    return async dispatch => {
      dispatch({
        type: 'NEW_NOTIFICATION',
        data: content,
      })
      setTimeout(() => {
        dispatch({
          type: 'NEW_NOTIFICATION',
          data: '',
        })
      }, 1000 * timeOutTime)



    }
  }

  export default notificationReducer