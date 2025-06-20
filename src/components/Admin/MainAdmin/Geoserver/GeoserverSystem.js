import  { useState, useEffect , useRef} from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { FloatLabel } from 'primereact/floatlabel'
import { useTranslation } from 'react-i18next'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import axios from 'axios'
import '../../../../sass/admin/geoserver/geoserver.scss'
import apiPEDEA from '../../../../services/api'
function GeoserverSystem() {

  const { t } = useTranslation()
  const dt = useRef(null)
  const [globalFilter, setGlobalFilter] = useState(null);
  const [layers, setLayers] = useState([])
  const [dataExplorer, setDataExplorer] = useState([]);
  const [status, setStatus] = useState([])

  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        const response = await axios.get(
          'https://pedea.sema.ce.gov.br/geoserver/zcm/wms?service=WMS&version=1.3.0&request=GetCapabilities',
          { headers: { 'Content-Type': 'application/xml' } }
        )
        const xml = response.data
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(xml, 'text/xml')

       
        const layerElements = xmlDoc.querySelectorAll('Layer > Layer') 
        const parsedLayers = []

       layerElements.forEach((layer) => {

          const name = layer.querySelector('Name')?.textContent
          const title = layer.querySelector('Title')?.textContent

          let bbox = null
          let crs = 'EPSG:4326'

          const bboxEl = layer.querySelector('EX_GeographicBoundingBox')
          if (bboxEl) {
            const west = bboxEl.querySelector('westBoundLongitude')?.textContent
            const east = bboxEl.querySelector('eastBoundLongitude')?.textContent
            const south = bboxEl.querySelector('southBoundLatitude')?.textContent
            const north = bboxEl.querySelector('northBoundLatitude')?.textContent
            if (west && east && south && north) {
              bbox = `${south},${west},${north},${east}`
            }
          } else {
            const altBboxEl = layer.querySelector('BoundingBox')
            if (altBboxEl) {
              crs = altBboxEl.getAttribute('CRS') || 'EPSG:4326'
              const minx = altBboxEl.getAttribute('minx')
              const miny = altBboxEl.getAttribute('miny')
              const maxx = altBboxEl.getAttribute('maxx')
              const maxy = altBboxEl.getAttribute('maxy')
              if (minx && miny && maxx && maxy) {
                bbox = `${minx},${miny},${maxx},${maxy}`
              }
            }
          }

          let preview = null
          if (bbox && name) {
            preview = `https://pedea.sema.ce.gov.br/geoserver/zcm/wms?service=WMS&version=1.3.0&request=GetMap&layers=zcm:${name}&styles=&bbox=${bbox}&width=300&height=150&crs=${crs}&format=image/png`
          }

          if (name && title) {
            parsedLayers.push({
              name,
              title,
              preview: preview || null,
            })
          }
        })
        

        setLayers(parsedLayers)


        try {
        const { data } = await apiPEDEA.get('/infoDataExplorer');
        const sortedData = data.sort((a, b) => a.id - b.id);
        setDataExplorer(sortedData);


         const nomesWMS = parsedLayers.map((layer) => layer.title?.trim())
         const nomesAPI = sortedData.map((item) => item.nomenclatura_pedea?.trim())

        const resultadosComparacao = nomesAPI.map((nome) => {
        const encontrado = nome && nomesWMS.includes(nome);
        return { nome, status: !!encontrado };
      });
        setStatus(resultadosComparacao) 
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
      } catch (error) {
        console.error('Erro ao buscar GetCapabilities:', error)
      }
    }


    

    fetchCapabilities()
  }, [])


   const header = (
    <>
     <div className="flex justify-between items-center containerHeaderGeoserver">

      <div className='containerTitle'>
        <TravelExploreIcon/>
        <h3 className="text-lg font-semibold">{t("Lista de camadas ativas no Geoserver PEDEA")}</h3>
      </div>
      
      <span className="p-input-icon-left">
         <FloatLabel>
          <InputText
            id="busca"
            type="search"
            value={globalFilter}
            className='valueInputCustom'
            onChange={(e) => setGlobalFilter(e.target.value)}
            style={{width: '200px', borderRadius: '10px'}}
          />
          <label htmlFor="busca">Pesquisar...</label>
        </FloatLabel>
      </span>

      
    </div>
    </>
   

    
  );

   return (
    <div className='containerTableGeoserver'>
      <DataTable
        ref={dt}
        value={layers}
        header={header}
        globalFilter={globalFilter}
        dataKey="name"
        emptyMessage="Nenhum dado encontrado."
        resizableColumns 
        showGridlines
        sortOrder={1}
        sortMode="single"
        paginator rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: '60rem' ,}}
      >
      <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
        <Column
          field="name"
          header="Nome da Camada"
          headerStyle={{ textAlign: 'center' }}
          bodyStyle={{  }}
        />
        <Column
          field="title"
          header="Título"
          headerStyle={{ textAlign: 'center' }}
          bodyStyle={{  }}
        />
        <Column
          header="Camadas"
          body={(rowData) =>
            rowData.preview ? (
              <img
                src={rowData.preview}
                alt={`Visualização da camada ${rowData.name}`}
                style={{ width: '100%', maxWidth: '200px', objectFit: 'cover' }}
              />
            ) : (
              <span>Sem imagem</span>
            )
          }
          headerStyle={{ textAlign: 'center' }}
          bodyStyle={{ verticalAlign: 'middle' }}
        />
    
      </DataTable>
    </div>
  )


}

export default GeoserverSystem

