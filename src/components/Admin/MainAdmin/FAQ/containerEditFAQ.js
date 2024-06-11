import React, { useState, useEffect } from 'react'
import { Carousel, Button, Form } from 'react-bootstrap'
import '../../../../sass/admin/FAQ/EditAndDeleteFAQ.scss'
import DrawRoundedIcon from '@mui/icons-material/DrawRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'

import apiPEDEA from '../../../../services/api'

function ShowContainerEditFAQ() {
  const [valuesFAQ, setValuesFAQ] = useState([])

  useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await apiPEDEA.get('/allValuesFAQ')
        setValuesFAQ(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadRotulosData()
  }, [])

  return (
    <div className="ContainerFAQAllItens">
      <p>As perguntas ativas atualmente na página de Perguntas Frequentes:</p>
      <Carousel interval={null} controls={true} className="carouselCustomFAQ">
        {valuesFAQ.map((faq, index) => (
          <Carousel.Item key={index}>
            <div className="ContainerItensCarousel">
              <Form.Group>
                <Form.Label className="LabelFAQEditAndDelete">
                  Pergunta ativa:
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={faq.question}
                  readOnly
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="LabelFAQEditAndDelete">
                  Reposta ativa:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={faq.answer}
                  readOnly
                />
              </Form.Group>
              <div className="ContainerBtnsFAQ">
                <Button variant="primary">
                  <DrawRoundedIcon />
                </Button>
                <Button variant="danger">
                  <DeleteForeverRoundedIcon />
                </Button>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default ShowContainerEditFAQ
