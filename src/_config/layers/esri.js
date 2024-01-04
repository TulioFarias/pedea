import { ServerTypeHelper, LayerFolderHelper } from '../helpers'

const esriLayers = [
  {
    wmsName: '',
    title: 'Mapa topográfico',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attributions:
      'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
    visibility: true,
    queryable: false,
    serverType: ServerTypeHelper.ESRI,
    folder: LayerFolderHelper.ESRI,
    folderSequence: LayerFolderHelper.ESRI
  },
  {
    wmsName: '',
    title: 'Imagem de satélite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attributions:
      'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ArcGIS</a>',
    visibility: false,
    queryable: false,
    serverType: ServerTypeHelper.ESRI,
    folder: LayerFolderHelper.ESRI,
    folderSequence: LayerFolderHelper.ESRI
  },
  {
    wmsName: '',
    title: 'Logradouros',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attributions:
      'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer">ArcGIS</a>',
    visibility: false,
    queryable: false,
    serverType: ServerTypeHelper.ESRI,
    folder: LayerFolderHelper.ESRI,
    folderSequence: LayerFolderHelper.ESRI
  }
]

export default esriLayers
