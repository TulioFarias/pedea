import zcmData from '../../_assets/data/zcm'
import geoCSVReader from '../../_assets/js/geoCSVReader'
import { ServerTypeHelper } from '../helpers'

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
