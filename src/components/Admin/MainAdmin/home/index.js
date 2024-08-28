import '../../../../sass/admin/admin.scss'
import React from 'react'
import PropTypes from 'prop-types'
import HomeSystem from './homeSystem'

function HomeAdmin({setActiveButton, handleOptionChange}) {
  return (
    <>
      <div className="containerWrapperOptions">
        <HomeSystem setActiveButton={setActiveButton}
         handleOptionChange={handleOptionChange}/>
      </div>
    </>
  )
}

HomeAdmin.propTypes = {
  setActiveButton: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
}

export default HomeAdmin
