import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import NavDropdown from 'react-bootstrap/NavDropdown'

import '../../../sass/Header/navOffCanvas.scss'

function BodyNavSystem({ data, selectedNomenclature }) {
  const [openDropdowns, setOpenDropdowns] = useState({})
  const [checkedNomenclatures, setCheckedNomenclatures] = useState({})

  useEffect(() => {
    const initialCheckedState = {}
    data.forEach(item => {
      initialCheckedState[item.nomenclatura_pedea] =
        item.nomenclatura_pedea === selectedNomenclature
    })
    setCheckedNomenclatures(initialCheckedState)
  }, [data, selectedNomenclature])

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

  const handleCheckboxChange = (e, nomenclature) => {
    setCheckedNomenclatures(prevState => ({
      ...prevState,
      [nomenclature]: !prevState[nomenclature]
    }))
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
                {groupedData[category][majorClass].items &&
                  groupedData[category][majorClass].items.map(
                    (nomenclature, i) => (
                      <NavDropdown.Item
                        key={i}
                        className="containerNomeclaturaPedea"
                      >
                        <Form.Check
                          type="checkbox"
                          label={nomenclature}
                          onClick={e => e.stopPropagation()}
                          onChange={e => handleCheckboxChange(e, nomenclature)}
                          checked={checkedNomenclatures[nomenclature]}
                        />
                      </NavDropdown.Item>
                    )
                  )}

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
                    {groupedData[category][majorClass].subClassesMaiores[
                      subMajorClass
                    ].items &&
                      groupedData[category][majorClass].subClassesMaiores[
                        subMajorClass
                      ].items.map((nomenclature, i) => (
                        <NavDropdown.Item
                          key={i}
                          className="containerNomeclaturaPedea"
                        >
                          <Form.Check
                            type="checkbox"
                            label={nomenclature}
                            onClick={e => e.stopPropagation()}
                            onChange={e =>
                              handleCheckboxChange(e, nomenclature)
                            }
                            checked={checkedNomenclatures[nomenclature]}
                          />
                        </NavDropdown.Item>
                      ))}

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
                        ][minorClass].map((nomenclature, i) => (
                          <NavDropdown.Item
                            key={i}
                            className="containerNomeclaturaPedea"
                          >
                            <Form.Check
                              type="checkbox"
                              label={nomenclature}
                              onClick={e => e.stopPropagation()}
                              onChange={e =>
                                handleCheckboxChange(e, nomenclature)
                              }
                              checked={checkedNomenclatures[nomenclature]}
                            />
                          </NavDropdown.Item>
                        ))}
                      </NavDropdown>
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
  data: PropTypes.array.isRequired,
  selectedNomenclature: PropTypes.string.isRequired
}

export default BodyNavSystem
