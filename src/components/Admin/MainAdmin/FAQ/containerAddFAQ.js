import React, { useState } from 'react'
import '../../../../sass/admin/FAQ/addfaq.scss'

import { Form, InputGroup, Container } from 'react-bootstrap'
function AddInfoFAQ() {
  const [valuesInfoFAQ, setValuesInfoFAQ] = useState({
    value1: '',
    value2: ''
  })

  return (
    <>
      <Container className="containerWrapperAddInfoFAQ">
        <Form>
          <div className="mb-3">
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">1</InputGroup.Text>
              <Form.Control
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
            <Form.Group controlId="formTextarea1">
              <Form.Control placeholder="Enter more text" />
            </Form.Group>
          </div>
          <div className="mb-3">
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                2
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <Form.Group controlId="formTextarea2">
              <Form.Control placeholder="Enter more text" />
            </Form.Group>
          </div>
          <div className="mb-3">
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-lg">3</InputGroup.Text>
              <Form.Control
                aria-label="Large"
                aria-describedby="inputGroup-sizing-lg"
              />
            </InputGroup>
            <Form.Group controlId="formTextarea3">
              <Form.Control placeholder="Enter more text" />
            </Form.Group>
          </div>
          <div className="mb-3">
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-example4">
                4
              </InputGroup.Text>
              <Form.Control
                aria-label="Example 4"
                aria-describedby="inputGroup-sizing-example4"
              />
            </InputGroup>
            <Form.Group controlId="formTextarea4">
              <Form.Control placeholder="Enter more text" />
            </Form.Group>
          </div>
          <div className="mb-3">
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-example5">
                5
              </InputGroup.Text>
              <Form.Control
                aria-label="Example 5"
                aria-describedby="inputGroup-sizing-example5"
              />
            </InputGroup>
            <Form.Group controlId="formTextarea5">
              <Form.Control placeholder="Enter more text" />
            </Form.Group>
          </div>
          <div className="mb-3">
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-example6">
                6
              </InputGroup.Text>
              <Form.Control
                aria-label="Example 6"
                aria-describedby="inputGroup-sizing-example6"
              />
            </InputGroup>
            <Form.Group>
              <Form.Control placeholder="Enter more text" />
            </Form.Group>
          </div>
        </Form>
      </Container>
    </>
  )
}

export default AddInfoFAQ
