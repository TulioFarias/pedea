import React, { useState } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import iconTxt from '../../../assets/icons/icon-txt.png';
import iconXML from '../../../assets/icons/icon-xml.png';
import '../../../sass/Header/toolsystem.scss';

function ToolSystem() {
  const [filter, setFilter] = useState(false);

  const handleClickFilter = (e) => {
    e.stopPropagation();
    setFilter(prevFilter => !prevFilter);
  };

  const handleClickInsideDropdown = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="ContainerTools">
      <div className="ContainerLinks">
        <a className="linksTools" onClick={handleClickInsideDropdown}>
          <img src={iconTxt} alt="Icon TXT" className="iconIMG"/>
        </a>
        <a className="linksTools" onClick={handleClickInsideDropdown}>
          <img src={iconXML} alt="Icon XML" className="iconIMG"/>
        </a>
        <button className="ButtonFilter" onClick={handleClickFilter}>
          <FilterAltRoundedIcon />
        </button>
      </div>

      {filter && (
        <FormControl component="form" className="ContainerFilter" onSubmit={(e) => e.preventDefault()}>
          <h5>Filtro:</h5>
          <div className="ContainerFilterSelects">
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} onClick={handleClickInsideDropdown} className="inputSelectFilter">
              <InputLabel id="Atributo" >Atributo</InputLabel>
              <Select
                labelId="Atributo"
                
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} onClick={handleClickInsideDropdown} className="inputSelectFilter">
              <InputLabel id="Operador">Operador</InputLabel>
              <Select
                labelId="Operador"
                
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="ContainerFilterInputBtns">
            <TextField
              id="search-textfield"
              label="Digite um valor..."
              variant="filled"
              onClick={handleClickInsideDropdown}
              className="inputTxtFilter"
            />
            <Button variant="contained" onClick={handleClickInsideDropdown}>Filter</Button>
            <Button variant="outlined" onClick={handleClickInsideDropdown}>Reset</Button>
          </div>
          
        </FormControl>
      )}
    </div>
  );
}

export default ToolSystem;