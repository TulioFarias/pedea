import React from 'react'

import '../../../../../sass/admin/FAQ/changeLOG/changelog.scss'
import AddInfoChangeLog from './addChangeLog'
import ShowAndEditChangeLog from './showandeditChangeLog'
function ChangeLogContainer() {
  return (
    <>
      <div className="containerChangeLOG">
        <p className="titleChangeLog">Gerenciamento de atualizações do log:</p>
        <hr />
        <div>
          <AddInfoChangeLog />
        </div>

        <div>
          <ShowAndEditChangeLog />
        </div>
      </div>
    </>
  )
}

export default ChangeLogContainer
