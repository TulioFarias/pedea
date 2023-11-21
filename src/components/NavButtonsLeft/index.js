import AddIcon from '@mui/icons-material/Add'
import Grid4x4Icon from '@mui/icons-material/Grid4x4'
import LanguageIcon from '@mui/icons-material/Language'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import RemoveIcon from '@mui/icons-material/Remove'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import React from 'react'
import '../../sass/btns-Left.scss/ButtonsLeft.scss'

function NavButtonsLeft() {
  return (
    <div className="d-flex flex-column justify-content-start align-items-start gap-2  my-custom-ContainerBtns">
      <button className="my-custom-btns">
        <ZoomOutMapIcon />
      </button>

      <button className="my-custom-btns">
        <AddIcon />
      </button>

      <button className="my-custom-btns">
        <RemoveIcon />
      </button>

      <button className="my-custom-btns">
        <LanguageIcon />
      </button>

      <button className="my-custom-btns">
        <Grid4x4Icon />
      </button>

      <button className="my-custom-btns">
        <LocationOnIcon />
      </button>

      <button className="my-custom-btns">
        <TravelExploreIcon />
      </button>

      <button className="my-custom-btns">
        <QuestionMarkIcon />
      </button>
    </div>
  )
}

export default NavButtonsLeft
