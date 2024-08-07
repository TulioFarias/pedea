import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded'
import Autocomplete from '@mui/material/Autocomplete'
import Popper from '@mui/material/Popper'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState , useRef} from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useTranslation } from 'react-i18next'

import '../../../sass/Header/ContainerButton.scss'
import { ServerTypeHelper } from '../../../_config/layers/helpers'
import { mapInstance } from '../../../_config/layers/map'
import apiPEDEA from '../../../services/api'
import BodyNavSystem from './systemBodyNav'

function NavOptions() {
  const { t } = useTranslation()
  const [dataExplorer, setDataExplorer] = useState([])
  const [visibleLayer, setVisibleLayer] = useState(0)
  const switcherRef = useRef();
  
  const [selectedNomenclature, setSelectedNomenclature] = useState('')

  useEffect(() => {
    async function getInfoDataExplorer() {
      try {
        const { data } = await apiPEDEA.get('/infoDataExplorer')
        const sortedData = data.sort((a, b) => a.id - b.id)
        setDataExplorer(sortedData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    async function getInfoRotulosDataExplorer() {
      try {
        const { data } = apiPEDEA.get('/getAllRotulos')
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    getInfoDataExplorer()
    getInfoRotulosDataExplorer()
  }, [])

  const handleSelectChange = (event, value) => {
    setSelectedNomenclature(value)
  }

  const hasNewVisibleLayer = (index) => {
    setVisibleLayer(index);
  }

  const deactivateVisibleLayers = () => {

    if (!mapInstance || !mapInstance.getLayers) {
      console.error('Instância do mapa não é válida ou getLayers não está disponível.');
      return;
    }

    for (let i = 0; i < mapInstance.getLayers().getArray().length; i++) {
      if (mapInstance.getLayers().getArray()[i].getVisible() && (mapInstance.getLayers().getArray()[i].get('serverType') && mapInstance.getLayers().getArray()[i].get('serverType') === ServerTypeHelper.GEOSERVER)) {
        mapInstance.getLayers().getArray()[i].setVisible(false);
        // mapInstance.hasNewVisibleLayer(-i);
      }
    }

    return false;

  }

  const CustomPopper = props => {
    return <Popper {...props} placement="right-start" />
  }



  return (
    <div>
      <Container fluid className="ContainerNavOptions">
        <Offcanvas.Header closeButton />
        <Offcanvas.Title className="titleNav">
          {t('Explorador de Dados')}
        </Offcanvas.Title>
        <Form className="containerForm">
          <Autocomplete
            freeSolo
            id="ContainerInput"
            options={dataExplorer.map(item => item.nomenclatura_pedea)}
            onChange={handleSelectChange}
            renderInput={params => (
              <TextField
                {...params}
                label={
                  <>
                    <TravelExploreRoundedIcon id="iconInputDataExplorer" />
                    {t('Digite o nome da camada que você procura...')}
                  </>
                }
                sx={{
                  '& .MuiInputBase-input': {
                    color: 'white'
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'white'
                  },
                  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                    color: 'white'
                  },
                  '& .MuiOutlinedInput-root': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white'
                    }
                  },
                  '& .MuiAutocomplete-popupIndicator': {
                    color: 'white'
                  },
                  '& .MuiAutocomplete-clearIndicator': {
                    color: 'white'
                  }
                }}
              />
            )}
            className="inputForm"
            PopperComponent={CustomPopper}
          />
        </Form>

        <Offcanvas.Body className="containerNav">
          <h2>{t('Categorias')}</h2>
          <BodyNavSystem
            data={dataExplorer}
            selectedNomenclature={selectedNomenclature}
            hasNewVisibleLayer={hasNewVisibleLayer}
            switcherRef={switcherRef}
          />
        </Offcanvas.Body>
      </Container>

      <div className="desativarCamadas">
        <a onClick={deactivateVisibleLayers}>{t('Desativar camadas visíveis')}</a>
      </div>

      <Button
        variant="outline-light"
        href="https://pedea.sema.ce.gov.br/geoserver/web/wicket/bookmarkable/org.geoserver.web.demo.MapPreviewPage;jsessionid=8237CF805015537DA43E7554E8944E92?0"
        target="_blank"
        className="btnBaixarDados"
      >
        {t('Baixar Dados')}
      </Button>
    </div>
  )
}

export default NavOptions
