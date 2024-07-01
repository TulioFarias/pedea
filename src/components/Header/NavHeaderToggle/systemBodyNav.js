import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import NavDropdown from 'react-bootstrap/NavDropdown'

import '../../../sass/Header/navOffCanvas.scss'

function BodyNavSystem({ data }) {
  const [openDropdowns, setOpenDropdowns] = useState({})

  const toggleDropdown = (category, majorClass, subMajorClass, minorClass) => {
    setOpenDropdowns(prevState => {
      const newOpenDropdowns = { ...prevState }
      if (minorClass) {
        newOpenDropdowns[category] = {
          ...newOpenDropdowns[category],
          [majorClass]: {
            ...newOpenDropdowns[category]?.[majorClass],
            [subMajorClass]: {
              ...newOpenDropdowns[category]?.[majorClass]?.[subMajorClass],
              [minorClass]:
                !newOpenDropdowns[category]?.[majorClass]?.[subMajorClass]?.[
                  minorClass
                ]
            }
          }
        }
      } else if (subMajorClass) {
        newOpenDropdowns[category] = {
          ...newOpenDropdowns[category],
          [majorClass]: {
            ...newOpenDropdowns[category]?.[majorClass],
            [subMajorClass]:
              !newOpenDropdowns[category]?.[majorClass]?.[subMajorClass]
          }
        }
      } else if (majorClass) {
        newOpenDropdowns[category] = {
          ...newOpenDropdowns[category],
          [majorClass]: !newOpenDropdowns[category]?.[majorClass]
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
      const majorClass = item.classe_maior
      const subMajorClass = item.sub_classe_maior
      const minorClass = item.classe_menor
      const nomenclature = item.nomenclatura_pedea

      if (!acc[category]) {
        acc[category] = {}
      }

      if (!acc[category][majorClass]) {
        acc[category][majorClass] = {
          subClassesMaiores: {},
          classesMenores: {}
        }
      }

      if (subMajorClass) {
        if (!acc[category][majorClass].subClassesMaiores[subMajorClass]) {
          acc[category][majorClass].subClassesMaiores[subMajorClass] = {}
        }
        if (minorClass) {
          if (
            !acc[category][majorClass].subClassesMaiores[subMajorClass][
              minorClass
            ]
          ) {
            acc[category][majorClass].subClassesMaiores[subMajorClass][
              minorClass
            ] = []
          }
          acc[category][majorClass].subClassesMaiores[subMajorClass][
            minorClass
          ].push(nomenclature)
        } else {
          if (
            !acc[category][majorClass].subClassesMaiores[subMajorClass].items
          ) {
            acc[category][majorClass].subClassesMaiores[subMajorClass].items =
              []
          }
          acc[category][majorClass].subClassesMaiores[subMajorClass].items.push(
            nomenclature
          )
        }
      } else if (minorClass) {
        if (!acc[category][majorClass].classesMenores[minorClass]) {
          acc[category][majorClass].classesMenores[minorClass] = []
        }
        acc[category][majorClass].classesMenores[minorClass].push(nomenclature)
      } else {
        if (!acc[category][majorClass].items) {
          acc[category][majorClass].items = []
        }
        acc[category][majorClass].items.push(nomenclature)
      }

      return acc
    }, {})
  }

  const groupedData = groupByCategory(data)

  return (
    <div>
      {Object.keys(groupedData).map((category, idx) => (
        <div key={idx} className="ContainerBodyDropDowns">
          <NavDropdown
            title={
              <>
                {openDropdowns[category] ? (
                  <FolderOpenRoundedIcon />
                ) : (
                  <FolderRoundedIcon />
                )}
                {category}
              </>
            }
            className="customDropDown"
            show={openDropdowns[category]}
            onToggle={() => toggleDropdown(category)}
          >
            {Object.keys(groupedData[category]).map((majorClass, index) => (
              <NavDropdown
                key={index}
                title={
                  <>
                    {openDropdowns[category]?.[majorClass] ? (
                      <FolderOpenRoundedIcon />
                    ) : (
                      <FolderRoundedIcon />
                    )}
                    {majorClass}
                  </>
                }
                className="dropDownItemsClasseMaior"
                show={openDropdowns[category]?.[majorClass]}
                onToggle={() => toggleDropdown(category, majorClass)}
              >
                {Object.keys(
                  groupedData[category][majorClass].subClassesMaiores
                ).map((subMajorClass, subIndex) => (
                  <NavDropdown
                    key={subIndex}
                    title={
                      <>
                        {openDropdowns[category]?.[majorClass]?.[
                          subMajorClass
                        ] ? (
                          <FolderOpenRoundedIcon />
                        ) : (
                          <FolderRoundedIcon />
                        )}
                        {subMajorClass}
                      </>
                    }
                    className="dropDownItemsSubClasseMaior"
                    show={
                      openDropdowns[category]?.[majorClass]?.[subMajorClass]
                    }
                    onToggle={() =>
                      toggleDropdown(category, majorClass, subMajorClass)
                    }
                  >
                    {Object.keys(
                      groupedData[category][majorClass].subClassesMaiores[
                        subMajorClass
                      ]
                    ).map((minorClass, minorIndex) => (
                      <NavDropdown
                        key={minorIndex}
                        title={
                          <>
                            {openDropdowns[category]?.[majorClass]?.[
                              subMajorClass
                            ]?.[minorClass] ? (
                              <FolderOpenRoundedIcon />
                            ) : (
                              <FolderRoundedIcon />
                            )}
                            {minorClass}
                          </>
                        }
                        className="dropDownItemsClasseMenor"
                        show={
                          openDropdowns[category]?.[majorClass]?.[
                            subMajorClass
                          ]?.[minorClass]
                        }
                        onToggle={() =>
                          toggleDropdown(
                            category,
                            majorClass,
                            subMajorClass,
                            minorClass
                          )
                        }
                      >
                        {groupedData[category][majorClass].subClassesMaiores[
                          subMajorClass
                        ][minorClass].map((nomenclature, j) => (
                          <NavDropdown.Item
                            key={j}
                            className="containerNomeclaturaPedea"
                          >
                            <Form.Check type="checkbox" label={nomenclature} />
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
                    ))}
                  </NavDropdown>
                ))}
                {Object.keys(
                  groupedData[category][majorClass].classesMenores
                ).map((minorClass, minorIndex) => (
                  <NavDropdown
                    key={minorIndex}
                    title={
                      <>
                        {openDropdowns[category]?.[majorClass]?.[minorClass] ? (
                          <FolderOpenRoundedIcon />
                        ) : (
                          <FolderRoundedIcon />
                        )}
                        {minorClass}
                      </>
                    }
                    className="dropDownItemsClasseMenor"
                    show={openDropdowns[category]?.[majorClass]?.[minorClass]}
                    onToggle={() =>
                      toggleDropdown(category, majorClass, null, minorClass)
                    }
                  >
                    {groupedData[category][majorClass].classesMenores[
                      minorClass
                    ].map((nomenclature, j) => (
                      <NavDropdown.Item
                        key={j}
                        className="containerNomeclaturaPedea"
                      >
                        <Form.Check type="checkbox" label={nomenclature} />
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ))}
              </NavDropdown>
            ))}
          </NavDropdown>
        </div>
      ))}
    </div>
  )
}

BodyNavSystem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      categoria_de_informacao: PropTypes.string.isRequired,
      classe_maior: PropTypes.string.isRequired,
      subclasse_maior: PropTypes.string,
      classe_menor: PropTypes.string,
      nomenclatura_pedea: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  ).isRequired
}

export default BodyNavSystem
