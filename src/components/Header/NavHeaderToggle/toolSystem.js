import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem, TextField, IconButton } from "@mui/material";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import iconTxt from '../../../assets/icons/icon-txt.png';
import iconXML from '../../../assets/icons/icon-xml.png';
import '../../../sass/Header/toolsystem.scss';
import apiPEDEA from '../../../services/api';
import PropTypes from 'prop-types'


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
    e.stopPropagation();
  };

  const handleLayerFilterUpdaterClick = (e) => {
    let attribute = layerAttributes[selectedAttribute]?.replace(":", "");
    let attributeType = layerAttributesTypes[selectedAttribute];
    let operator = selectedOperator;
    let formattedValue = formatFilterValue(attributeType, operator, filterValue);

    let filter = `${attribute} ${operator} ${formattedValue}`.trim();


    console.log('Aplicar Filtro:', filter);


    handleClickInsideDropdown(e)


  };

  const handleLayerFilterReseterClick = (e) => {

    console.log('Resetar Filtro');
    handleClickInsideDropdown(e)

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

  return (
    <div className="ContainerTools">
      <div className="ContainerLinks">
        <a className="linksTools" onClick={handleClickInsideDropdown} download rel="noreferrer">
          <img src={iconTxt} alt="Icon TXT" className="iconIMG" />
        </a>
        <a className="linksTools" onClick={handleClickInsideDropdown} download rel="noreferrer">
          <img src={iconXML} alt="Icon XML" className="iconIMG" />
        </a>
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
        <FormControl component="form" className="ContainerFilter" onSubmit={(e) => e.preventDefault()}>
          <p>Filtro:</p>
          <div className="ContainerFilterSelects">
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} onClick={handleClickInsideDropdown} className="inputSelectFilter">
              <InputLabel id="Atributo" sx={{ color: 'white' }}>Atributo</InputLabel>
              <Select
                labelId="Atributo"
                value={selectedAttribute}
                onChange={(e) => setSelectedAttribute(e.target.value)}
                sx={{ borderColor: 'white', color: 'white', '& .MuiSelect-icon': { color: 'white' } }}
              >
                <MenuItem value="">Atributo...</MenuItem>
                {layerAttributes.map((attribute, key) => (
                  <MenuItem key={key} value={key}>{attribute.replace(":", "")}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} onClick={handleClickInsideDropdown} className="inputSelectFilter">
              <InputLabel id="Operador" sx={{ color: 'white' }}>Operador</InputLabel>
              <Select
                labelId="Operador"
                value={selectedOperator}
                onChange={(e) => setSelectedOperator(e.target.value)}
                sx={{ borderColor: 'white', color: 'white', '& .MuiSelect-icon': { color: 'white' } }}
              >
                <MenuItem value="">Operador...</MenuItem>
                {[
                  ['=', 'Igual'],
                  ['ilike', 'Contém'],
                  ['<>', 'Diferente'],
                  ['>', 'Maior'],
                  ['>=', 'Maior igual'],
                  ['<', 'Menor'],
                  ['<=', 'Menor igual']
                ].map((operator, key) => (
                  <MenuItem key={key} value={operator[0]}>{operator[1]}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="ContainerFilterInputBtns">
            <TextField
              id="search-textfield"
              label="Digite um valor..."
              variant="filled"
              onChange={(e) => setFilterValue(e.target.value)}
              onClick={handleClickInsideDropdown} 
              
              sx={{
                color: 'white',
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiInputLabel-shrink': { color: 'white' }
              }}
              size="small"
              className="inputTxtFilter"
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'rgba(44, 64, 63, 0.719)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(44, 64, 63, 0.85)' }
              }}
              onClick={handleLayerFilterUpdaterClick}
              size="small"
            >
              Filtrar
            </Button>
             
            <Button
              variant="outlined"
              sx={{
                borderColor: 'rgb(78, 27, 27);',
                color: 'rgb(78, 27, 27);',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                '&:hover': { Color: 'white', borderColor: 'rgb(78, 27, 27);', backgroundColor: 'rgb(78, 27, 27);' }
              }}
              onClick={handleLayerFilterReseterClick}
              size="small"
            >
              Resetar
            </Button>
          </div>
        </FormControl>
      )}
    </div>
  );
}



ToolSystem.propTypes = {
  wmsName: PropTypes.string.isRequired,
};

export default ToolSystem;