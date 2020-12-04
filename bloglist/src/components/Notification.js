import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const NotificationWrapper = styled.div`
  padding: 2em;
  background: magenta;
  text: red
`

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return (
    <NotificationWrapper>
      {
        notification.message === null ?
          <div></div> :
          <div 
          id="error"
          className="error">
            {notification.message}
          </div>
      }
    </NotificationWrapper>
  )
}


export default Notification