const initialNotificiationState = { message : 'alkuarvo' }

const notificationReducer = (state =  initialNotificiationState.message, action) => {
    //console.log('state now: ', state)
    //console.log('action', action)
    switch(action.type) {
      case 'NEW_NOTIFICATION':
        return {...state.notification, message : `You created "${action.data}"`}
      case 'NEW_VOTE_NOTIFICATION':
        return {...state.notification, message : `You voted "${action.data.content}"`}
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

  export default notificationReducer