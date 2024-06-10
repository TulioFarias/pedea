import '../../../../sass/admin/FAQ/FAQ.scss'

import React from 'react'

import AddInfoFAQ from './containerAddFAQ'
import ShowContainerEditFAQ from './containerEditFAQ'

function FAQ() {
  return (
    <>
      <div className="containerWrapperOptions">
        <p>Gerenciamento de Perguntas Frequentes:</p>
        <AddInfoFAQ />
        <ShowContainerEditFAQ />
      </div>
    </>
  )
}

export default FAQ
