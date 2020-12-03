import React, { useState }from 'react'
import {
    Switch, Route, Link, useRouteMatch, Redirect
  } from "react-router-dom"

const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
    )
  }

  export default Menu