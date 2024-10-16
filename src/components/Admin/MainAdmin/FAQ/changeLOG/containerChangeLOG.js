import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import React from 'react'

import '../../../../../sass/admin/FAQ/changeLOG/changelog.scss'
import AddInfoChangeLog from './addChangeLog'
import ShowAndEditChangeLog from './showandeditChangeLog'

function ChangeLogContainer() {
  return (
    <>
      <div className="containerChangeLOG">
        <div className="containerTitleAndLinkChangeLog">
          <p className="titleChangeLog">
            Gerenciamento de atualizações do log:
          </p>
          <a
            href="http://localhost:3000/atualizacoespedea"
            target="_blank"
            rel="noreferrer"
          >
            <OpenInNewRoundedIcon className="iconLinkChangeLog" />
          </a>
        </div>

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
