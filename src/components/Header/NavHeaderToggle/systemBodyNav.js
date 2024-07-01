import PropTypes from 'prop-types'
import React from 'react'
import Form from 'react-bootstrap/Form'
import NavDropdown from 'react-bootstrap/NavDropdown'
import '../../../sass/Header/navOffCanvas.scss'

function BodyNavSystem({ data }) {
  const groupByCategory = array => {
    return array.reduce((acc, item) => {
      const category = item.categoria_de_informacao
      const classeMaior = item.classe_maior
      if (!acc[category]) {
        acc[category] = {}
      }
      if (!acc[category][classeMaior]) {
        acc[category][classeMaior] = []
      }
      acc[category][classeMaior].push(item)
      return acc
    }, {})
  }

  const groupedData = groupByCategory(data)

  console.log(groupedData)

  return (
    <>
      {Object.keys(groupedData).map((category, idx) => (
        <div key={idx} className="ContainerBodyDropDowns">
          <NavDropdown title={category} className="customDropDown">
            {Object.keys(groupedData[category]).map((classeMaior, index) => (
              <NavDropdown key={index} title={classeMaior}>
                {groupedData[category][classeMaior].map((item, i) => (
                  <NavDropdown.Item key={i}>
                    <Form.Check
                      type="checkbox"
                      id={`checkbox-${item.id}`}
                      label={item.nomenclatura_pedea}
                    />
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ))}
          </NavDropdown>
        </div>
      ))}
    </>
  )
}

BodyNavSystem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      categoria_de_informacao: PropTypes.string.isRequired,
      classe_maior: PropTypes.string.isRequired,
      nomenclatura_pedea: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired
}

export default BodyNavSystem
