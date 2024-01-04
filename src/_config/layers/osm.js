import { ServerTypeHelper, LayerFolderHelper } from '../helpers'

const osmLayers = [
  {
    wmsName: '',
    title: 'Vias',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    visibility: false,
    queryable: false,
    serverType: ServerTypeHelper.OSM,
    folder: LayerFolderHelper.OSM,
    folderSequence: LayerFolderHelper.OSM
  }
]

export default osmLayers
