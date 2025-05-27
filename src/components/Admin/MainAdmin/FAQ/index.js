import '../../../../sass/admin/FAQ/FAQ.scss'
import AddInfoFAQ from './containersFAQ/containerAddFAQ'
import AddInfoChangeLog from './changeLOG/addChangeLog'

import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded'
function FAQ() {
  return (
    <>
      <div className="containerWrapperOptions" >
        <div className='headerFaq'>
           <QuestionAnswerRoundedIcon />
          <p>Perguntas frequentes e atualizações de versões do sistema</p>

        </div>
         
        <div id="containerFAQs">
              <AddInfoFAQ />
              <AddInfoChangeLog />
        </div>




      </div>
    </>
  )
}

export default FAQ
