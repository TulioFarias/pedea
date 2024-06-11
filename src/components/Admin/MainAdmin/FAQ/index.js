import '../../../../sass/admin/FAQ/FAQ.scss'

import React from 'react'

import AddInfoFAQ from './containerAddFAQ'
import ShowContainerEditFAQ from './containerEditFAQ'

function FAQ() {
  return (
    <>
      <div className="containerWrapperOptions">
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
      </div>
    </>
  )
}

export default FAQ
