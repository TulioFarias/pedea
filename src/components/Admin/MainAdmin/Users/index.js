import '../../../../sass/admin/admin.scss'
import React from 'react'
import PropTypes from 'prop-types'
import UserSystem from './UsersSystem'

function Users({setActiveButton, handleOptionChange}) {
  return (
    <>
      <div className="containerWrapperOptions">
        <UserSystem setActiveButton={setActiveButton}
         handleOptionChange={handleOptionChange}/>
      </div>
    </>
  )
}

Users.propTypes = {
  setActiveButton: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
}

export default Users
