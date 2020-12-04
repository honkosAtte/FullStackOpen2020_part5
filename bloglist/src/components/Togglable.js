/* eslint-disable linebreak-style */
import React, { useState, useImperativeHandle } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background: Cyan;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Orange;
  border-radius: 100px;
`

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  Togglable.displayName = 'Togglable'
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id='toggleButton1' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button id='toggleButton2' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

export default Togglable
