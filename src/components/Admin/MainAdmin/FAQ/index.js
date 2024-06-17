import '../../../../sass/admin/FAQ/FAQ.scss'

import React from 'react'

import ChangeLogContainer from './changeLOG/containerChangeLOG'
import AddInfoFAQ from './containersFAQ/containerAddFAQ'
import ShowContainerEditFAQ from './containersFAQ/containerEditFAQ'

function FAQ() {
  return (
    <>
      <div className="containerWrapperOptions" id="containerFAQs">
        <div className="ContainerAllFAQ">
          <h1>Gerenciamento de Perguntas Frequentes:</h1>
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
