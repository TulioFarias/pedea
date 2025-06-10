import '../../../../sass/admin/admin.scss'
import PropTypes from 'prop-types'

import GeoserverSystem from './GeoserverSystem'

function Geoserver({setActiveButton, handleOptionChange}) {
  return (
    <>
        <GeoserverSystem setActiveButton={setActiveButton}
         handleOptionChange={handleOptionChange}/>
    </>
  )
}

Geoserver.propTypes = {
  setActiveButton: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
}

export default Geoserver
