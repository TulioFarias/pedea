import '../../sass/btns-map/ButtonsLeft.scss';
import React, { useState } from 'react';
import MapLayers from './ChangeMap/changeMapSystem';
import FindMe from './FindMe/FindMe';
import GridLayer from './gridLayer/gridLayer';
import Help from './help/help';
import ImportData from './ImportData/importData';
import LocaleAdress from './LocateAdress/LocateAdress';
import ResetZoom from './ResetZoom/ResetZoom';
import ZoomInOut from './ZoomInOut/ZoomInOut';
import LegendLayers from './LegendLayers/LegendLayers';
import GrapichModules from './GrapichModules/GrapichModules';

import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';


function ButtonsMap() {
  const [showButtons, setShowButtons] = useState(false); 

  const toggleButtons = () => {
    setShowButtons(!showButtons); 
  };

  return (
    <>
      <div className="containerBtns">
        <ResetZoom />
        <ZoomInOut />
        <button
          aria-label="toggle buttons" 
          onClick={toggleButtons}
          className='ToolBtns'
         
        >
          <HomeRepairServiceRoundedIcon/>
        </button>

        {showButtons && (
          <>
            <MapLayers />
            <GridLayer />
            <FindMe />
            <LocaleAdress />
            <ImportData />
            <GrapichModules />
            <Help />
          </>
        )}

        <LegendLayers />
      </div>
    </>
  );
}

export default ButtonsMap;

