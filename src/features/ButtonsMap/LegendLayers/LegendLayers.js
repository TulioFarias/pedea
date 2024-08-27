import React, { useState, useEffect } from 'react';
import '../../../sass/btns-map/legendlayers.scss';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import ImageWMS from 'ol/source/ImageWMS';
import { ServerTypeHelper } from '../../../_config/layers/helpers';
import { mapInstance } from '../../../_config/layers/map';

function LegendLayers() {
    const [isLegendVisible, setIsLegendVisible] = useState(true);
    const [layersData, setLayersData] = useState([]);

    const ID_TYPE = "LayerOpacitySlider";

    const toggleLegend = () => {
        setIsLegendVisible(prevState => !prevState);
    };

    const handleOpacity = (event) => {
        let value = parseFloat(event.target.value);
        let index = parseInt(event.target.id.replace(ID_TYPE, ""));

        const layers = mapInstance.getLayers().getArray();
        if (layers[index]) {
            layers[index].setOpacity(value);
        } else {
            console.error("Layer not found for index:", index);
        }
    };

    const handleGetLegendGraphic = (layer) => {
        if (layer.getVisible() && (layer.get('serverType') === ServerTypeHelper.GEOSERVER || layer.get('serverType') === ServerTypeHelper.MAPSERVER)) {
            const wmsSource = new ImageWMS({
                url: layer.get('url'),
                params: { 'LAYERS': layer.get('wmsName'), TRANSPARENT: true },
                ratio: 1,
                transparent: 'true',
                serverType: layer.get('serverType'),
            });

            const graphicUrl = wmsSource.getLegendUrl(mapInstance.getView().getResolution(), {
                "legend_options": "fontColor:#FFFFFF;fontSize:10",
                "transparent": "true"
            });

            return { graphicUrl, title: layer.get('title'), opacity: layer.getOpacity() };
        }
        return null;
    };

    const checkVisibleLayers = () => {
        const visibleLayers = mapInstance.getLayers().getArray()
            .map((layer) => handleGetLegendGraphic(layer))
            .filter(legend => legend !== null);

        const uniqueLayers = visibleLayers.filter(
            (currentLayer, index, allLayers) =>
                allLayers.findIndex(layer => layer.title === currentLayer.title) === index
        );

        setLayersData(uniqueLayers);
    };

    useEffect(() => {
        checkVisibleLayers();
    }, []);

    return (
        <>
            {isLegendVisible ? (
                <div className='containerLegend'>
                    <div className='containerTitle'>
                        <p className='titleLegend'>Legendas</p>
                        <IconButton
                            aria-label="close"
                            onClick={toggleLegend}
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
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <div className='containerLayers'>
                        {layersData.map((layer, index) => (
                            <div key={'popUpLayerItem' + index} className="PopUpLayerItem">
                                <span id={'popUpLayerLegendTitle' + index} className='PopUpLayerLegendTitle'> {layer.title} </span>
                                <img alt="N/A" id={'popUpLayerLegend' + index} className='PopUpLayerLegend' src={layer.graphicUrl} />
                                <input 
                                    id={ID_TYPE + index} 
                                    onInput={handleOpacity} 
                                    className="LayerOpacity" 
                                    type="range" 
                                    defaultValue={layer.opacity} 
                                    min="0" 
                                    max="1" 
                                    step="0.01" 
                                />
                                 
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='containerBtnLegend'>
                    <IconButton
                        aria-label="open legend"
                        onClick={toggleLegend}
                        sx={{
                            height: '35px',
                            width: '35px',
                            borderRadius: '10px',
                            color: 'white',
                            backgroundColor: 'rgba(44, 64, 63, 0.85)',
                            transition: 'all 0.5s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        <LegendToggleIcon />
                    </IconButton>
                </div>
            )}
        </>
    );
}

export default LegendLayers;

