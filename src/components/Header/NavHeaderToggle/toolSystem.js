import React, { useState, useEffect } from "react";
import { FormControl, IconButton } from "@mui/material";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import iconTxt from '../../../assets/icons/icon-txt.png';
import iconXML from '../../../assets/icons/icon-xml.png';
import '../../../sass/Header/toolsystem.scss';
import apiPEDEA from '../../../services/api';
import PropTypes from 'prop-types';
import FilterSystem from "./filterSystem";

function ToolSystem({ wmsName }) {
  const [filter, setFilter] = useState(false);
  const [data, setData] = useState([]);
  const [layerAttributes, setLayerAttributes] = useState([]);
  const [layerAttributesTypes, setLayerAttributesTypes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const getValuesData = async () => {
      try {
        const { data } = await apiPEDEA.get('/infoDataExplorer');
        if (data) {
          setData(data);
          setLayerAttributes(['attribute1:', 'attribute2:']);
          setLayerAttributesTypes(['string', 'int']);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getValuesData();
  }, []);

  const handleClickFilter = (e) => {
    e.stopPropagation();
    setFilter(prevFilter => !prevFilter);
  };

  const handleClickInsideDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLayerFilterUpdaterClick = (e) => {
    let attribute = layerAttributes[selectedAttribute]?.replace(":", "");
    let attributeType = layerAttributesTypes[selectedAttribute];
    let operator = selectedOperator;
    let formattedValue = formatFilterValue(attributeType, operator, filterValue);

    let filter = `${attribute} ${operator} ${formattedValue}`.trim();

    console.log('Aplicar Filtro:', filter);
    handleClickInsideDropdown(e);
  };

  const handleLayerFilterReseterClick = (e) => {
    console.log('Resetar Filtro');
    handleClickInsideDropdown(e);
  };

  const formatFilterValue = (type, operator, value) => {
    if (['double', 'int', 'numeric', 'decimal', 'real', 'serial'].includes(type)) {
      return value;
    } else if (operator === 'ilike') {
      return `'%${value}%'`;
    } else {
      return `'${value}'`;
    }
  };

  const layerName = wmsName.split(':')[1];

  const handleDownloadTxt = () => {
    const link = document.createElement('a');
    link.href = `/portal/metadata/${layerName}_metadados.txt`;
    link.download = `${layerName}_metadados.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadXml = () => {
    const link = document.createElement('a');
    link.href = `https://pedea.sema.ce.gov.br/geoserver/wfs?request=GetFeature&service=WFS&outputFormat=application/vnd.google-earth.kml+xml&version=1.0.0&typeName=${layerName}&mode=download`;
    link.download = `${layerName}.kml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="ContainerTools">
      <div className="ContainerLinks">
        <div 
          className="linksTools" 
          onClick={handleDownloadTxt} 
          role="button" 
          tabIndex={0}
      
        >
          <img src={iconTxt} alt="Icon TXT" className="iconIMG" />
        </div>
        <div 
          className="linksTools" 
          onClick={handleDownloadXml} 
          role="button" 
          tabIndex={0}
         
        >
          <img src={iconXML} alt="Icon XML" className="iconIMG" />
        </div>
        <IconButton
          onClick={handleClickFilter}
          sx={{
            height: '30px',
            width: '32px',
            color: 'white',
            transition: 'all 0.5s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(44, 64, 63, 0.85)',
              transform: 'scale(1.05)',
            },
          }}
        >
          <FilterAltRoundedIcon />
        </IconButton>
      </div>

      {filter && (
        <FilterSystem
          layerAttributes={layerAttributes}
          layerAttributesTypes={layerAttributesTypes}
          selectedAttribute={selectedAttribute}
          setSelectedAttribute={setSelectedAttribute}
          selectedOperator={selectedOperator}
          setSelectedOperator={setSelectedOperator}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          handleLayerFilterUpdaterClick={handleLayerFilterUpdaterClick}
          handleLayerFilterReseterClick={handleLayerFilterReseterClick}
          handleClickInsideDropdown={handleClickInsideDropdown}
        />
      )}
    </div>
  );
}

ToolSystem.propTypes = {
  wmsName: PropTypes.string.isRequired,
};

export default ToolSystem;
