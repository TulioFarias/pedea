import '../../../../sass/admin/FAQ/FAQ.scss'

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import React from 'react'

import ChangeLogContainer from './changeLOG/containerChangeLOG'
import AddInfoFAQ from './containersFAQ/containerAddFAQ'
import ShowContainerEditFAQ from './containersFAQ/containerEditFAQ'
function FAQ() {
  return (
    <>
      <div className="containerWrapperOptions" id="containerFAQs">
        <div className="ContainerAllFAQ">
          <div className="containerTitleFAQ">
            <h1>Gerenciamento de Perguntas Frequentes:</h1>
            <a
              href="http://localhost:3000/perguntasfrequentes"
              target="_blank"
              rel="noreferrer"
            >
              <OpenInNewRoundedIcon className="iconTitleFAQlink" />
            </a>
          </div>

          <hr />
          <div className="containerOneFAQ">
            <AddInfoFAQ />
          </div>

          <div className="containerTwoFAQ">
            <ShowContainerEditFAQ />
          </div>
        </div>
        <div>
          <ChangeLogContainer />
        </div>
      </div>
    </>
  )
}

export default FAQ
