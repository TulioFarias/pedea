import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import NavDropdown from 'react-bootstrap/NavDropdown'
import '../../../sass/Header/navOffCanvas.scss'

function BodyNavSystem({ data }) {
  const [openDropdowns, setOpenDropdowns] = useState({})

  const toggleDropdown = (category, classeMaior) => {
    setOpenDropdowns(prevState => {
      const newOpenDropdowns = { ...prevState }
      if (classeMaior) {
        newOpenDropdowns[category] = {
          ...newOpenDropdowns[category],
          [classeMaior]: !newOpenDropdowns[category]?.[classeMaior]
        }
      } else {
        newOpenDropdowns[category] = !newOpenDropdowns[category]
      }
      return newOpenDropdowns
    })
  }

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

  return (
    <>
      <div>
        {Object.keys(groupedData).map((category, idx) => (
          <div key={idx} className="ContainerBodyDropDowns">
            <div
              className="ImageFolderCategory"
              onClick={() => toggleDropdown(category)}
            >
              {openDropdowns[category] ? (
                <FolderOpenRoundedIcon />
              ) : (
                <FolderRoundedIcon />
              )}
            </div>
            <NavDropdown
              title={category}
              className="customDropDown"
              show={openDropdowns[category]}
              onToggle={() => toggleDropdown(category)}
            >
              {Object.keys(groupedData[category]).map((classeMaior, index) => (
                <div key={index} className="ContainerClasseMaior">
                  <div
                    className="ImageFolderCategory"
                    onClick={() => toggleDropdown(category, classeMaior)}
                  >
                    {openDropdowns[category]?.[classeMaior] ? (
                      <FolderOpenRoundedIcon />
                    ) : (
                      <FolderRoundedIcon />
                    )}
                  </div>

                  <NavDropdown
                    title={classeMaior}
                    className="dropDownItemsClasseMaior"
                    show={openDropdowns[category]?.[classeMaior]}
                    onToggle={() => toggleDropdown(category, classeMaior)}
                  >
                    {groupedData[category][classeMaior].map((item, i) => (
                      <NavDropdown.Item
                        key={i}
                        className="containerNomeclaturaPedea"
                      >
                        <Form.Check
                          type="checkbox"
                          label={item.nomenclatura_pedea}
                        />
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                </div>
              ))}
            </NavDropdown>
          </div>
        ))}
      </div>
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
