import zcmData from '../../assets/data/zmc'
import geoCSVReader from '../../assets/js/geoCSVReader'
import { ServerTypeHelper } from './helpers'

const geoWorkspace = 'zcm'
const serverURL = 'https://pedea.sema.ce.gov.br/geoserver/zcm/wms'
const serverType = ServerTypeHelper.GEOSERVER

const { tree, layers } = geoCSVReader(
  zcmData,
  geoWorkspace,
  serverURL,
  serverType
)

export { layers, tree }
