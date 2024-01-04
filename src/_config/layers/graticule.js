import Graticule from 'ol/layer/Graticule'
import Stroke from 'ol/style/Stroke'

import { LayerFolderHelper } from '../helpers'

const latFormatter = e => {
  return e.toFixed(4)
}

const lonFormatter = e => {
  return e.toFixed(4)
}

const graticule = new Graticule({
  strokeStyle: new Stroke({
    color: 'rgba(255,120,0,0.9)',
    width: 2,
    lineDash: [0.5, 4]
  }),
  showLabels: true,
  wrapX: false,
  folder: LayerFolderHelper.OL,
  folderSequence: LayerFolderHelper.OL,
  visible: false,
  title: 'Grade',
  latLabelFormatter: latFormatter,
  lonLabelFormatter: lonFormatter
})

export default graticule
