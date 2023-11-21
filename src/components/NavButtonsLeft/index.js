import React from 'react'
import { Button } from 'react-bootstrap'

function NavButtonsLeft() {
  return (
    <div className="d-flex flex-column justify-content-start align-items-start">
      {/* <--- Trocar icones com Materiail UI  */}
      <Button className="">Zoom</Button>
      <Button>+</Button>
      <Button>-</Button>
      <Button>Trocar mapa</Button>
      <Button>Grade Coordenadas</Button>
      <Button>Rastrear minha loc</Button>
      <Button>Buscar endereço</Button>
      <Button>Ajuda</Button>
    </div>
  )
}

export default NavButtonsLeft
