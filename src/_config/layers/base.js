import { LayerFolderHelper } from '../helpers'
import esriLayers from './esri'
import googleLayers from './google'
import osmLayers from './osm'

const baseTree = [
  {
    title: LayerFolderHelper.BASE,
    subFolder: [
      {
        title: LayerFolderHelper.GOOGLE,
        folderSequence: LayerFolderHelper.GOOGLE,
        subFolder: null
      },
      {
        title: LayerFolderHelper.ESRI,
        folderSequence: LayerFolderHelper.ESRI,
        subFolder: null
      },
      {
        title: LayerFolderHelper.OSM,
        folderSequence: LayerFolderHelper.OSM,
        subFolder: null
      },
      {
        title: LayerFolderHelper.OL,
        folderSequence: LayerFolderHelper.OL,
        subFolder: null
      }
    ]
  }
]

const baseLayers = [...googleLayers, ...esriLayers, ...osmLayers]

export { baseLayers, baseTree }
