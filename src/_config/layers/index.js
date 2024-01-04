// import TileLayer from 'ol/layer/Tile'
// import TileWMS from 'ol/source/TileWMS'
// import XYZ from 'ol/source/XYZ'

// import { baseLayers } from './base'
// import graticule from './graticule'
// import { ServerTypeHelper } from './helpers'
// import { vector, vectorForCSV } from './vector'
// import { layers as zcmLayers, tree as zcmTree } from './zcm'

// const newLayers = []

// const explorer = [...zcmTree]

// const layersData = [...baseLayers, ...zcmLayers]

// const createLayerByType = (layer, zIndex) => {
//   if (
//     layer.serverType === ServerTypeHelper.GOOGLE ||
//     layer.serverType === ServerTypeHelper.OSM
//   )
//     return new TileLayer({
//       title: layer.title,
//       serverType: layer.serverType,
//       wmsName: layer.wmsName,
//       url: layer.url,
//       queryable: layer.queryable,
//       visible: layer.visibility,
//       zIndex,
//       folder: layer.folder,
//       folderSequence: layer.folderSequence,
//       source: new XYZ({ url: layer.url, crossOrigin: 'Anonymous' })
//     })
//   else if (layer.serverType === ServerTypeHelper.ESRI)
//     return new TileLayer({
//       title: layer.title,
//       serverType: layer.serverType,
//       wmsName: layer.wmsName,
//       url: layer.url,
//       queryable: layer.queryable,
//       visible: layer.visibility,
//       zIndex,
//       folder: layer.folder,
//       folderSequence: layer.folderSequence,
//       source: new XYZ({
//         url: layer.url,
//         attributions: layer.attributions,
//         crossOrigin: 'Anonymous'
//       })
//     })
//   else if (layer.serverType === ServerTypeHelper.GEOSERVER)
//     return new TileLayer({
//       title: layer.title,
//       serverType: layer.serverType,
//       wmsName: layer.wmsName,
//       url: layer.url,
//       queryable: layer.queryable,
//       visible: layer.visibility,
//       zIndex,
//       folder: layer.folder,
//       folderSequence: layer.folderSequence,
//       source: new TileWMS({
//         title: layer.title,
//         url: layer.url,
//         crossOrigin: 'Anonymous',
//         params: { LAYERS: layer.wmsName, TILED: true }
//       })
//     })
//   else return null
// }

// let zIndex = 0

// for (let i = 0; i < layersData.length; i++) {
//   newLayers.push(createLayerByType(layersData[i], zIndex++))
// }

// vector.setZIndex(zIndex++)
// vectorForCSV.setZIndex(zIndex++)
// graticule.setZIndex(zIndex)

// newLayers.push(vector)

// newLayers.push(vectorForCSV)

// newLayers.push(graticule)

// export { newLayers, explorer, vector, vectorForCSV }
