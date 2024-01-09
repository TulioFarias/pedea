import SearchIcon from '@mui/icons-material/Search'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useTranslation } from 'react-i18next'

import '../../sass/Header/ContainerButton.scss'
import folder from '../../assets/icons/folder.png'
import foldermin from '../../assets/icons/foldermin.png'

function NavOptions() {
  const { t } = useTranslation()
  return (
    <div>
      <Container fluid className="ContainerNavOptions">
        <Offcanvas.Header closeButton />
        <Offcanvas.Title className="text-center" style={{ fontSize: '30px' }}>
          {t('Explorador de Dados')}
        </Offcanvas.Title>
        <Form className=" containerForm">
          <Form.Control
            type="search"
            placeholder={t('Digite o nome da camada...')}
            className="inputForm"
            aria-label="Search"
          />
          <button className="BtnForm">
            <SearchIcon />
          </button>
        </Form>

        <Offcanvas.Body className="containerNav">
          <h2> {t('Categorias')}</h2>
          <Nav className="justify-content-end flex-grow-1 pe-3 customContainerOptionsNav">
            <div className="containerAllOptions">
              <div className="customContainerImage">
                <img src={folder} />
              </div>
              <div className="containerOptionsFolder">
                <NavDropdown title={t('Biodiversidade')}>
                  <NavDropdown.Item href="#biodiversidade1">
                    <img src={foldermin} /> Opção 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#biodiversidade2">
                    <img src={foldermin} /> Opção 2
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
            <div className="containerAllOptions">
              <div className="customContainerImage">
                <img src={folder} />
              </div>
              <div className="containerOptionsFolder">
                <NavDropdown title={t('Educação Ambiental')}>
                  <NavDropdown.Item href="#educacaoambiental1">
                    <img src={foldermin} /> Opção 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#educacaoambiental2">
                    <img src={foldermin} /> Opção 2
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>

            <div className="containerAllOptions">
              <div className="customContainerImage">
                <img src={folder} />
              </div>
              <div className="containerOptionsFolder">
                <NavDropdown title={t('Energia e Telecomunicações')}>
                  <NavDropdown.Item href="#energiatelecomunicacoes1">
                    <img src={foldermin} /> Opção 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#energiatelecomunicacoes2">
                    <img src={foldermin} /> Opção 2
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>

            <div className="containerAllOptions">
              <div className="customContainerImage">
                <img src={folder} />
              </div>
              <div className="containerOptionsFolder">
                <NavDropdown title={t('Fiscalização Ambiental')}>
                  <NavDropdown.Item href="#fiscalizacaoambiental1">
                    <img src={foldermin} /> Opção 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#fiscalizacaoambiental2">
                    <img src={foldermin} /> Opção 2
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
            <div className="containerAllOptions">
              <div className="customContainerImage">
                <img src={folder} />
              </div>
              <div className="containerOptionsFolder">
                <NavDropdown title={t('Hidrografia')}>
                  <NavDropdown.Item href="#hidrografia1">
                    <img src={foldermin} /> Opção 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#hidrografia2">
                    <img src={foldermin} /> Opção 2
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
            <div className="containerAllOptions">
              <div className="customContainerImage">
                <img src={folder} />
              </div>
              <div className="containerOptionsFolder">
                <NavDropdown title={t('Instrumentos e Projetos Territoriais')}>
                  <NavDropdown.Item href="#instrumentoseprojetosterritoriais1">
                    <img src={foldermin} /> Opção 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#instrumentoseprojetosterritoriais2">
                    <img src={foldermin} /> Opção 2
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
            <div className="containerAllOptions">
              <div className="customContainerImage">
                <img src={folder} />
              </div>
              <div className="containerOptionsFolder">
                <NavDropdown title={t('Recuperação Ambiental')}>
                  <NavDropdown.Item href="#recuperacaoambiental1">
                    <img src={foldermin} /> Opção 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#recuperacaoambiental2">
                    <img src={foldermin} /> Opção 2
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
            <div className="containerAllOptions">
              <div className="customContainerImage">
                <img src={folder} />
              </div>
              <div className="containerOptionsFolder">
                <NavDropdown title={t('Saneamento Básico')}>
                  <NavDropdown.Item href="#saneamentobasico1">
                    <img src={foldermin} /> Opção 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#saneamentobasico2">
                    <img src={foldermin} /> Opção 2
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
            <div className="containerAllOptions">
              <div className="customContainerImage">
                <img src={folder} />
              </div>
              <div className="containerOptionsFolder">
                <NavDropdown title={t('Sistemas de Transportes')}>
                  <NavDropdown.Item href="#sistemasdetransportes1">
                    <img src={foldermin} /> Opção 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#sistemasdetransportes2">
                    <img src={foldermin} /> Opção 2
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
            <div className="containerAllOptions">
              <div className="customContainerImage">
                <img src={folder} />
              </div>
              <div className="containerOptionsFolder">
                <NavDropdown title={t('Território')}>
                  <NavDropdown.Item href="#territorio1">
                    <img src={foldermin} /> Opção 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#territorio2">
                    <img src={foldermin} /> Opção 2
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
          </Nav>
        </Offcanvas.Body>
      </Container>

      <div className="desativarCamadas">
        <a>{t('Desativar camadas visíveis')}</a>
      </div>

      <Button variant="outline-light" className="btnBaixarDados">
        {t('Baixar Dados')}
      </Button>
    </div>
  )
}

export default NavOptions
