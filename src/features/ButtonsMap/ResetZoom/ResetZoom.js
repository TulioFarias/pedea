// import Zoom from 'ol/control/Zoom'
// import React, { useEffect, useRef } from 'react'

// import { vector } from '../../_config/layers/'
// import { zoom, center } from '../../_config/map'

// function ResetZoom(props) {
//   const element = useRef()

//   const restoreElement = useRef()

//   useEffect(() => {
//     const control = new Zoom({ className: 'ol-zoom', target: element.current })

//     map.addControl(control)
//   }, [])

//   const handleClick = () => {
//     vector.getSource().clear()
//     props.map.getView().setZoom(zoom)
//     props.map.getView().setCenter(center)
//     // props.map.un('singleclick',localStorage.getItem('singleclick'));
//   }

//   return (
//     <div className="ResetZoom">
//       <input
//         type="image"
//         alt="Redimensionar zoom"
//         title="Redimensionar zoom"
//         onClick={handleClick}
//         ref={restoreElement}
//       ></input>
//       <div ref={element} className="ResetZoomContent">
//         {' '}
//       </div>
//     </div>
//   )
// }

// export default ResetZoom
