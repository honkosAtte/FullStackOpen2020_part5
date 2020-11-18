import React from 'react'

const DeleteButton = ({clickHandler, id}) => {

    const deleteObj = () => clickHandler(id)

    return (<button id='deleteButton' onClick={deleteObj}>delete</button>)
}

export default DeleteButton