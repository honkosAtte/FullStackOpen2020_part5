const notificationReducer = (state =  'alkuarvo', action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch(action.type) {
      case 'NEW_NOTIFICATION':
        return [...state]
      default:
        return state
    }
  }


  export const addNotification= (notification) => {
    return {
      type: 'NEW_NOTIFICATION',
      data:  notification 
    }
  }

  export default notificationReducer