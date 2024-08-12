import FolderOpenRoundedIcon from '@mui/icons-material/FolderOpenRounded'
import FolderRoundedIcon from '@mui/icons-material/FolderRounded'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { mapInstance } from '../../../_config/layers/map'
import { ServerTypeHelper } from '../../../_config/layers/helpers'
import ImageWMS from 'ol/source/ImageWMS';
import '../../../sass/Header/navOffCanvas.scss'

function BodyNavSystem({ data, selectedNomenclature }) {
  const [openDropdowns, setOpenDropdowns] = useState({})
  const [checkedNomenclatures, setCheckedNomenclatures] = useState({})
  const [indexShape, setIndexShape] =  useState(mapInstance)
  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;


  useEffect(() => {
    const initialCheckedState = {}
    data.forEach(item => {
      initialCheckedState[item.nomenclatura_pedea] =
        item.nomenclatura_pedea === selectedNomenclature
    })
    setCheckedNomenclatures(initialCheckedState)
  }, [data, selectedNomenclature])

  useEffect(() => {
    if (selectedNomenclature) {
      handleLayerClick(selectedNomenclature);
    }
  }, [selectedNomenclature]);

  const handleLayerClick = layerId => {

    const layers = mapInstance.getLayers().getArray();
  

    const matchingLayer = layers.find(layer => {
      return layer.get('title') === layerId;
    });
  
    if (matchingLayer) {
      matchingLayer.setVisible(!matchingLayer.getVisible());
  
      handleLayerZIndexer(matchingLayer);
      handleLayerZoomFocus(matchingLayer);
  
      // if (clientWidth <= 900) {
      //   handleGetLegendGraphic(matchingLayer, layerId);
      // }
    } else {
      console.log(`No layer found with title ${layerId}`);
    }
  };

  // const handleGetLegendGraphic = (layer, index) => {

  //   if (layer.getVisible() && (layer.get('serverType') === ServerTypeHelper.GEOSERVER || layer.get('serverType') === ServerTypeHelper.MAPSERVER)) {

  //     const wmsSource = new ImageWMS({
  //       url: layer.get('url'),
  //       params: { 'LAYERS': layer.get('wmsName') },
  //       ratio: 1,
  //       serverType: layer.get('serverType'),
  //     });

  //     const graphicUrl =
  //       wmsSource.getLegendUrl(mapInstance.getView().getResolution(),
  //         { "legend_options": "bgColor:#212835;fontColor:#FFFFFF;forceLabels:on;" },
  //       );
  //     const img = document.getElementById('layerLegend' + index);
  //     const legendTitle = document.getElementById('layerLegendTitle' + index);
  //     img.src = graphicUrl;
  //     img.onclick = () => window.open(graphicUrl, '_blank').focus();
  //     img.style.visibility = 'visible';
  //     img.style.display = 'inherit';
  //     img.style.cursor = 'pointer';
  //     legendTitle.style.visibility = 'visible';
  //     legendTitle.style.display = 'inherit';
  //   } else if (!layer.getVisible()) {
  //     const legendTitle = document.getElementById('layerLegendTitle' + index);
  //     const img = document.getElementById('layerLegend' + index);
  //     img.style.visibility = 'hidden';
  //     img.style.display = 'none';
  //     legendTitle.style.visibility = 'hidden';
  //     legendTitle.style.display = 'none';
  //   }


  // }


  const handleLayerZIndexer = (layer) => {

    const vector = mapInstance.getLayers().getArray()[mapInstance.getLayers().getArray().length - 4];
    const vectorForCSV = mapInstance.getLayers().getArray()[mapInstance.getLayers().getArray().length - 3];
    const vectorForGeolocation = mapInstance.getLayers().getArray()[mapInstance.getLayers().getArray().length - 2];
    const graticule = mapInstance.getLayers().getArray()[mapInstance.getLayers().getArray().length - 1];

    if (layer.getVisible()) {
      setIndexShape(indexShape + 1)
      layer.setZIndex(indexShape);
      vector.setZIndex(indexShape + 1)
      vectorForCSV.setZIndex(indexShape + 2)
      vectorForGeolocation.setZIndex(indexShape + 3)
      graticule.setZIndex(indexShape + 4);
    }

  }


  const handleLayerZoomFocus = async (layer) => {

    let method = 'GET'
    let url = 'https://pedea.sema.ce.gov.br/api/v1/geoextent/layer?layer=' + layer.get('wmsName').split(':')[1]
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {

      let str = xhr.response;

      let regex = /[-\d]{1,}.[\d]{1,}/g;

      let extent = str.match(regex);

      if (extent && extent[0] && extent[1] && extent[2] && extent[3]) {
        try {
          extent = extent.map((e) => parseFloat(e));

          mapInstance.getView().fit(extent, mapInstance.getSize());
        } catch (e) {
          console.log(e)
        }
      }
    };
    xhr.onerror = function () {
      console.log(xhr.response);
    };
    xhr.send();

  }

  const toggleDropdown = (category, majorClass, subMajorClass, minorClass) => {
    setOpenDropdowns(prevState => {
      const newOpenDropdowns = { ...prevState };

      if (minorClass) {
        newOpenDropdowns[category] = {
          ...newOpenDropdowns[category],
          [majorClass]: {
            ...newOpenDropdowns[category]?.[majorClass],
            [subMajorClass]: {
              ...newOpenDropdowns[category]?.[majorClass]?.[subMajorClass],
              [minorClass]: !newOpenDropdowns[category]?.[majorClass]?.[subMajorClass]?.[minorClass]
            }
          }
        };
      } else if (subMajorClass) {
        newOpenDropdowns[category] = {
          ...newOpenDropdowns[category],
          [majorClass]: {
            ...newOpenDropdowns[category]?.[majorClass],
            [subMajorClass]: !newOpenDropdowns[category]?.[majorClass]?.[subMajorClass]
          }
        };
      } else if (majorClass) {
        newOpenDropdowns[category] = {
          ...newOpenDropdowns[category],
          [majorClass]: !newOpenDropdowns[category]?.[majorClass]
        };
      } else {
        newOpenDropdowns[category] = !newOpenDropdowns[category];
      }

      return newOpenDropdowns;
    });
  };

  const handleCheckboxChange = (e, nomenclature) => {
    const { checked } = e.target;
    e.stopPropagation();

    setCheckedNomenclatures(prevState => ({
      ...prevState,
      [nomenclature]: checked
    }));

   
    handleLayerClick(nomenclature);
  }
  
  const getCheckedValue = (nomenclature) => {
    
    return checkedNomenclatures[nomenclature] || false;
  };

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
                          onChange={e => {
                          
                            handleCheckboxChange(e, nomenclature);
                          }}
                          checked={getCheckedValue(nomenclature)}
                          data-layer-id={groupedData[category][majorClass].layerId}
                        
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
                            data-layer-id={groupedData[category][majorClass].layerId}
                            onChange={e => {
                            
                              handleCheckboxChange(e, nomenclature);
                            }}
                            checked={getCheckedValue(nomenclature)}
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
                              data-layer-id={groupedData[category][majorClass].layerId}
                              label={nomenclature}
                              onChange={e => {
                                handleCheckboxChange(e, nomenclature);
                              }}
                              checked={getCheckedValue(nomenclature)}
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
