import React from "react";
import PropTypes from "prop-types";
import { Button, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";


function FilterSystem({ 
  layerAttributes, 
  layerAttributesTypes, 
  selectedAttribute, 
  setSelectedAttribute, 
  selectedOperator, 
  setSelectedOperator, 
  filterValue, 
  setFilterValue, 
  handleLayerFilterUpdaterClick, 
  handleLayerFilterReseterClick, 
  handleClickInsideDropdown 
}) {
    return (
        <div>
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
                            '&:hover': { color: 'white', borderColor: 'rgb(78, 27, 27);', backgroundColor: 'rgb(78, 27, 27);' }
                        }}
                        onClick={handleLayerFilterReseterClick}
                        size="small"
                    >
                        Resetar
                    </Button>
                </div>
            </FormControl>
        </div>
    );
}

FilterSystem.propTypes = {
    layerAttributes: PropTypes.arrayOf(PropTypes.string).isRequired,
    layerAttributesTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedAttribute: PropTypes.string.isRequired,
    setSelectedAttribute: PropTypes.func.isRequired,
    selectedOperator: PropTypes.string.isRequired,
    setSelectedOperator: PropTypes.func.isRequired,
    filterValue: PropTypes.string.isRequired,
    setFilterValue: PropTypes.func.isRequired,
    handleLayerFilterUpdaterClick: PropTypes.func.isRequired,
    handleLayerFilterReseterClick: PropTypes.func.isRequired,
    handleClickInsideDropdown: PropTypes.func.isRequired,
};

export default FilterSystem;
