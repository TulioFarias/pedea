import { ServerTypeHelper, LayerFolderHelper } from '../helpers'

const googleLayers = [
  {
    wmsName: '',
    title: 'Imagem de satélite',
    url: 'https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',
    visibility: false,
    queryable: false,
    serverType: ServerTypeHelper.GOOGLE,
    folder: LayerFolderHelper.GOOGLE,
    folderSequence: LayerFolderHelper.GOOGLE
  },

  {
    wmsName: '',
    title: 'Ruas',
    url: 'https://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
    visibility: false,
    queryable: false,
    serverType: ServerTypeHelper.GOOGLE,
    folder: LayerFolderHelper.GOOGLE,
    folderSequence: LayerFolderHelper.GOOGLE
  },
  {
    wmsName: '',
    title: 'Híbrido: imagem de satélite e ruas',
    url: 'https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',
    visibility: false,
    queryable: false,
    serverType: ServerTypeHelper.GOOGLE,
    folder: LayerFolderHelper.GOOGLE,
    folderSequence: LayerFolderHelper.GOOGLE
  }
]

export default googleLayers
